# Frogger

A self-contained remake of the classic Frogger arcade game — pure HTML5 Canvas, no framework, no dependencies, no build step. The whole game lives in a single `index.html` file.

**Current version: 2026.09.001** — [releases](https://github.com/LostInTheBugs/MiniGames/releases) (tags prefixed `frogger-`)

## Gameplay

Guide the frog from the bottom bank to the homes at the top: dodge the traffic on five road lanes, ride the logs across the river, and fill **4 of the 6 homes** to win the run. You start with 4 lives — being hit, drowning or letting the timer run out costs one. Each forward crossing adds points; filling a home is worth a bonus.

## Features

- **3 difficulty levels** — FACILE (calm traffic, 90 s), MEDIUM (classic), DIFFICILE (dense traffic, 45 s)
- Score, remaining lives, crossings counter and floating `+100` popups
- Procedurally drawn pixel-art world (cars, logs, water, houses) with death and win animations
- **WebAudio music and sound effects** with a mute toggle (🔊, preference persisted in `localStorage`)
- **Touch D-pad** shown automatically on coarse pointers / small screens
- Keyboard: arrow keys to move; in the menu `1` / `2` / `3` (or ←/→ + Enter) to pick a difficulty

## Run it locally

Open `frogger/index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# → http://localhost:8080/frogger/
```

No installation, no build step, no server-side code.

## Structure

```
frogger/
├── index.html    # the whole game (HTML + CSS + JS)
├── preview.png   # tile image used by the games hub
├── CHANGELOG.md
└── VERSION
```

## License

MIT — see the repository [LICENSE](../LICENSE).
