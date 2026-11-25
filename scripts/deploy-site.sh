#!/bin/bash
# Publishes ./site to the gh-pages branch (GitHub Pages: https://mzwesh-1.github.io/lula/).
#   npm run deploy-site
set -e
ROOT=$(cd "$(dirname "$0")/.." && pwd)
node "$ROOT/scripts/build-site.js"
TMP=$(mktemp -d)
cp -r "$ROOT/site/." "$TMP/"
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-Soga}" -c user.email="${GIT_AUTHOR_EMAIL:-soga@users.noreply.github.com}" commit -q -m "Publish site from $(git -C "$ROOT" rev-parse --short HEAD)"
git push -q -f "$(git -C "$ROOT" remote get-url origin)" gh-pages
echo "Published to gh-pages"
