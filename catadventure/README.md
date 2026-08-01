# CatAdventure 🐱

Jeu de plateforme 2D dans lequel un chat explore une ville, collecte des poissons, évite des obstacles et progresse à travers différents quartiers. Entièrement en HTML5 Canvas vanilla — aucun framework, aucun build step.

## Version

Version courante : **2026.08.002-c2**

[Voir toutes les releases sur GitHub](https://github.com/LostInTheBugs/CatAdventure/releases)

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

## Mise à jour

Le jeu intègre un client de mise à jour dans le navigateur : au chargement, il compare la version déployée (`version.json`, généré au build Docker à partir du fichier `VERSION`) à la dernière release GitHub. Si une version plus récente existe, une notification toast s'affiche, et une modale présente le changelog cumulé de toutes les versions intermédiaires.

Les résultats de l'API GitHub sont mis en cache dans le navigateur (localStorage, TTL 6h) pour respecter la limite de 60 requêtes par heure.

### Mise à jour manuelle (serveur)

```bash
cd /opt/catadventure   # ou le répertoire d'installation
bash update.sh
```

Le script :
1. Récupère les tags distants (`git fetch --tags`)
2. Trouve le dernier tag au format `ANNEE.MOIS.NNN`
3. Fait le checkout du tag
4. Rebuild et redémarre le conteneur (`docker compose up -d --build`)

Mode vérification seule :

```bash
bash update.sh --check   # exit 0 = mise à jour disponible, exit 1 = déjà à jour
```

### Mise à jour automatique (Watchtower)

Pour activer Watchtower (surveille l'image et met à jour automatiquement) :

```bash
ln -sf docker-compose.watchtower.yml docker-compose.override.yml
docker compose up -d
```

Pour désactiver :

```bash
rm docker-compose.override.yml
docker compose down watchtower
```

### Alternative cron

```bash
# Vérification toutes les heures, mise à jour si nécessaire
0 * * * * cd /opt/catadventure && bash update.sh --check && bash update.sh
```

## Licence

Projet personnel — tous droits réservés.
