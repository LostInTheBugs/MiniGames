# Changelog

Tous les changements notables de ce projet sont documentés ici.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et le versionnement suit le schéma ANNEE.MM.NNN.

## [2026.09.001-c2] — 2026-10-25

### Fixed
- Title screen: the instruction panel no longer overlaps the cat — instructions and the dark panel are now compressed above y=320 so the cat is fully visible

### Changed
- README: license text changed to MIT, matching other games in the repository

## [2026.09.001-c1] — 2026-10-25

### Fixed
- Reaching the end of the level no longer grants +50 XP on every frame (the cat jumped from level 1 to 10 in a second-and-a-half and the dog catcher became deadly at once). The bonus is granted once, then the next finish line is placed further away
- Jumps are triggered on key press instead of while the key is held: the double and triple jumps now need a new press in mid-air instead of being wasted on the very first jump. A short jump buffer accepts a press made just before landing
- Cars no longer pile up around the camera as the run goes on: each car drives back and forth around its own spawn point
- Short key taps (Enter, P…) were sometimes missed; presses are now queued until processed
- Escape now pauses the game as documented (it used to quit to the title screen without confirmation). The pause screen lists P / Esc to resume, R to restart and M for the menu
- "ÉGOUTS" labels no longer overlap: manholes of the same block are at least 140 px apart
- Rooftop bonuses are placed above rooftops instead of floating inside building façades
- The game-over screen shows the number of fish collected (the counter was never updated)
- The version is read from `version.json` relative to the page, so it also works when the game is served from a sub-folder (games hub); a static `version.json` is shipped for that case
- `localStorage` access for the high score is protected (private browsing)

### Changed
- Title screen: instructions on a dark panel, readable over the lit windows; windows no longer flicker
- Level-up message announces the triple jump at level 6

## [2026.09.001] — 2026-09-13

### Changed
- The project moved into the `MiniGames` monorepo (`LostInTheBugs/MiniGames`, `catadventure/` folder); full git history preserved
- The update client now reads releases from this repository and only considers tags prefixed with `catadventure-` (e.g. `catadventure-2026.09.001`)
- `update.sh` now looks for the monorepo `catadventure-*` release tags

## [2026.08.002-c2] — 2026-08-01

### Ajouté
- Vérifications de mise à jour horaires (setInterval toutes les heures) en plus du check initial à 2 s après chargement
- TTL du cache localStorage aligné sur 1 h : le check horaire refetch réellement les releases GitHub (1 requête/heure, très en dessous de la limite de 60 req/h), le cache déduplique toujours les rechargements rapides dans l'heure
- Le toast se ré-affiche si une nouvelle version apparaît entre deux checks (une version déjà fermée ne re-nag pas, une version différente oui)

## [2026.08.002-c1] — 2026-08-01

### Corrigé
- Le clic sur la notification et les boutons de la modale de mise à jour ne fonctionnaient pas (handlers inline hors de portée de la closure). Les attributs `onclick`/`onchange` inline ont été remplacés par des `addEventListener` câblés à l'intérieur de la closure : toast → ouverture de la modale, croix de fermeture du toast, clic sur le fond de l'overlay, boutons « Mettre à jour maintenant » / « Plus tard », case « Mises à jour automatiques ».

## [2026.08.002] — 2026-08-01

### Ajouté
- Client de mise à jour intégré au jeu : notification toast + modale avec changelog cumulé de toutes les versions intermédiaires
- Comparateur de version adapté au format `ANNEE.MOIS.NNN` avec support du suffixe optionnel `-cX` (une correction `-cX` est postérieure à sa base)
- Cache localStorage (TTL 6h) pour l'API GitHub Releases (respect de la limite 60 req/h)
- Option « Mises à jour automatiques » persistée en localStorage
- Fichier `version.json` généré au build Docker à partir du fichier `VERSION` (via `COPY VERSION` + `printf`)
- Script `update.sh` à la racine : récupère le dernier tag, checkout, rebuild Docker Compose
- Configuration Watchtower (`docker-compose.watchtower.yml`) pour mise à jour automatique activable/désactivable

### Modifié
- `index.html` : ajout du module de détection de mise à jour (~200 lignes JS + CSS)
- `Dockerfile` : génération de `version.json` au build
- `README.md` : version courante mise à jour et section dédiée aux mises à jour

## [2026.08.001] — 2026-08-01

### Ajouté
- Fichier `VERSION` à la racine (2026.08.001)
- Fichier `README.md` avec description, installation, configuration et utilisation
- Fichier `CHANGELOG.md` (ce fichier)
- Fichier `.env.example` avec `PORT=8004`

### Modifié
- Port d'écoute par défaut passé de 80 à **8004** (Dockerfile, nginx.conf, docker-compose.yml)
- Le port est désormais surchargeable via variable d'environnement `PORT` (plus de port codé en dur)
- Dockerfile utilise `envsubst` pour injecter `PORT` dans la configuration Nginx au démarrage
- docker-compose.yml expose `PORT` au conteneur et l'utilise dans les labels Traefik

### Sécurité
- Le port n'est plus codé en dur dans les fichiers de configuration
