# Changelog

All notable changes to Flood City are documented in this file.

## [2026.10.011] — 2026-10-27

### Changed
- **Estuaire**: no more tidal bore. With every wave the river overflows on 1 to 4 bank sections (one more every 3 levels, 5 to 7.7 units long), drawn when the countdown starts and shown as pulsing red blocks on the bank during its last 8 s (banner « crue : N tronçons »). When the wave is launched, the water spreads 2 to 3.35 units from the bank (animated, then recedes) and destroys the buildings it reaches, unless a wall on that quay stands between them; the wall takes 80 HP
- Level picker « crue », help panel and map description updated; Archipel keeps its bores

## [2026.10.010] — 2026-10-27

### Added
- **Polder** map (⭐⭐⭐): Littoral coast with a sea dike across the whole width (34 one-unit sections at z −12.6, HP 40 + 4 per level), no beach life
- Each wave segment hits the dike once: the section loses the segment's HP and stops it; when a section reaches 0 it breaches (hidden, debris, « Brèche dans la digue ! ») and the segment goes on with what is left; breached sections let the next waves through. Wave HP ×1.2 on this map
- Repairs: clicking the dike with a wall tier repairs the section under the cursor (Sac de sable 50 %, Renforcé 75 %, Béton 100 % of its HP, at the tier's cost); green ghost on a damaged section; no trench in the dike, nothing can be built on the sea side
- Banner « · digue N % · K brèche(s) », level picker « digue », help panel section, home preview `assets/map-polder.jpg`; the Aléatoire tile now draws among 8 maps

## [2026.10.009] — 2026-10-27

### Added
- **Aléatoire** tile after the map cards (mosaic of the map previews and a die): starts a map drawn at random — never the last one played — at its highest unlocked level, and announces the draw. The draw uses the native RNG, so `?seed=N` maps are unchanged

## [2026.10.008] — 2026-10-27

### Added
- **Archipel** map (⭐⭐⭐): the Île split in three by two north–south channels (x = ±12, 4.4 wide) with quays where they cross the island and bridges on the two east–west roads; waves from the north or the south as on the Île
- A tidal bore runs up each channel with every wave, in the wave's direction; same overflow onto the banks as on Estuaire, losing 1.2 % of its HP per unit once over the island (`boreLoss`)
- Level picker « 2 chenaux », help panel section, home preview `assets/map-archipel.jpg`

### Changed
- Estuaire river code generalised to several channels (`rivers`, `mapRivers()`); Estuaire plays the same

## [2026.10.007] — 2026-10-27

### Added
- **Tempête** map (⭐⭐⭐): Littoral coast under a storm — dark grey sky and fog (near 18, far 52), rain (1,500 particles leaning with the wind), lightning flashes every 8–15 s
- The landing-zone marker only appears during the last 8 s of the countdown
- Wind: each wave drifts sideways at 0.4–0.8 units/s (+5 % per level); the banner shows « vent → ouest / est » during the countdown
- Gusts from level 4: every other wave is followed by a smaller one (width ×0.6, height ×0.8) elsewhere along the coast, 6 units further out; gusts give no score, resources or held wave
- Level picker « tempête », help panel section, home preview `assets/map-tempete.jpg`

## [2026.10.006] — 2026-10-27

### Added
- **Estuaire** map (⭐⭐⭐): Littoral coast with a river crossing the city from south to north (bed x −4.1 to −0.9), stone quays, bridges with decks and railings on the three east–west roads; nothing is generated or can be built in the bed
- Tidal bore: every wave launches a second, river-wide wave up the bed (height ×0.6, HP ×2). Nothing can stop it; it keeps full strength up to the top of the beach, then loses 3.5 % of its HP per unit travelled
- Bank overflow: buildings within 0.5 + 2.5 × (remaining strength) of the bed are destroyed as the bore passes, unless a wall on the same bank, nearer the river, takes the hit; each destroyed building weakens the bore
- The bore gives no score, resources or held wave; victory waits for it to leave
- Level picker « mascaret », help panel section, home preview `assets/map-estuaire.jpg`

## [2026.10.005] — 2026-10-27

### Added
- **Marée montante** map (⭐⭐⭐): Littoral layout, but the sea rises after each wave held. By the level's last wave it has gained 12 units + 1.6 per level (beach and coast road at level 1, about 40 % of the city at level 9); endless level: 2.5 per wave; it never goes past buildZMax − 10 and does not rise after the last wave
- Anything under the water line is swallowed: buildings (counted towards defeat), walls, trenches, parked and moving cars, pedestrians, beach life
- No building under the water (red ghost); waves start 3 units off the current water line and the landing-zone marker follows it
- Banner « · mer +N », level picker « la mer monte », help panel section, home preview `assets/map-maree.jpg`

### Changed
- Home screen: three map cards per row
- `destroyBuilding()` factorised (used by waves and by the tide)

## [2026.10.004] — 2026-10-27

### Added
- **Barrage** map (⭐⭐⭐): dam built from 1-unit segments with coping and city-side buttresses, reservoir lake just under the top, concrete apron instead of the beach, no beach life; city-side starting camera; preview `assets/map-barrage.jpg`
- Barrage gameplay: a single breach per game (`levelWaveCount()` = 1) after `prepTime` 45 s (−1.5 s per level, min 30 s); starting resources ×1.8 with a 400 cap (`resourceCap()`); breach 60 % of the width at level 1 (+2 % per level), 1.3× taller and 2× HP; the dam segments it covers disappear with debris and a short camera shake
- Leaks 10 s before the breach: 2 (levels 1–3), 3 (4–7) or 4 (8–10) identical cracks with pulsing water jets, only one at the breach; removed at the breach, game over or menu
- Banner on Barrage: preparation countdown, « Fissures sur le barrage ! », « Le barrage a cédé — tenez bon ! »; level picker shows « une seule rupture »; help panel section
- Defeat threshold and HUD gauge colours follow the map (`defeatRatio` 0.6 on Barrage)

### Fixed
- Wave launch message: sector named consistently with the compass (west/east were swapped)
- Three.js objects are no longer created at load time in the seeded RNG window, so `?seed=N` maps of Littoral and Île are unchanged

### Changed
- Visual harness: maps selected by name (the home screen now has three cards); Île east sand point moved off the first wave's path

## [2026.10.003] — 2026-10-26

### Added
- Next-wave landing zone marker: the next wave (direction, width, position) is planned when the countdown starts; a band 1.6× wider than the wave, offset by up to ±30 % of its width, and a bobbing arrow on the sea show roughly where it will hit — amber during the countdown, red during the 10-second alert, hidden once the wave is launched
- Banner: sector (west / centre / east, consistent with the compass) in the countdown and the alert; « front NORD / SUD » kept only on the island
- Help panel (H): explanation of the marker

### Changed
- `spawnWave` uses the planned direction, width and position instead of drawing them at launch
- Docs: with levels, the same seed gives the same map **for the same level**

## [2026.10.002] — 2026-10-26

### Added
- **Level system**: 10 levels per map with increasing difficulty (city density, building height, tower availability, wave strength, starting resources). Progression saved in localStorage — beating a level unlocks the next. Victory requires surviving all waves *and* keeping >15 % of buildings standing. Level 10 is endless. Only the level's waves are launched; the banner shows the level and wave count (« Niv. 2 · Vague 1/4 ») and « Dernière vague — tenez bon ! » once the last one is out. Victory card with Next level (Enter) / Replay (R) / Menu (M).
- **Level picker on home screen**: 10 dots (1–10) per map card; unlocked levels are clickable, locked ones show 🔒. Selected level highlighted with accent color. Play button shows « Jouer le niveau N ». Clicking a dot selects without starting; clicking the card background or the play button starts at the selected level.

## [2026.10.001] — 2026-10-26

### Added
- Home screen redesign: map preview images (`assets/`), coloured difficulty badges, best score highlighted, "Last game" badge, full-width "Play" button, animated SVG wave background (respects `prefers-reduced-motion`), scrollable on small screens
- Clickable build toolbar (sandbag / reinforced / concrete / trench) with costs from the game constants, active state and greyed-out tools when resources are insufficient; keys 1/2/3/T still work (shared `selectTool`)
- Wave countdown banner with a progress bar that empties over the real countdown; turns red with the threatened front during the alert
- Buildings gauge in the stats panel (green / orange / red)
- End-of-game card: title, map name, score, record badge (never at 0 point) or best score, waves held, buildings saved (with %), walls and trenches built over the whole game; Replay / Change map buttons with R / M shortcuts

### Changed
- The front alert no longer covers the centre of the screen; other messages are shown as a small pill under the banner
- Stats panel lightened (title and mode line removed, tool shown by the toolbar)
- 3D rendering: gradient sky texture for day and night (sRGB), fog matched to the horizon, deeper and glossier water, whiter and more opaque wave foam, warmer and lower sun with adjusted shadow bias
- Visual harness: central message, banner and toolbar hidden during pixel-assertion captures; Île top-down check sampled on open grass instead of the city centre

### Fixed
- Seeded maps (`?seed=N`) are unchanged by the new sky: objects created outside map generation no longer consume the seeded random generator
- README: wave interval is 20–22 s (not 14–22 s)

## [2026.09.001-c2] — 2026-10-25

### Added
- In-game help panel accessible with **H** or **?** key, closed with **Échap**, button ✕, or clicking the overlay background
- First-launch hint: `flashMessage("Appuie sur H pour l'aide")` shown ~1.5 s after game starts (once per browser)

### Changed
- Controls bar: corrected "Clic droit + glisser Caméra", added **H / ?** Aide and **M** Menu entries

## [2026.09.001-c1] — 2026-10-25

### Fixed
- Littoral: the camera now starts on the sea side, with the beach and the front to defend in the foreground (the threatened shore used to be far away, hidden behind the towers)
- The cost shown when switching wall tier or trench mode matches the real cost (it still showed 10/25/50/5 instead of 12/28/52/6)
- The controls bar fits on a single line on wide screens

### Changed
- README brought up to date: maps, controls (N, M), costs and HP, wave intervals, economy, defeat condition
- Visual harness: Littoral pixel assertions follow the new starting view

## [2026.09.001] — 2026-09-13

### Added
- Banner "Détails" button: a modal lists every intermediate release and its notes
- Optional "mise à jour automatique" toggle (persisted in localStorage): the game reloads on its own, but only from the home screen or after a game over — never mid-wave

### Changed
- Update client reworked: newer versions are now read from GitHub Releases (tags prefixed `floodcity-` in the MiniGames repository) instead of only polling `version.json`
- `version.json` kept as a fallback when the GitHub API is unreachable
- The project moved into the `MiniGames` monorepo (`LostInTheBugs/MiniGames`, `floodcity/` folder); full git history preserved

### Fixed
- The update banner was rendered behind the home screen (stacking order) — it is now always visible on top of it

## [2026.08.002] — 2026-08-01

### Changed
- Île entièrement refaite : bien plus grande, littoral irrégulier, campagne dominante autour de la ville
- Correction de l'affichage du sol de l'île, qui pouvait ne pas apparaître
- Possibilité de rejouer exactement la même carte avec le paramètre `?seed=`

### Added
- Harnais de vérification visuelle (18 assertions de pixels, captures, rapport)
- Banc d'essai d'équilibrage (`sim-balance.mjs`)

## [2026.08.001] — 2026-08-01

### Changed
- Port d'écoute par défaut passé de 8080 à 8002 (README, visual-harness)
- Version du jeu mise à jour dans index.html (GAME_VERSION), version.json et visual-harness/package.json
- README enrichi : section configuration, lien vers les releases GitHub

### Added
- Fichier VERSION à la racine (2026.08.001)
- CHANGELOG.md
- Section configuration dans le README

### Fixed
- Alignement des versions entre index.html, version.json et package.json

## [2026.07.013] — 2026-07-29

### Changed
- Île élargie au littoral irrégulier
- Génération déterministe par graine (?seed=)

### Fixed
- Corrections d'affichage du sol
