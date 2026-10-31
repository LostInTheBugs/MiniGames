# 🚒 Firefighter

3D fire and rescue dispatch game — send canadairs, water-bombing helicopters and fire engines to forest fires, burning houses and towers, and road accidents.

Part of the [MiniGames](../README.md) collection. Current version: **2026.10.006** — [releases](https://github.com/LostInTheBugs/MiniGames/releases?q=firefighter&expanded=true).

## 🗺️ Maps

| Map | Difficulty | What happens |
|---|---|---|
| **Village et forêt** | ⭐ Easy | A village among wooded hills: forest fires driven by the wind towards the houses |
| **Ville** | ⭐⭐ Medium | Dense blocks and towers: the aerial ladder is a must, many road accidents |
| **Port** | ⭐⭐ Medium | Quays, warehouses and boats, a town on the hill; the sea is close for water bombers |
| **Montagne** | ⭐⭐⭐ Hard | Wooded slopes and a winding road where trucks crawl: aircraft make the difference |
| **Massif forestier** | ⭐⭐⭐ Large (96 × 96) | A wooded massif with three villages, two fire stations and an airfield: lay retardant ahead of the fire |
| **Côte méditerranéenne** | ⭐⭐⭐ Large (96 × 96) | Three seaside towns below pine-covered hills, offshore wind, two stations and an airfield |

## 🚒 Vehicles

| Key | Vehicle | Moves | Role |
|---|---|---|---|
| 1 | ✈️ Canadair | flies | Drops a long strip of water along its flight path, scoops at the nearest water. For forests: over homes it wrecks the buildings and injures passers-by |
| 2 | 🚁 Water-bombing helicopter | flies | Drops its bucket on a 2-cell circle, refills on water |
| 3 | 🚛 Forest fire truck (CCF) | off-road, enters the forest, heat-protected | Sprays vegetation fires around it; sent where nothing burns, wets the vegetation (firebreak) |
| 4 | 🚑 Light vehicle (VL) | roads and grass, fast | No water: treats road accident victims once they are cut out |
| 5 | 🪜 Aerial ladder | roads only | Reaches upper floors: the only fully effective vehicle on towers, evacuates trapped people at every floor |
| 6 | 🚒 Fire engine (FPT) | roads and grass | Houses, warehouses, boats; evacuates up to the 3rd floor; cuts accident victims out; lower floors only on a tower |
| 7 | 🛩️ Retardant aircraft | flies (large maps) | Drops a 14-cell strip of retardant: vegetation barely burns for 2 minutes; reloads at the airfield |

Trucks carry water (blue gauge): when empty they refill at the fire station or the nearest hydrant, then come back; back at the station they refill before being available again. They drive around flames (except the forest fire truck). While aiming with an aircraft, the drop footprint is shown on the map — red when it would hit homes. Aircraft drop once, refill, and come back as long as something burns near their target.

## 🎮 How to play

- Pick a vehicle type in the bottom bar (keys **1–6**) or a specific vehicle in the list on the right, then **click on the map**: the nearest available vehicle goes there and works on its own
- Fire spreads from cell to cell, faster in the forest and **downwind** (compass top right); a watered cell stays damp for a while — use it as a firebreak
- A burning building loses integrity and collapses; accidents have a countdown shown in the banner
- **Weather**: drought speeds the fire up, gusts make it race, rain slows it down; with strong wind, embers jump several cells ahead and set roofs alight
- **People**: a burning building has trapped occupants — evacuate them (fire engine up to the 3rd floor, ladder above) before it collapses; an accident needs the fire engine to cut victims out, then the light vehicle to treat them
- Trucks caught in the heat get damaged, retreat for repairs, or are lost (the forest fire truck is protected)
- Hold until the end of the level without exceeding the tolerated losses (buildings, burnt forest, victims — left panel)

| Control | Action |
|---|---|
| 🖱️ Left click | Send the selected vehicle |
| 🖱️ Right drag | Rotate the camera |
| 🖱️ Middle drag | Pan |
| 🖱️ Wheel | Zoom |
| ⌨️ **1–7** | Vehicle type |
| ⌨️ **F** | Speed ×2 |
| ⌨️ **P** / **Esc** | Pause |
| ⌨️ **H** / **?** | Help |
| ⌨️ **R** | Restart |
| ⌨️ **M** | Menu |

### 🎲 Aléatoire

The last tile on the home screen starts a map drawn at random (never the same one twice in a row), at the highest level you have unlocked on it.

### 👥 Multijoueur (co-op)

Up to **4 players online** on the same map, winning or losing together:

1. one player opens the **Multijoueur** tile, creates a room and shares the 4-letter code (or the link `…/firefighter/?join=CODE`)
2. the others join with the code; the host picks the map, the level and whether the fleet is shared
3. by default the fleet is split by role, balanced by vehicle count — e.g. with 2 players: urban (fire engines, ladder, light vehicle) / forest and air (forest trucks, helicopters, canadairs, retardant). Each player only commands their own vehicles
4. **Shift + click** (or **G**) drops a ping everyone sees; **P** pauses for the whole team; only the host changes the speed and restarts

The host's browser runs the simulation (keep the tab in front: switching tab pauses the game for everyone) and sends 5 snapshots per second through the relay; the other players render the same map from the same seed and send their orders to the host.

## 🎯 Levels

Each map has **10 levels**, unlocked one after the other and saved in the browser. Higher levels bring more frequent alerts, faster spread, stronger wind, shorter accident countdowns and fewer tolerated losses. Level 10 is endless.

```
https://games.cloudfr.net/firefighter/?seed=42
```

The seed fixes the map: same seed and same level = same map.

## 🚀 Run / deploy

Static files, no build step: serve the `firefighter/` folder (with `assets/`) from any web server, or open `index.html` (Three.js is loaded from unpkg, network access needed).

```bash
python3 -m http.server 8080   # → http://localhost:8080/firefighter/
```

On the games hub it is served at `https://games.cloudfr.net/firefighter/`. Files to deploy: `index.html`, `version.json`, `preview.png`, `assets/map-*.jpg` (six maps).

### 👥 Multiplayer relay

The co-op mode needs the small WebSocket relay in [`relay/`](relay/) (Node 22 + `ws`, no game logic: rooms with a 4-letter code, max 4 players, forwards messages, closes idle rooms after 30 min).

```bash
cd firefighter/relay
docker compose up -d --build        # listens on 127.0.0.1:8008
FF_RELAY_PORT=8010 docker compose up -d --build   # other host port
curl http://127.0.0.1:8008/health   # {"ok":true,"version":"2026.10.006","rooms":0}
```

| Variable | Default | Meaning |
|---|---|---|
| `FF_RELAY_PORT` | `8008` | host port (docker compose) |
| `PORT` | `8008` | listening port inside the container / with `node server.js` |
| `FF_MAX_PLAYERS` | `4` | players per room |
| `FF_MAX_ROOMS` | `200` | simultaneous rooms |

The game connects to `wss://<host>/firefighter/ws` (same origin as the page), so the reverse proxy must forward that path, with the WebSocket upgrade headers, to the relay — e.g. nginx:

```nginx
location /firefighter/ws {
    proxy_pass http://127.0.0.1:8008/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 1h;
}
```

For local tests: `node relay/server.js` then open `http://localhost:8080/firefighter/?relay=ws://localhost:8008`.

## 🔄 Updates

The game checks this repository's `firefighter-` releases every hour (GitHub API, cached, silent on failure, falls back to `version.json`), shows a banner with a details window listing every release note since the installed version, and can reload automatically — only on the home screen or after a game, never during one.

## 📋 Release notes

See [CHANGELOG.md](CHANGELOG.md).

### 2026.10.005
- Gentler start: levels 1–2 are easy again, difficulty ramps up from level 3

### 2026.10.004
- Weather (drought, gusts, rain, embers), trapped occupants, two-step accidents, damaged trucks, firebreaks, two large maps with a retardant aircraft

### 2026.10.003
- Trucks refill at the station; Canadair drops on homes wreck buildings and injure passers-by; aiming preview for aircraft; trucks go around flames

### 2026.10.002
- New **Aléatoire** tile on the home screen: a random map at its highest unlocked level

### 2026.10.001
- First release: four maps, six vehicle types, forest/building/road incidents, 10 levels per map
