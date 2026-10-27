# MiniGames

A collection of self-contained web mini-games — pure HTML5/Canvas browser games by [LostInTheBugs](https://github.com/LostInTheBugs). Each game lives in its own folder and is playable standalone, with no build step.

| Game | Folder | Version | Notes |
| ---- | ------ | ------- | ----- |
| 🐱 **CatAdventure** | [`catadventure/`](catadventure/) | 2026.09.001-c2 | 2D platformer — a cat explores a city, collects fish and avoids obstacles. Pure HTML5 Canvas, no dependencies. |
| 🌊 **Flood City** | [`floodcity/`](floodcity/) | 2026.10.004 | 3D flood-defense game — build walls, dig trenches and protect your city from the waves. Three.js (loaded via import map). |
| 🐸 **Frogger** | [`frogger/`](frogger/) | 2026.09.001-c2 | Remake of the classic arcade crossing game — five road lanes, five river lanes and six homes. Pure HTML5 Canvas, no dependencies. |

## Versions and releases

Each game is versioned independently with the `YEAR.MONTH.NNN` scheme and released from this repository with a per-game tag:

- `catadventure-2026.09.001-c2`
- `floodcity-2026.10.004`
- `frogger-2026.09.001-c2`

Release notes are extracted from the game's own `CHANGELOG.md`. The root `VERSION` file tracks repository-level changes only — see [CHANGELOG.md](CHANGELOG.md).

## Run a game locally

Start any small static server, then open the game's folder:

```bash
python3 -m http.server 8080
# → http://localhost:8080/catadventure/   (or floodcity/, frogger/)
```

You can also simply open the game's `index.html` in a browser (Flood City needs network access to fetch Three.js from its CDN).

## Repository layout

```
.
├── catadventure/          # game + standalone Docker deployment (Nginx, Traefik-ready) + update client
├── floodcity/             # game + visual verification harness
├── frogger/               # game
├── VERSION                # repository version
├── CHANGELOG.md           # repository-level changes
├── LICENSE                # MIT
└── .github/workflows/     # release workflow (one release per game tag)
```

## Deployment

The games are static files, served as subdirectories of a small games hub:

- **CatAdventure** additionally ships a standalone Docker deployment (`Dockerfile`, `docker-compose.yml`, Nginx + Traefik-ready) and a browser-side update client that checks this repository's releases (`catadventure-` tags) against the deployed version.
- **Flood City** ships a visual verification harness (`floodcity/visual-harness/`) — pixel assertions and a balance simulation used to check each change.

## License

MIT — see [LICENSE](LICENSE).
