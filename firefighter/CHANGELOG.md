# Changelog

All notable changes to Firefighter are documented in this file.

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
