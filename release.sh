#!/bin/sh

# Adapted from https://toedter.com/2018/06/02/heroku-docker-deployment-update/

appName=$1
imageId=$(docker inspect registry.heroku.com/$appName/web --format={{.Id}})
payload='{"updates":[{"type":"web","docker_image":"'"$imageId"'"}]}'

curl -n -X PATCH https://api.heroku.com/apps/$appName/formation \
-d "$payload" \
-H "Content-Type: application/json" \
-H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
-H "Authorization: Bearer $HEROKU_KEY"

echo ""
echo ""
echo "                        ##         ."
echo "                  ## ## ##        =="
echo "               ## ## ## ## ##    ==="
echo "           /\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\"\___/ ==="
echo "      ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~"
echo "           \______ o           __/"
echo "             \    \         __/"
echo "              \____\_______/"
echo ""
echo ""
echo "       ~~~ Moby Dock is a happy whale ~~~"
echo ""
echo "                DEPLOY SUCCESS"