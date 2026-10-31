# Changelog

All notable changes to Firefighter are documented in this file.

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
