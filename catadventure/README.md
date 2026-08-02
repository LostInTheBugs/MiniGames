# CatAdventure 🐱

2D platformer game where a cat explores a city, collects fish, avoids obstacles and progresses through different districts. Pure HTML5 Canvas — no framework, no build step.

## Version

Current version: **2026.08.002-c2**

[See all releases on GitHub](https://github.com/LostInTheBugs/CatAdventure/releases)

## Installation and deployment

### Prerequisites

- Docker and Docker Compose
- A Traefik reverse proxy with a `traefik-public` network (for production deployment)

### Local launch

```bash
docker compose up -d
```

The game is served by Nginx on port **8004** (overridable via the `PORT` environment variable).

### Production deployment

The `docker-compose.yml` is preconfigured for Traefik with Let's Encrypt on the `catadventure.cloudfr.net` domain. Adjust the domain in the Traefik labels if needed.

```bash
# Override the port if needed
PORT=8080 docker compose up -d
```

## Configuration

| Variable   | Default value | Description                |
|------------|---------------|----------------------------|
| `PORT`     | `8004`        | Nginx listen port          |

A `.env.example` file is provided — copy it to `.env` to customize.

### Dependencies

No external dependency. The Docker image is based on `nginx:alpine`. The game runs in the browser on the client side (Canvas + JavaScript).

## Usage

Open your browser at `http://localhost:8004`. Controls:

- **Left/right arrows** or **A/D**: move
- **Up arrow**, **W** or **Space**: jump
- **P** or **Esc**: pause
- On mobile, touch buttons are shown automatically

Goal: collect fish, level up, explore the city and its sewers.

## Update

The game embeds a browser-side update client: on load, it compares the deployed version (`version.json`, generated at Docker build time from the `VERSION` file) with the latest GitHub release. If a newer version exists, a toast notification appears and a modal shows the cumulative changelog of all intermediate versions.

GitHub API results are cached in the browser (localStorage, 6h TTL) to respect the 60 requests per hour limit.

### Manual update (server)

```bash
cd /opt/catadventure   # or the installation directory
bash update.sh
```

The script:
1. Fetches remote tags (`git fetch --tags`)
2. Finds the latest tag in `YEAR.MONTH.NNN` format
3. Checks out the tag
4. Rebuilds and restarts the container (`docker compose up -d --build`)

Check-only mode:

```bash
bash update.sh --check   # exit 0 = update available, exit 1 = already up to date
```

### Automatic update (Watchtower)

To enable Watchtower (watches the image and updates automatically):

```bash
ln -sf docker-compose.watchtower.yml docker-compose.override.yml
docker compose up -d
```

To disable:

```bash
rm docker-compose.override.yml
docker compose down watchtower
```

### Cron alternative

```bash
# Check every hour, update if needed
0 * * * * cd /opt/catadventure && bash update.sh --check && bash update.sh
```

## Development cost (LLM)

This project was built entirely through AI-assisted sessions (Hermes Agent, deepseek-v4-pro / deepseek-v4-flash). Usage so far (cumulative as of 2026-08-02):

| Metric | Value |
|---|---|
| Input tokens | 1 112 571 |
| Output tokens | 480 273 |
| **Total (input + output)** | **1 592 844** |
| Cache read (reused at reduced price) | 141 952 256 |
| API calls | 804 |
| **Estimated cost** | **≈ 1.35 USD** |

Full breakdown: [TOKENS.md](TOKENS.md).

## License

Personal project — all rights reserved.
