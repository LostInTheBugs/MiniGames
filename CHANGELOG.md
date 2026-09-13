# Changelog

Repository-level changes for the MiniGames collection. Each game keeps its own
`CHANGELOG.md`, its own `VERSION` file and its own release tags
(`<game>-YYYY.MM.NNN`).

## [2026.09.001] — 2026-09-13

### Added
- Repository created by consolidating three games, with their full git histories preserved:
  - `catadventure/` — imported from `LostInTheBugs/CatAdventure`
  - `floodcity/` — imported from `LostInTheBugs/FloodCity`
  - `frogger/` — first publication of the game as source code
- Repository-level `README.md`, `LICENSE`, `VERSION`, `CHANGELOG.md`
- Release workflow creating one GitHub release per `<game>-<version>` tag, with notes extracted from the game's `CHANGELOG.md`

### Changed
- CatAdventure's update client now reads releases from this repository (`catadventure-` tags)
- Histories normalized to the single `LostInTheBugs` author identity
