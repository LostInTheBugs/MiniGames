# Changelog

All notable changes to Flood City are documented in this file.

## [Unreleased]

### Added
- **Level system**: 10 levels per map with increasing difficulty (city density, building height, tower availability, wave strength, starting resources). Progression saved in localStorage — beating a level unlocks the next. Victory requires surviving all waves *and* keeping >15 % of buildings standing. Level 10 is endless.
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
