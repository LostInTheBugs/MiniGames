# 🌊 Flood City

3D flood-defense game — build walls, dig trenches and protect your city from destructive waves.

## 🗺️ Maps

| Map | Difficulty | Front |
|---|---|---|
| **Littoral** | ⭐ Easy | Coastal city with a wide beach — waves come from the ocean to the south, a single front |
| **Île** | ⭐⭐ Medium | Large island with an irregular coastline — waves alternate between north and south, two fronts |
| **Barrage** | ⭐⭐⭐ Hard | A reservoir lake held by a dam overlooks the city — a **single breach** per game, somewhere along the dam |
| **Marée montante** | ⭐⭐⭐ Hard | Coastal city where the **sea rises after each wave** — the beach, then the first streets disappear |
| **Estuaire** | ⭐⭐⭐ Hard | A river crosses the city — with every wave a **tidal bore** runs up it and overflows onto the banks |
| **Tempête** | ⭐⭐⭐ Hard | Coast under a storm — the wave zone shows up late, **wind pushes waves sideways**, gusts double some waves |
| **Archipel** | ⭐⭐⭐ Hard | The Île split in three by two channels — a **tidal bore in each channel** with every wave, two fronts |

### 🧱 Barrage

- About **45 s of preparation** (a little less at higher levels) with 1.8× the starting resources (resource cap 400) to build a levee
- **One breach per game**: a section of the dam gives way and the lake pours through it — 60 % of the width at level 1, wider at higher levels, taller and stronger than a normal wave
- **10 s before**, identical leaks (crack + water jet) appear at 2 to 4 places along the dam (more at higher levels): **only one** is where the dam will break
- **Defeat** if 60 % of the buildings or fewer remain; **victory** once the water has passed and the city holds
- No landing-zone marker on this map: reading the leaks is the whole game

### 🌊 Marée montante

- Same coast as Littoral, but after each wave held the sea **rises** and swallows everything under the water line: buildings (they count towards defeat), walls, trenches, cars, pedestrians
- At level 1 it only takes the beach and the coast road; at level 9 it reaches about 40 % of the city. No rise after the last wave of a level
- You cannot build under water, and waves start from the current water line: the higher the sea, the less time to react

### 🏞️ Estuaire

- Same coast as Littoral, with a river crossing the city from the beach to the north edge; nothing can be built in its bed
- With every wave, a **tidal bore** runs up the river at the same time. It cannot be stopped and **overflows onto the banks**, destroying nearby buildings
- It is strongest near the sea and weakens as it goes up; a wall on the quay protects the buildings behind it

### ⛈️ Tempête

- Same coast as Littoral, in rain and fog; the landing zone of the next wave only shows up **8 s before impact**
- The **wind** pushes each wave sideways while it travels — the banner tells which way
- From level 4, every other wave is followed by a **gust**: a smaller wave hitting elsewhere

### 🏝️ Archipel

- The Île cut into three islands by two north–south channels, linked by bridges; waves come from the north or the south
- With every wave, a tidal bore runs up **each** channel and overflows onto both banks, weakening as it crosses the island
- Nothing can be built in the channels; walls on the banks protect the buildings behind

Best scores are kept per map and shown on the home screen.

## 🎯 Levels

Each map has **10 levels**. Progression is saved in the browser — beat a level to unlock the next. Victory requires surviving all waves **and** keeping >15 % of buildings standing. Level 10 is endless.

The level picker on the home screen shows dots (1–10) per map; click to select a different level. The play button updates to « Jouer le niveau N ».

| Niv. | Ville (densité) | Hauteur | Tours | Vagues | Force (×diffMul) | Ressources |
|---|---|---|---|---|---|---|
| 1 | 25 % | ×0.45 | ❌ | 3 | ×0.35 | 200 |
| 2 | 35 % | ×0.55 | ❌ | 4 | ×0.45 | 190 |
| 3 | 45 % | ×0.65 | ❌ | 4 | ×0.55 | 180 |
| 4 | 55 % | ×0.75 | ✅ | 5 | ×0.65 | 170 |
| 5 | 65 % | ×0.85 | ✅ | 5 | ×0.75 | 160 |
| 6 | 75 % | ×0.90 | ✅ | 6 | ×0.85 | 150 |
| 7 | 85 % | ×1.00 | ✅ | 6 | ×0.95 | 150 |
| 8 | 95 % | ×1.00 | ✅ | 7 | ×1.05 | 150 |
| 9 | 100 % | ×1.05 | ✅ | 8 | ×1.15 | 150 |
| 10 | 100 % | ×1.10 | ✅ | ∞ | ×1.30 | 150 |

## 🎮 How to play

| Control | Action |
|---|---|
| 🖱️ **Left click** | Place the current structure (wall or trench) |
| 🖱️ **Right click + drag** | Rotate the camera |
| 🖱️ **Mouse wheel** | Zoom |
| ⌨️ **1 / 2 / 3** | Choose the wall tier |
| ⌨️ **T** | Toggle trench mode |
| ⌨️ **N** | Toggle day / night |
| ⌨️ **R** | Restart the game |
| ⌨️ **M** | Back to the map menu |
| ⌨️ **H / ?** | Show / hide the in-game help |

Walls and trenches can also be chosen by clicking the **build toolbar** at the bottom of the screen, which shows each cost and greys out what you cannot afford. A banner at the top counts down to the next wave and turns red with the threatened front during the alert.

A **green ghost** appears at the targeted location — red if the placement is invalid (building, road, existing wall, insufficient resources). On Littoral the camera starts on the sea side, with the beach and the front to defend in the foreground.

## ⚙️ Mechanics

### Defenses
| Type | Cost | HP | Key |
|---|---|---|---|
| 🧱 Sandbag | 12☼ | 100 | `1` |
| 🛡️ Reinforced | 28☼ | 350 | `2` |
| 🏗️ Concrete | 52☼ | 750 | `3` |
| 🕳️ Trench | 6☼ | 40 | `T` |

Defenses can be built on the whole strip between the city and the sea, beach and waterfront included. Trenches deal 10 damage/second to waves but wear out on contact. Walls block adjacent wave segments — a continuous levee stops everything, an isolated wall opens a breach.

### Waves
- Arrive every 20–22 seconds at random horizontal positions; difficulty rises through wave width, height, speed and HP rather than shorter intervals
- Split into 1-meter segments — each segment can be stopped independently
- Difficulty (width, height, speed, HP) keeps rising without a cap
- As soon as the countdown starts, an arrow and a coloured band on the sea show **roughly** where the next wave will hit (amber, then red during the 10-second alert); the band is deliberately wider than the wave and off-centre. The banner names the sector (west / centre / east) and, on the island, the front
- Residents, cars and beachgoers flee the threatened area during the alert

### Economy
- **150 resources** at the start
- Passive regeneration: **0.7☼/second** (cap: 200)
- Bonus per wave: more resources and points when a wave is fully stopped than when it breaks through
- Cumulative score

### Game over
- When the surviving buildings fall to 15 % of the initial count (the HUD warns from 25 %)

## 🛠️ Tech

- [Three.js](https://threejs.org/) r160 (CDN importmap)
- Single-file HTML (~5 400 lines), no build step
- Desktop only (WebGL + mouse recommended)

## 🚀 Run

```bash
# Direct
open index.html

# Or serve locally
python3 -m http.server 8002
# → http://localhost:8002
```

Deployed at https://games.cloudfr.net/floodcity/

## ⚙️ Configuration

The project is a static HTML file served with Three.js from CDN. No dependency to install.

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8002` | Local HTTP server listen port (overridable) |

Dependencies: a recent browser with WebGL, [Three.js](https://threejs.org/) r160 (CDN importmap).

## ⚠️ Deployment consistency

The `version.json` file (served next to `index.html`) must be deployed **at the same time** as `index.html` and carry the same version as `GAME_VERSION`. If they diverge, the update banner loops forever.

Before each deployment, check:
```bash
# Shows both versions side by side
grep "const GAME_VERSION" index.html && cat version.json
```

The `version` field (in `version.json`) and `GAME_VERSION` (in `index.html`) must be identical.

**⚠️ Assets:** the `assets/` directory (map preview images) must be copied alongside `index.html` — the home screen references `assets/map-littoral.jpg`, `assets/map-ile.jpg` and `assets/map-barrage.jpg` at runtime.

## 🔬 Visual verification harness

The project includes an automated test harness in `visual-harness/`. It runs the game in a headless browser, places defenses, captures day and night screenshots, measures performance and detects z-fighting flicker. See [`visual-harness/README.md`](visual-harness/README.md) for installation and usage.

### Verification interface exposed in `index.html`

The shipped file deliberately exposes a small API block intended exclusively for the harness. These functions are grouped under an explicit comment in the source code, with the `harness_` prefix:

| Function | Role | Read / Write |
|---|---|---|
| `harness_camTopdown(maxDist, phi)` | Positions the camera in near-top-down view | ✏️ Writes camera position only |
| `harness_camState()` | Returns camera position + target | 📖 Read-only |
| `harness_unprojectScreen(sx, sy, worldY)` | Projects screen → world coordinates | 📖 Read-only |
| `harness_projectWorld(wx, wy, wz)` | Projects world → screen coordinates | 📖 Read-only |
| `<meta name="map-data">` tag | Map scale data (terrainHalf, camMaxDist...) | 📖 Read-only |

**Scope:** camera positioning, coordinate projection, map scale reading. None of these functions modify the game state (buildings, resources, waves, score, etc.).

This block is accepted in the shipped file because it is required for the verification harness to work and is strictly confined to its role — no possible drift toward game-state access.

To check that no other test interface slipped in:
```bash
grep -c "harness_" index.html    # must return the number of functions (4)
grep -c "window.__" index.html   # must be 0 (reserved for the Puppeteer harness)
```

## 🌱 Deterministic seed

Add `?seed=` followed by a number to the URL to replay **exactly** the same map:

```
https://games.cloudfr.net/floodcity/?seed=42
```

The seed controls the layout of the city, buildings, street furniture and beach. Same seed and same level = same map, every time. Without the parameter, a random map is generated as before. Handy for comparing strategies, sharing a configuration or reproducing a bug.

## 📋 Release notes

### 2026.10.008
- New **Archipel** map: the island split in three by two channels, with a tidal bore in each channel at every wave

### 2026.10.007
- New **Tempête** map: rain and fog, the wave zone shows up only 8 s before impact, the wind pushes waves sideways and gusts double some of them

### 2026.10.006
- New **Estuaire** map: a tidal bore runs up the river with every wave and overflows onto the banks — protect the quays

### 2026.10.005
- New **Marée montante** map: the sea rises after each wave and swallows the beach, then the first streets
- Home screen: three map cards per row

### 2026.10.004
- New **Barrage** map: a dam holds back a lake above the city; one breach per game after about 45 s of preparation, somewhere along the dam
- 10 s before the breach, leaks appear at several places — only one is the real one
- The wave launch message now names the sector consistently with the compass

### 2026.10.003
- See roughly where the next wave will hit: an arrow and a coloured band on the sea, from the start of the countdown (amber, then red 10 s before impact)
- The banner names the sector (west / centre / east) instead of « front SUD » on the coast map; the island still shows the front

### 2026.10.002
- 10 levels per map: level 1 is a small village with gentle waves, then the city grows, towers appear and waves get stronger; level 10 is endless
- Hold the level's waves to unlock the next one (progress saved in the browser); level picker on the home screen

### 2026.10.001
- Redesigned home screen: map previews, difficulty badges, best score in evidence, animated wave background
- In-game interface: clickable build toolbar with costs, wave countdown banner with the threatened front, discreet messages instead of the large central alert, lighter stats panel with a buildings gauge
- New end-of-game card: score and record, waves held, buildings saved, walls and trenches built
- Richer 3D rendering: gradient sky (day and night), deeper water with sun reflections, whiter wave foam, warmer light
- `?seed=N` still reproduces exactly the same maps as before

### 2026.09.001-c2
- In-game help panel accessible with **H** or **?** key (closed with **Échap**, button ✕, or overlay click)
- First-launch hint: "Appuie sur H pour l'aide" shown ~1.5 s after game starts (once per browser)
- Controls bar corrected and enriched: camera/zoom/aide entries

### 2026.09.001-c1
- On Littoral the camera now starts on the sea side: the beach and the front to defend are in the foreground instead of being hidden behind the towers
- The cost shown when switching wall tier or trench mode now matches the real cost (it still showed the old prices)
- The controls bar fits on a single line on wide screens
- Documentation brought up to date (maps, costs, waves, economy, defeat condition)

### 2026.09.001
- Update client reworked: newer versions are read from GitHub Releases, with a detail modal listing the intermediate release notes, and `version.json` kept as an offline fallback
- New optional "auto-update" toggle: the game reloads by itself when a new version is out, but only from the home screen or after a game over — never mid-wave
- The project now lives in the `MiniGames` monorepo, in the `floodcity/` folder

### 2026.08.002
- Island completely reworked: much larger, irregular coastline, countryside around the city
- Fixed island ground rendering, which could fail to appear
- Ability to replay exactly the same map with the `?seed=` parameter
- Internal tooling: visual verification harness and balancing test bench

### 2026.08.001
- Compliance pass: default port 8002, VERSION and CHANGELOG creation, enriched documentation

### 2026.07.013
- The island is noticeably larger, with an irregular coastline, real countryside around the city and less intrusive streets
- It is possible to replay exactly the same map by adding `?seed=` followed by a number to the game URL
- Display fixes on the island, including the ground which could fail to appear
- Generation is deterministic: same seed, same result on every load

### 2026.07.012
- Threatened residents actually take shelter in buildings and gradually come back out once the danger is over; those whose building was destroyed do not return
- A seaside parking lot appears, on which you can build
- Waves now wash away anything placed: streetlights and their halos, traffic lights, parasols, sun loungers, balls — a devastated area goes dark at night
- Lying sunbathers stand up and flee at the alert, then come back to lie down once the danger is over
- Surfaces — roadway, sidewalks, markings, parking — stay in place after a wave passes

### 2026.07.011
- Night streetlight glow softened: halos no longer blow out the roadway to white and the blue nighttime atmosphere regains dominance, for a more natural feel
- Improved scenery legibility in night mode

### 2026.07.010
- **Major gameplay change**: walls and trenches can now be built on the whole strip between the city and the sea, beach included — this area was wrongly blocked even though it is the core of defense-in-depth
- A developed waterfront appears: promenade, railings along the sand, palm trees, street furniture — all traversable, you can build on top
- Beach scenery and defenses now coexist naturally, never blocking each other again

### 2026.07.009
- Fixed road flicker in night mode — the road grid no longer flashes when moving the camera
- Improved on-ground element display stability in low-light conditions

### 2026.07.008
- Longer intervals between waves, leaving more time to rebuild and watch the city breathe between two alerts
- A day/night mode toggleable with the N key: clear moonlit night with lit windows, streetlights, lighthouses and beach bonfires
- Richer street furniture: streetlights along the roads and traffic lights on both sides of intersections
- The street network is reorganized into larger blocks, making movement smoother and the city more legible
- Wave shape reworked — less angular, more organic

### 2026.07.007
- Difficulty scales without a cap and defeat thresholds adapt to each map's size — no more restarts after 5 waves
- Best scores are kept per map and shown in the menu, to track progress from one session to the next
- The city reacts to alerts: cars and pedestrians flee the threatened area, then life resumes once the danger is over
- The beach comes to life — sunbathers, strollers, ball players and roving vendors who abandon their cart when the siren sounds
- A compass indicates north and the front where the next wave will come from, to better anticipate your defenses
- Scaled scenery and revised placement — no building can be constructed on the roadway anymore, sidewalks stay clear

### 2026.07.006
- Internal fix: the `<meta name="version">` tag is no longer hardcoded in the HTML; it is filled dynamically by JavaScript from `GAME_VERSION`, making the previously observed desynchronization between the two sources structurally impossible

### 2026.07.005
- Fixed a display bug: a building destroyed by a wave no longer stayed visible on screen
- Automatic new-version detection: a discreet banner offers to reload when an update is available, without ever interrupting the game
- Non-blocking update banner — the game keeps running while the notification is shown
- Unified scenery scale — pedestrians, trees, parasols, sun loungers and sunbathers brought back to realistic proportions
- Wider beach with more furniture, sea horizon without a visible edge on both maps
- Wave strike zone pushed back, leaving more time to build
- Fixed coastline — beach furniture no longer ends up in the water
- Traffic lights, parasols and sun loungers resized to realistic proportions
- Crosswalks aligned with the real roadway width

### 2026.07.002
- Home screen with a choice between two maps: Shoreline (city set back from the beach) and Island (waves alternating north-south)
- Version number shown in the menu and the HUD

### 2026.07.001
- Waves split into independent, off-center segments with progressive difficulty
- Three wall tiers (sandbag, reinforced, concrete) and trenches that slow the waves
- Preview ghost, progressive score, passive regeneration economy
- Generated city with roads, sidewalks, cars, pedestrians, beach and beach furniture
- Fixes: black screen at startup, memory leak on restart

> **Reminder:** the `version.json` file must be deployed with `index.html` and carry the same version as `GAME_VERSION`.

## Development cost (LLM)

This project was built entirely through AI-assisted sessions (Hermes Agent, deepseek-v4-pro / deepseek-v4-flash). Usage so far (cumulative as of 2026-08-02):

| Metric | Value |
|---|---|
| Input tokens | 4 171 727 |
| Output tokens | 2 057 197 |
| **Total (input + output)** | **6 228 924** |
| Cache read (reused at reduced price) | 358 662 144 |
| API calls | 4 206 |
| **Estimated cost** | **≈ 4.26 USD** |

Full breakdown: [TOKENS.md](TOKENS.md).

## 📝 Repo

This game lives in the [MiniGames](../README.md) repository, in the `floodcity/` folder — [Releases](https://github.com/LostInTheBugs/MiniGames/releases) (tags prefixed `floodcity-`)
