#!/usr/bin/env bash
# ============================================================
#  CatAdventure — update.sh
#  Récupère le dernier tag, checkout, rebuild Docker
#  Usage : bash update.sh [--check]
#    --check  : vérifie seulement si une MAJ est dispo (exit 0=oui, 1=non)
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# --- Récupérer les tags distants ---
echo "[update] Récupération des tags..."
git fetch --tags origin

# --- Déterminer le tag actuel (commit checkouté) ---
CURRENT_TAG=$(git describe --tags --exact-match 2>/dev/null || echo "")
if [ -z "$CURRENT_TAG" ]; then
  # Fallback : lire le fichier VERSION
  CURRENT_TAG=$(cat VERSION 2>/dev/null || echo "0.0.0")
fi
echo "[update] Version actuelle : $CURRENT_TAG"

# --- Trouver le dernier tag (format YEAR.MONTH.NNN) ---
LATEST_TAG=$(git tag --list '20[0-9][0-9].[0-9][0-9].[0-9][0-9][0-9]*' --sort=-version:refname | head -1)
if [ -z "$LATEST_TAG" ]; then
  echo "[update] Aucun tag de release trouvé."
  exit 1
fi
echo "[update] Dernière release : $LATEST_TAG"

# --- Mode check-only ---
if [ "${1:-}" = "--check" ]; then
  if [ "$CURRENT_TAG" = "$LATEST_TAG" ]; then
    echo "[update] Already up-to-date."
    exit 1  # pas de MAJ dispo
  else
    echo "[update] Update available: $LATEST_TAG"
    exit 0  # MAJ dispo
  fi
fi

# --- Vérifier si déjà à jour ---
if [ "$CURRENT_TAG" = "$LATEST_TAG" ]; then
  echo "[update] Déjà à jour ($CURRENT_TAG). Rien à faire."
  exit 0
fi

# --- Checkout du tag ---
echo "[update] Checkout du tag $LATEST_TAG..."
git checkout "$LATEST_TAG"

# --- Rebuild et redémarrage Docker ---
echo "[update] Reconstruction des conteneurs..."
docker compose up -d --build

echo "[update] Mise à jour terminée : $CURRENT_TAG → $LATEST_TAG"
