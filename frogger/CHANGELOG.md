# Changelog

All notable changes to Frogger are documented in this file.

## [2026.09.001-c1] — 2026-10-25

### Fixed
- The timer is reset for every frog (after a successful crossing and after a death). It was a single timer for the whole run: once it reached 0, the frog died again on every respawn and all lives were lost in a row
- The sixth home (right edge) can now be reached: horizontal movement covers the full width of the board
- Landing on the top bank outside a free lily pad now costs a life, as in the original (the frog used to stay stuck there)
- Game speed and timer no longer depend on the screen refresh rate (fixed 60 Hz simulation step)
- Typo in the victory message ("fait traverser")

### Changed
- Board rebalanced: 5 river lanes (alternating directions, logs of 2 to 4 cells) instead of 2, bottom bank reduced from 5 to 3 rows
- Logs are evenly spaced on each lane, so there is never an impassable gap
- Traffic is spread over the 5 lanes with one spawner per lane, and the road is already busy when the game starts

## [2026.09.001] — 2026-09-13

### Added
- First release in the MiniGames repository (the game was previously served standalone from the games hub)
- Core game: road (5 lanes) + river crossing, 6 homes, 4 crossings to win, 4 lives, crossing timer
- 3 difficulty levels (FACILE / MEDIUM / DIFFICILE) with menu selection (mouse, keyboard, touch)
- WebAudio music and sound effects, mute toggle persisted in `localStorage`
- Touch D-pad for coarse pointers; dedicated hint line on small screens
