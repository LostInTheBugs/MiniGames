# CatAdventure 🐱

Jeu de plateforme 2D dans lequel un chat explore une ville, collecte des poissons, évite des obstacles et progresse à travers différents quartiers. Entièrement en HTML5 Canvas vanilla — aucun framework, aucun build step.

## Installation et déploiement

### Prérequis

- Docker et Docker Compose
- Un reverse proxy Traefik avec un réseau `traefik-public` (pour le déploiement en production)

### Lancement local

```bash
docker compose up -d
```

Le jeu est servi par Nginx sur le port **8004** (surchargeable via la variable d'environnement `PORT`).

### Déploiement production

Le `docker-compose.yml` est préconfiguré pour Traefik avec Let's Encrypt sur le domaine `catadventure.cloudfr.net`. Ajustez le domaine dans les labels Traefik si nécessaire.

```bash
# Surcharger le port si besoin
PORT=8080 docker compose up -d
```

## Configuration

| Variable   | Valeur par défaut | Description                |
|------------|-------------------|----------------------------|
| `PORT`     | `8004`            | Port d'écoute de Nginx     |

Fichier `.env.example` fourni — copiez-le en `.env` pour personnaliser.

### Dépendances

Aucune dépendance externe. L'image Docker est basée sur `nginx:alpine`. Le jeu tourne dans le navigateur côté client (Canvas + JavaScript).

## Utilisation

Ouvrir le navigateur sur `http://localhost:8004`. Commandes :

- **Flèches gauche/droite** ou **A/D** : se déplacer
- **Flèche haut**, **W** ou **Espace** : sauter
- **P** ou **Échap** : pause
- Sur mobile, boutons tactiles affichés automatiquement

Objectif : collecter des poissons, monter en niveau, explorer la ville et ses égouts.

## Version

Version courante : **2026.08.001**

[Voir toutes les releases sur GitHub](https://github.com/LostInTheBugs/CatAdventure/releases)

## Licence

Projet personnel — tous droits réservés.
