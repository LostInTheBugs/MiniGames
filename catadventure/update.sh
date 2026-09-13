#!/usr/bin/env bash
# ============================================================
#  CatAdventure — update.sh
#  Récupère le dernier tag catadventure-*, checkout, rebuild Docker
#  Usage : bash update.sh [--check]
#    --check  : vérifie seulement si une MAJ est dispo (exit 0=oui, 1=non)
#  À lancer depuis le dossier catadventure/ d'un clone du dépôt
#  (les releases de ce jeu sont taguées catadventure-YEAR.MONTH.NNN).
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# --- Récupérer les tags distants ---
echo "[update] Récupération des tags..."
git fetch --tags origin

# --- Déterminer la version actuelle (commit checkouté) ---
CURRENT_TAG=$(git describe --tags --exact-match 2>/dev/null || echo "")
CURRENT_TAG="${CURRENT_TAG#catadventure-}"
if [ -z "$CURRENT_TAG" ]; then
  # Fallback : lire le fichier VERSION
  CURRENT_TAG=$(cat VERSION 2>/dev/null || echo "0.0.0")
fi
echo "[update] Version actuelle : $CURRENT_TAG"

# --- Trouver le dernier tag (format catadventure-YEAR.MONTH.NNN) ---
LATEST_TAG=$(git tag --list 'catadventure-20[0-9][0-9].[0-9][0-9].[0-9][0-9][0-9]*' --sort=-version:refname | head -1)
if [ -z "$LATEST_TAG" ]; then
  echo "[update] Aucun tag de release trouvé."
  exit 1
fi
LATEST_VER="${LATEST_TAG#catadventure-}"
echo "[update] Dernière release : $LATEST_VER"

# --- Mode check-only ---
if [ "${1:-}" = "--check" ]; then
  if [ "$CURRENT_TAG" = "$LATEST_VER" ]; then
    echo "[update] Already up-to-date."
    exit 1  # pas de MAJ dispo
  else
    echo "[update] Update available: $LATEST_VER"
    exit 0  # MAJ dispo
  fi
fi

# --- Vérifier si déjà à jour ---
if [ "$CURRENT_TAG" = "$LATEST_VER" ]; then
  echo "[update] Déjà à jour ($CURRENT_TAG). Rien à faire."
  exit 0
fi

# --- Checkout du tag ---
echo "[update] Checkout du tag $LATEST_TAG..."
git checkout "$LATEST_TAG"

# --- Rebuild et redémarrage Docker ---
echo "[update] Reconstruction des conteneurs..."
docker compose up -d --build

echo "[update] Mise à jour terminée : $CURRENT_TAG → $LATEST_VER"
