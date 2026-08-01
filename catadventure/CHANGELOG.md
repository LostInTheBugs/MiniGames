# Changelog

Tous les changements notables de ce projet sont documentés ici.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et le versionnement suit le schéma ANNEE.MM.NNN.

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
