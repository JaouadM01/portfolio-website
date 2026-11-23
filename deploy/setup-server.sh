#!/usr/bin/env bash
# Inrichting op de VPS, naast de bestaande Caddy-proxy in ~/proxy. Mag opnieuw gedraaid
# worden, bijv. na een wijziging in compose.yaml of Caddyfile.snippet.
#
# Gebruik (op de server, vanuit een map met compose.yaml en Caddyfile.snippet):
#   bash setup-server.sh
#
# Wat het doet:
#   1. ~/portfolio/site met een placeholder-pagina (tot de eerste deploy)
#   2. container 'portfolio-web' starten
#   3. het blok voor jaouadmchichi.nl in ~/proxy/Caddyfile zetten of bijwerken
#      (eerst een back-up, dan valideren, pas daarna Caddy herladen zonder downtime)
set -euo pipefail

HERE=$(cd "$(dirname "$0")" && pwd)
APP=/home/ubuntu/portfolio
CADDYFILE=/home/ubuntu/proxy/Caddyfile
BEGIN='# >>> jaouadmchichi.nl'
END='# <<< jaouadmchichi.nl'

echo "==> Mappen in $APP"
mkdir -p "$APP/site/releases"
if [ ! -e "$APP/site/current" ]; then
  mkdir -p "$APP/site/releases/00000000-placeholder"
  echo '<!doctype html><meta charset="utf-8"><title>Binnenkort</title><p>Binnenkort online.</p>' \
    > "$APP/site/releases/00000000-placeholder/index.html"
  ln -s releases/00000000-placeholder "$APP/site/current"
fi
chmod -R a+rX "$APP/site"

echo "==> Deploy-ontvanger voor GitHub Actions"
install -m 755 "$HERE/receive-release.sh" "$APP/receive-release.sh"

echo "==> Container portfolio-web"
install -m 644 "$HERE/compose.yaml" "$APP/compose.yaml"
sudo docker compose -f "$APP/compose.yaml" up -d

echo "==> Caddyfile"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
# Oude versie van ons blok eruit, overige sites blijven precies zoals ze zijn
awk -v b="$BEGIN" -v e="$END" '$0==b{skip=1} !skip{print} $0==e{skip=0}' "$CADDYFILE" \
  | sed -e :a -e '/^\n*$/{$d;N;ba' -e '}' > "$work/base"
{ cat "$work/base"; printf '\n'; cat "$HERE/Caddyfile.snippet"; } > "$work/Caddyfile"

if cmp -s "$work/Caddyfile" "$CADDYFILE"; then
  echo "    al up-to-date"
else
  sudo docker cp "$work/Caddyfile" caddy:/tmp/Caddyfile.new
  sudo docker exec caddy caddy validate --config /tmp/Caddyfile.new --adapter caddyfile
  backup="$CADDYFILE.bak-$(date +%Y%m%d-%H%M%S)"
  cp -p "$CADDYFILE" "$backup"
  echo "    back-up: $backup"
  # 'cat >' i.p.v. mv: hetzelfde bestand (inode) blijft, anders ziet de bind-mount in de container het niet
  cat "$work/Caddyfile" > "$CADDYFILE"
fi

sudo docker exec -w /etc/caddy caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
echo "==> Klaar. Caddy haalt het certificaat op zodra de DNS van jaouadmchichi.nl naar deze server wijst."
