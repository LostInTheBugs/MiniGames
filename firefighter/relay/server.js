// Firefighter — relais WebSocket du mode coopératif.
// Ne fait tourner aucune simulation : il crée des salons (code de 4 lettres, 4 joueurs max)
// et fait suivre les messages entre l'hôte (qui simule la partie) et les autres joueurs.
'use strict';
const http = require('http');
const { WebSocketServer } = require('ws');

const PORT = parseInt(process.env.PORT || process.env.FF_RELAY_PORT || '8008', 10);
const MAX_PLAYERS = parseInt(process.env.FF_MAX_PLAYERS || '4', 10);
const MAX_ROOMS = parseInt(process.env.FF_MAX_ROOMS || '200', 10);
const MAX_MSG = 512 * 1024;                       // un instantané de grande carte tient largement
const ROOM_IDLE_MS = 30 * 60 * 1000;              // salon sans message depuis 30 min : fermé
const VERSION = require('./package.json').version;
const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ';          // sans I ni O (confusion avec 1 et 0)

const rooms = new Map();                          // code → { code, host, players: Map(id → ws), next, locked, last }

function newCode() {
  for (let n = 0; n < 1000; n++) {
    let c = ''; for (let q = 0; q < 4; q++) c += ALPHA[Math.floor(Math.random() * ALPHA.length)];
    if (!rooms.has(c)) return c;
  }
  return null;
}
function send(ws, obj) { if (ws.readyState === 1) ws.send(typeof obj === 'string' ? obj : JSON.stringify(obj)); }
function cleanName(s) { return String(s || '').replace(/[<>&"'`\u0000-\u001f]/g, '').trim().slice(0, 16) || 'Pompier'; }
function peers(room) {
  const list = [...room.players.values()].map(ws => ({ id: ws.pid, name: ws.name }));
  for (const ws of room.players.values()) send(ws, { t: 'peers', host: room.host, players: list, locked: room.locked });
}
function leave(ws) {
  const room = ws.room; if (!room) return;
  ws.room = null;
  room.players.delete(ws.pid);
  if (ws.pid === room.host || room.players.size === 0) {
    for (const o of room.players.values()) { send(o, { t: 'closed', why: 'L\'hôte a quitté la partie' }); o.room = null; }
    rooms.delete(room.code);
  } else {
    for (const o of room.players.values()) send(o, { t: 'left', id: ws.pid, name: ws.name });
    peers(room);
  }
}

const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url.endsWith('/health')) {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ ok: true, version: VERSION, rooms: rooms.size }));
  }
  res.writeHead(426, { 'content-type': 'text/plain' }); res.end('Firefighter relay: WebSocket only\n');
});
const wss = new WebSocketServer({ server, maxPayload: MAX_MSG });

wss.on('connection', ws => {
  ws.alive = true; ws.room = null;
  ws.on('pong', () => { ws.alive = true; });
  ws.on('message', (raw, isBin) => {
    if (isBin) return;
    let m; try { m = JSON.parse(raw); } catch (_) { return; }
    const room = ws.room;
    if (m.t === 'create' && !room) {
      if (rooms.size >= MAX_ROOMS) return send(ws, { t: 'error', msg: 'Serveur plein, réessaie plus tard' });
      const code = newCode(); if (!code) return send(ws, { t: 'error', msg: 'Aucun code libre' });
      const r = { code, host: 0, players: new Map(), next: 1, locked: false, last: Date.now() };
      rooms.set(code, r);
      ws.pid = 0; ws.name = cleanName(m.name); ws.room = r; r.players.set(0, ws);
      send(ws, { t: 'joined', code, id: 0, host: 0 });
      return peers(r);
    }
    if (m.t === 'join' && !room) {
      const r = rooms.get(String(m.code || '').toUpperCase().trim());
      if (!r) return send(ws, { t: 'error', msg: 'Salon introuvable : vérifie le code' });
      if (r.locked) return send(ws, { t: 'error', msg: 'La partie a déjà commencé dans ce salon' });
      if (r.players.size >= MAX_PLAYERS) return send(ws, { t: 'error', msg: `Salon complet (${MAX_PLAYERS} joueurs)` });
      ws.pid = r.next++; ws.name = cleanName(m.name); ws.room = r; r.players.set(ws.pid, ws); r.last = Date.now();
      send(ws, { t: 'joined', code: r.code, id: ws.pid, host: r.host });
      return peers(r);
    }
    if (!room) return;
    room.last = Date.now();
    if (m.t === 'leave') return leave(ws);
    if (m.t === 'lock' && ws.pid === room.host) { room.locked = !!m.on; return peers(room); }
    if (m.t === 'kick' && ws.pid === room.host) { const o = room.players.get(m.id); if (o && o !== ws) { send(o, { t: 'closed', why: 'Retiré du salon par l\'hôte' }); leave(o); } return; }
    if (m.t === 'msg') {
      // relais : vers un joueur (to) ou vers tous les autres. Seul l'hôte peut écrire à un joueur précis.
      const out = JSON.stringify({ t: 'msg', from: ws.pid, d: m.d });
      if (typeof m.to === 'number') { const o = room.players.get(m.to); if (o) send(o, out); }
      else for (const o of room.players.values()) if (o !== ws) send(o, out);
    }
  });
  ws.on('close', () => leave(ws));
  ws.on('error', () => leave(ws));
});

// battement de cœur (connexions mortes) et salons abandonnés
setInterval(() => {
  for (const ws of wss.clients) { if (!ws.alive) { ws.terminate(); continue; } ws.alive = false; try { ws.ping(); } catch (_) { /* fermé */ } }
  const now = Date.now();
  for (const r of rooms.values()) if (now - r.last > ROOM_IDLE_MS) for (const ws of r.players.values()) { send(ws, { t: 'closed', why: 'Salon inactif' }); ws.close(); }
}, 20000).unref();

server.listen(PORT, () => console.log(`Firefighter relay ${VERSION} on :${PORT}`));
