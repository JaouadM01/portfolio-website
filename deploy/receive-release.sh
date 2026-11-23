#!/usr/bin/env bash
# Ontvangt een release als tar.gz op stdin en zet hem live. Dit is het vaste commando
# ('command=' in ~/.ssh/authorized_keys) van de deploy-sleutel die GitHub Actions gebruikt:
# met die sleutel kan je dus alleen dit script draaien, geen shell openen.
#
# Staat op de server als ~/portfolio/receive-release.sh (geïnstalleerd door setup-server.sh).
#
# Handmatig testen:  tar -czf - -C dist . | ssh <host> bash ~/portfolio/receive-release.sh
set -euo pipefail

SITE=/home/ubuntu/portfolio/site
# Nederlandse tijd, net als deploy.ps1, zodat de mapnamen van beide routes in de juiste volgorde staan
release=$(TZ=Europe/Amsterdam date +%Y%m%d-%H%M%S)
dir="$SITE/releases/$release"

mkdir -p "$dir"
# Gaat er iets mis vóór de omschakeling, dan ruimen we de halve release op en blijft de oude live
trap 'rm -rf "$dir"' ERR

tar -xzf - -C "$dir" --warning=no-timestamp
if [ ! -f "$dir/index.html" ]; then
  echo "Geen index.html in de release, live versie blijft staan" >&2
  rm -rf "$dir"
  exit 1
fi
chmod -R a+rX "$dir"

ln -sfn "releases/$release" "$SITE/current.tmp"
mv -Tf "$SITE/current.tmp" "$SITE/current"
trap - ERR

# Alleen de laatste 5 releases bewaren
cd "$SITE/releases"
ls -1t | tail -n +6 | xargs -r rm -rf

echo "Live: release $release"
