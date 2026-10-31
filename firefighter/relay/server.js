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
const AWAY_MS = parseInt(process.env.FF_AWAY_MS || '120000', 10);   // place gardée 2 min à un joueur déconnecté en pleine partie
const MAX_SPECS = parseInt(process.env.FF_MAX_SPECTATORS || '4', 10);
const SCORES_FILE = process.env.FF_SCORES_FILE || '/data/scores.json';   // classement en ligne (volume Docker)
const fs = require('fs'), path = require('path');
const VERSION = require('./package.json').version;
const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ';          // sans I ni O (confusion avec 1 et 0)

const crypto = require('crypto');
// code → { code, host, players: Map(id → ws), away: Map(id → { name, token, timer }), next, locked, last }
const rooms = new Map();

function newCode() {
  for (let n = 0; n < 1000; n++) {
    let c = ''; for (let q = 0; q < 4; q++) c += ALPHA[Math.floor(Math.random() * ALPHA.length)];
    if (!rooms.has(c)) return c;
  }
  return null;
}
function send(ws, obj) { if (ws.readyState === 1) ws.send(typeof obj === 'string' ? obj : JSON.stringify(obj)); }
function cleanName(s) { return String(s || '').replace(/[<>&"'`\u0000-\u001f]/g, '').trim().slice(0, 16) || 'Pompier'; }
const token = () => crypto.randomBytes(12).toString('hex');
function peers(room) {
  // triés par numéro : les couleurs des joueurs restent stables même après une reconnexion
  const list = [...room.players.values()].map(ws => ({ id: ws.pid, name: ws.name }))
    .concat([...room.away].map(([id, a]) => ({ id, name: a.name, away: true }))).sort((a, b) => a.id - b.id);
  const specs = [...room.specs.values()].map(ws => ({ id: ws.pid, name: ws.name }));
  for (const ws of all(room)) send(ws, { t: 'peers', host: room.host, players: list, specs, locked: room.locked });
}
const all = room => [...room.players.values(), ...room.specs.values()];
function closeRoom(room, why) {
  for (const o of all(room)) { send(o, { t: 'closed', why }); o.room = null; }
  for (const a of room.away.values()) clearTimeout(a.timer);
  rooms.delete(room.code);
}
// gone = départ définitif ; sinon (fermeture de connexion en pleine partie) on garde la place un moment
function leave(ws, gone) {
  const room = ws.room; if (!room) return;
  ws.room = null;
  if (ws.spec) { room.specs.delete(ws.pid); for (const o of all(room)) send(o, { t: 'specleft', id: ws.pid, name: ws.name }); return peers(room); }
  room.players.delete(ws.pid);
  if (ws.pid === room.host || room.players.size === 0) return closeRoom(room, 'L\'hôte a quitté la partie');
  if (!gone && room.locked) {
    const a = { name: ws.name, token: ws.token };
    a.timer = setTimeout(() => {
      if (!room.away.delete(ws.pid)) return;
      for (const o of room.players.values()) send(o, { t: 'left', id: ws.pid, name: ws.name });
      peers(room);
    }, AWAY_MS);
    room.away.set(ws.pid, a);
    for (const o of room.players.values()) send(o, { t: 'away', id: ws.pid, name: ws.name });
    return peers(room);
  }
  for (const o of room.players.values()) send(o, { t: 'left', id: ws.pid, name: ws.name });
  peers(room);
}

// ─── Classement en ligne ───────────────────────────────────────
// scores[carte|niveau|mode] = [{ name, score, night, players, t }] (50 meilleurs gardés, 20 renvoyés)
const MAPS_OK = /^(village|ville|port|montagne|massif|cote|mp_foret|mp_littoral|mp_montagne|mp_metro)$/;
let scores = {};
try { scores = JSON.parse(fs.readFileSync(SCORES_FILE, 'utf8')) || {}; } catch (_) { scores = {}; }
let saveT = null;
function saveScores() {
  clearTimeout(saveT);
  saveT = setTimeout(() => {
    try { fs.mkdirSync(path.dirname(SCORES_FILE), { recursive: true }); const tmp = SCORES_FILE + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(scores)); fs.renameSync(tmp, SCORES_FILE); }
    catch (e) { console.error('scores: écriture impossible', e.message); }
  }, 2000);
}
const lastPost = new Map();   // anti-spam : un envoi toutes les 15 s par adresse
function json(res, code, obj) { res.writeHead(code, { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'GET, POST, OPTIONS' }); res.end(JSON.stringify(obj)); }
function handleScores(req, res, q) {
  if (req.method === 'OPTIONS') return json(res, 204, {});
  if (req.method === 'GET') {
    const map = String(q.get('map') || ''), level = parseInt(q.get('level'), 10), mode = q.get('mode') === 'coop' ? 'coop' : 'solo';
    if (!MAPS_OK.test(map) || !(level >= 1 && level <= 10)) return json(res, 400, { error: 'paramètres invalides' });
    return json(res, 200, { map, level, mode, top: (scores[`${map}|${level}|${mode}`] || []).slice(0, 20) });
  }
  if (req.method !== 'POST') return json(res, 405, { error: 'méthode' });
  let body = '';
  req.on('data', c => { body += c; if (body.length > 4000) req.destroy(); });
  req.on('end', () => {
    let m; try { m = JSON.parse(body); } catch (_) { return json(res, 400, { error: 'json' }); }
    const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    const now = Date.now();
    if (now - (lastPost.get(ip) || 0) < 15000) return json(res, 429, { error: 'Patiente quelques secondes avant de publier un autre score' });
    const map = String(m.map || ''), level = parseInt(m.level, 10), mode = m.mode === 'coop' ? 'coop' : 'solo', score = Math.round(+m.score);
    if (!MAPS_OK.test(map) || !(level >= 1 && level <= 10) || !(score >= 0 && score <= 500000)) return json(res, 400, { error: 'score invalide' });
    lastPost.set(ip, now);
    const e = { name: cleanName(m.name), score, night: !!m.night, t: now };
    if (mode === 'coop' && Array.isArray(m.players)) e.players = m.players.slice(0, 4).map(cleanName);
    const key = `${map}|${level}|${mode}`, list = scores[key] = scores[key] || [];
    list.push(e); list.sort((a, b) => b.score - a.score); list.length = Math.min(list.length, 50);
    saveScores();
    const rank = list.indexOf(e) + 1;
    return json(res, 200, { ok: true, rank: rank || null, top: list.slice(0, 20) });
  });
}
setInterval(() => { const now = Date.now(); for (const [ip, t] of lastPost) if (now - t > 60000) lastPost.delete(ip); }, 60000).unref();

const server = http.createServer((req, res) => {
  // derrière un reverse proxy qui retire le préfixe (StripPrefix de Traefik), l'URL peut arriver sans « / » initial
  const full = String(req.url || '').replace(/^\/*/, '/');
  const u = full.split('?')[0], q = new URLSearchParams(full.split('?')[1] || '');
  if (u === '/scores' || u.endsWith('/scores')) return handleScores(req, res, q);
  if (u === '/health' || u.endsWith('/health')) {
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
      const r = { code, host: 0, players: new Map(), away: new Map(), specs: new Map(), next: 1, locked: false, last: Date.now() };
      rooms.set(code, r);
      ws.pid = 0; ws.name = cleanName(m.name); ws.token = token(); ws.room = r; r.players.set(0, ws);
      send(ws, { t: 'joined', code, id: 0, host: 0, token: ws.token });
      return peers(r);
    }
    if (m.t === 'join' && !room) {
      const r = rooms.get(String(m.code || '').toUpperCase().trim());
      if (!r) return send(ws, { t: 'error', msg: 'Salon introuvable : vérifie le code' });
      // retour d'un joueur déconnecté : il reprend sa place grâce à son jeton
      if (m.token) for (const [id, a] of r.away) if (a.token === String(m.token)) {
        clearTimeout(a.timer); r.away.delete(id);
        ws.pid = id; ws.name = a.name; ws.token = a.token; ws.room = r; r.players.set(id, ws); r.last = Date.now();
        send(ws, { t: 'joined', code: r.code, id, host: r.host, token: ws.token, rejoin: true });
        for (const o of r.players.values()) if (o !== ws) send(o, { t: 'back', id, name: ws.name });
        return peers(r);
      }
      if (m.spectator) {   // spectateur : peut arriver en pleine partie, ne commande rien
        if (r.specs.size >= MAX_SPECS) return send(ws, { t: 'error', msg: `Déjà ${MAX_SPECS} spectateurs dans ce salon` });
        ws.pid = 100 + r.next++; ws.name = cleanName(m.name); ws.spec = true; ws.room = r; r.specs.set(ws.pid, ws); r.last = Date.now();
        send(ws, { t: 'joined', code: r.code, id: ws.pid, host: r.host, spectator: true });
        const h = r.players.get(r.host); if (h) send(h, { t: 'spec', id: ws.pid, name: ws.name });
        return peers(r);
      }
      if (r.locked) return send(ws, { t: 'error', msg: 'La partie a déjà commencé dans ce salon (tu peux la regarder en spectateur)' });
      if (r.players.size + r.away.size >= MAX_PLAYERS) return send(ws, { t: 'error', msg: `Salon complet (${MAX_PLAYERS} joueurs)` });
      ws.pid = r.next++; ws.name = cleanName(m.name); ws.token = token(); ws.room = r; r.players.set(ws.pid, ws); r.last = Date.now();
      send(ws, { t: 'joined', code: r.code, id: ws.pid, host: r.host, token: ws.token });
      return peers(r);
    }
    if (!room) return;
    room.last = Date.now();
    if (m.t === 'leave') return leave(ws, true);
    if (m.t === 'lock' && ws.pid === room.host) {
      room.locked = !!m.on;
      if (!room.locked) for (const [id, a] of room.away) { clearTimeout(a.timer); room.away.delete(id); for (const p of room.players.values()) send(p, { t: 'left', id, name: a.name }); }
      return peers(room);
    }
    if (m.t === 'kick' && ws.pid === room.host) {
      const o = room.players.get(m.id) || room.specs.get(m.id);
      if (o && o !== ws) { send(o, { t: 'closed', why: 'Retiré du salon par l\'hôte' }); leave(o, true); }
      else if (room.away.has(m.id)) { const a = room.away.get(m.id); clearTimeout(a.timer); room.away.delete(m.id); for (const p of room.players.values()) send(p, { t: 'left', id: m.id, name: a.name }); peers(room); }
      return;
    }
    if (m.t === 'msg') {
      // relais : vers un joueur (to) ou vers tous les autres. Seul l'hôte peut écrire à un joueur précis.
      const out = JSON.stringify({ t: 'msg', from: ws.pid, d: m.d });
      if (typeof m.to === 'number') { const o = room.players.get(m.to) || room.specs.get(m.to); if (o) send(o, out); }
      else for (const o of all(room)) if (o !== ws) send(o, out);
    }
  });
  ws.on('close', () => leave(ws, false));
  ws.on('error', () => leave(ws, false));
});

// battement de cœur (connexions mortes) et salons abandonnés
setInterval(() => {
  for (const ws of wss.clients) { if (!ws.alive) { ws.terminate(); continue; } ws.alive = false; try { ws.ping(); } catch (_) { /* fermé */ } }
  const now = Date.now();
  for (const r of rooms.values()) if (now - r.last > ROOM_IDLE_MS) for (const ws of all(r)) { send(ws, { t: 'closed', why: 'Salon inactif' }); ws.close(); }
}, 20000).unref();

server.listen(PORT, () => console.log(`Firefighter relay ${VERSION} on :${PORT}`));
