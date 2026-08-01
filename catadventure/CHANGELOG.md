# Changelog

Tous les changements notables de ce projet sont documentés ici.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et le versionnement suit le schéma ANNEE.MM.NNN.

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
