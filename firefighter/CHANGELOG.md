# Changelog

All notable changes to Firefighter are documented in this file.

## [2026.10.009] — 2026-10-31

### Added — second wave: gameplay
- **Bulldozer** 🚜 (key **8**; village, mountain, large and co-op maps): click where to dig — it cuts a 13 × 3-cell trench of bare earth across the wind (brown aiming preview). Fire does not cross it (only embers jump it); it cannot dig a burning cell
- **Evacuating a district** 🏃 (key **E** or the button in the fleet bar, 3 orders per mission — per player in co-op): residents of every building within 7 cells leave in 10–16 s, so nobody is trapped if the fire arrives later (+40 points per person spared, −5 per building evacuated)
- **Major incidents**, once per mission (from level 2 in solo, always in co-op):
  - **factory fire**: a warehouse that stays hot too long explodes — buildings around catch fire, trucks nearby are damaged
  - **pile-up**: 5–7 trapped victims, three times more cutting-out and care work, longer countdown
  - **campsite threatened by a forest fire**: every truck can drive campers out before the flames arrive; the campers also leave little by little
  - +300 points when it is dealt with
- **Night missions** 🌙 (tick box on each map card, and in the co-op room): aircraft stay on the ground, fire spreads a little slower, dark sky with lit windows, score ×1.3
- **Fire station upgrades** 🔧 (solo): each mission earns credits (score ÷ 10, half if it fails), spent in the new « Caserne » tile — extra fire engine, extra forest truck, second helicopter, bigger tanks (+30 %), faster trucks (+12 %), heat protection (−30 % damage), faster refills (×1.6)

### Changed
- The bulldozer's trench, evacuations, campsites and explosions are synced in co-op

## [2026.10.008] — 2026-10-31

### Added — co-op, first wave
- **Calls for reinforcements**: **B** (or the 🆘 button) asks for a vehicle type (or « anything ») at a spot on the map; a 🆘 marker in the caller's colour appears for everyone and a chip in the players bar jumps the camera there. The first teammate who sends a matching vehicle there answers the call (+60 points); calls last 2 minutes, 3 open calls per player at most
- **Border fire**: once per mission (between 30 and 45 % of the time), a large forest fire starts between two players' sectors — « FEU MAJEUR entre Alice et Bob », +300 points when it is put out
- **Reserving shared aircraft**: 🔒 next to a Canadair or the retardant aircraft keeps it for you for 60 s (or until you send it); the others see who reserved it
- **Quick messages**: **T** then **1–6** (« OK, j'y vais », « Besoin d'aide ici ! », « Il me faut un avion », « Feu hors de contrôle », « C'est maîtrisé », « Attendez-moi »); help and fire messages also drop a ping where your mouse is. Shown with reinforcements, departures and returns in a feed on the left
- **Per-player report** at the end of the mission: orders, reinforcements sent to other sectors, people evacuated, accident rescues, buildings saved, fires put out, damage from drops — and 🏅 firefighter of the day
- **Reconnection**: a player who loses the connection or reloads the page gets their place back within 2 minutes (the relay keeps the slot; the host resends the full state); their vehicles keep working meanwhile

### Changed
- The players bar now sits under the game panel on the left, with the buttons and open calls
- Relay: room tokens, away players (`away` / `back`), stable player order

## [2026.10.007] — 2026-10-31

### Added
- **Four co-op maps of 192 × 192 cells** (twice the large maps), generated for the number of players — **one town and one fire station per player**, far apart, plus a shared airfield:
  - **Région forestière**: towns in valleys of a huge wooded massif dotted with lakes
  - **Littoral**: harbour towns on the coast (quays, boats) and villages in the pine and scrub hills, offshore wind
  - **Vallées de montagne**: one town per valley, rocky ridges between them, winding roads
  - **Métropole et banlieues**: a large city cut by a river, with a ring road, an industrial area and its suburbs
- Each station has its own fleet (fire engines, ladder, light vehicle, forest trucks, helicopter); the **Canadairs and the retardant aircraft are shared** at the airfield — first come, first served, the vehicle list shows who called them
- Alerts fall in turn in each player's sector (« … (chez Alice) »); tolerated losses and alert rate scale with the number of towns; missions last twice as long
- Everyone can still send reinforcements anywhere on the map
- Each player's camera starts over their own station, which carries their name and colour; **C** brings the camera back to it
- **Mini-map** (bottom left) on large and co-op maps: fires, burnt areas, stations, vehicles, alerts, pings and the current view; click or drag to move the camera

### Changed
- Co-op rooms now play on the co-op maps only (the role split across a single station is gone)
- Snapshots send changed cells in a compact binary form; wetness is synced on 5 levels
- Relay: `/health` also answers when the reverse proxy strips the path prefix (fix applied on the server by hand in 2026.10.006)

## [2026.10.006] — 2026-10-31

### Added
- **Co-op multiplayer** (2–4 players, online): new « Multijoueur » tile on the home screen
  - create a room and share its 4-letter code or link (`?join=CODE`); the host picks the map and level
  - the fleet is split by role (urban / forest / air…, balanced by vehicle count) or shared by everyone; each player only commands their own vehicles, the others are shown with their firefighter's colour
  - shared map pings (Shift + click or G), team pause (P), shared win or loss, host-only speed and restart
  - the host runs the simulation and sends 5 snapshots per second (changed cells, buildings, vehicles, alerts, weather, score); the other players generate the same map from the same seed and send their orders to the host
  - a player who leaves hands their vehicles over to the host; if the host leaves or switches tab, the game stops / pauses for everyone
- `relay/`: small WebSocket relay server (Node + `ws`, Docker) that only creates rooms and forwards messages — port **8008** (`FF_RELAY_PORT`), served behind the reverse proxy at `/firefighter/ws`

## [2026.10.005] — 2026-10-31

### Changed
- Difficulty curve reworked after playtesting (level 1 had become hard with the new weather and occupants):
  - levels 1–2: slower spread and growth, weaker wind, wetter weather (drought −0.25, more showers), alerts every ~42 s, longer accident countdown (95 s), no embers, rarer gusts, fewer trapped occupants who also get out on their own faster
  - the pressure then rises level by level: embers from level 3 (full at level 6), drought +0.06 per level, alerts down to every ~10 s
- Balance check: levels 1–2 are forgiving even with few interventions; from level 3 an idle player loses on every map, a simple automatic player still wins up to level 5

## [2026.10.004] — 2026-10-31

### Added
- **Weather**: drought level per map and level (yellows the vegetation, speeds up spread, dries water faster), wind gusts (« Rafales : le feu s'emballe »), rain showers (slow the fire, put out small fires, wet everything, darker sky and rain), wind slowly turning. Shown under the compass and in the start message
- **Embers**: with strong wind and drought, a burning forest throws embers 2–5 cells downwind that light vegetation or a roof — this is how a forest fire reaches a town; a building reached by the fire raises its own alert
- **Trapped occupants**: each building has occupants; when it burns some get out alone (and house occupants keep getting out while the fire is moderate), the others stay trapped — shown in the alert and the left panel. The fire engine evacuates up to the 3rd floor, the aerial ladder at every floor; people still inside when the building collapses are victims
- **Road accidents in two steps**: trapped victims must first be cut out by the fire engine, then treated by the light vehicle (the engine also treats, slowly); the banner says which step is missing
- **Trucks caught in the fire**: heat damages a truck (the forest fire truck is protected); badly damaged it retreats to the station for repairs, at 0 it is lost (−300 points)
- **Firebreaks**: a water truck sent where nothing burns wets the vegetation (and buildings) around it
- **Two large maps (96 × 96)** with two fire stations, an airfield and longer missions: **Massif forestier** (three villages in a wooded massif, lakes) and **Côte méditerranéenne** (three seaside towns, a small harbour, pine woods and scrub on the hills, offshore wind)
- **Retardant aircraft** (large maps, key 7): drops a 14-cell red strip of retardant that makes vegetation almost fireproof for 2 minutes (washed out faster by rain); reloads at the airfield; aiming preview in pink
- The Aléatoire tile now draws among 6 maps

### Changed
- The water-bombing helicopter now always refills its bucket on water (no more refill at the helipad)
- Light vehicle renamed « Véhicule léger (secours) » (🚑): it treats the victims, the fire engine cuts them out
- Victims tolerated: 3 (levels 1–3), 2 (4–6), 1 (7–8), none (9–10)
- Trucks return to the nearest station; refill points are every station and hydrant
- Balance checked on every map: an idle player loses every time; a simple automatic player wins the small maps up to level 6 and the large maps at level 1

## [2026.10.003] — 2026-10-31

### Fixed
- Back at the fire station, a truck now refills its tank completely (it used to stay at least half empty) before being available again
- A Canadair could put out a house or tower fire without consequence: its drop (several tonnes at once) still puts the fire out, but now wrecks every building under it (−55 HP for a house, warehouse or boat, −35 for a tower; it can collapse) and injures people in the nearby streets; −150 points per building, −100 per injured person; warning message, damage listed on the end screen
- Trucks no longer drive through burning cells (the forest fire truck still can, more slowly)

### Added
- Aiming preview for aircraft: while hovering the map with a Canadair or a helicopter selected, the drop footprint is shown (9 × 2.6 strip along the Canadair's approach, red over homes; 2.3 circle for the helicopter); dispatching a Canadair onto homes warns before the drop
- The helicopter bucket slightly damages a house it hits and only reaches the top of a tower

## [2026.10.002] — 2026-10-31

### Added
- **Aléatoire** tile after the map cards (mosaic of the four map previews and a die): starts a map drawn at random — never the last one played — at its highest unlocked level, and announces the draw. The draw uses the native RNG, so `?seed=N` maps are unchanged

## [2026.10.001] — 2026-10-27

### Added
- First release: a 3D fire and rescue dispatch game (Three.js r160, single `index.html`)
- Four maps on a 48 × 48 grid, each with a fire station, a helipad, hydrants and a water body:
  - **Village et forêt** (⭐): a village among wooded hills, fields and a pond
  - **Ville** (⭐⭐): dense blocks of houses and towers, a river and a park
  - **Port** (⭐⭐): quays, warehouses, moored boats, the sea and a hillside town
  - **Montagne** (⭐⭐⭐): relief, slopes that slow trucks down, a winding road, a hamlet and a lake
- Six vehicle types, each with its own pathfinding class (road only, road and grass, off-road), speed, water tank and role:
  - **Canadair**: drops a long strip of water along its flight path, then scoops at the nearest water
  - **Hélicoptère bombardier**: drops its bucket on a 2-cell circle, refills at water or the helipad
  - **Camion feu de forêt** (CCF): off-road, enters the forest, sprays vegetation fires around it
  - **Véhicule léger** (VL): fast, no water, rescues road accident victims
  - **Grande échelle**: roads only, reaches the upper floors — the only fully effective vehicle on towers (4+ floors)
  - **Camion de pompiers** (FPT): houses, warehouses, boats and accidents; only the lower floors of a tower
- Pick a vehicle type (toolbar or keys 1–6) or a specific vehicle (list on the right), click on the map: the nearest available one drives or flies there and works on its own — sprays what burns in reach, moves closer to nearby fires, goes to refill (station, hydrants, water) when its tank is empty and comes back, returns to base when done
- Cell-based fire simulation: vegetation burns and spreads to its neighbours, faster in the forest and downwind (the wind slowly turns, compass top right); watered cells stay damp and burn badly (firebreaks); buildings catch fire from neighbouring flames, lose integrity and collapse; burning buildings ignite their surroundings
- Incidents by map: forest, house, tower, warehouse and boat fires, road accidents with a rescue countdown; alert message with the sector, icon above the incident
- 10 levels per map (unlocked by winning the previous one): more frequent alerts, faster spread, stronger wind, shorter accident countdowns, fewer tolerated losses; hold the duration without exceeding lost buildings, burnt forest or victims; level 10 is endless
- HUD (time, active incidents, burning cells, losses, score), banner with the most urgent accident, wind compass, fleet toolbar with available/total counts, vehicle list with state and water gauge, help panel (H), pause (P/Esc), speed ×2 (F)
- Best score and unlocked level per map stored in the browser; `?seed=N` gives the same map for the same level
- Update client: hourly check of this repository's `firefighter-` releases, banner, details window with all release notes, optional automatic reload on the home screen or after a game
