#!/usr/bin/env bash

echo "rollup"

yarn rollup -c

echo "sed"

sed -e '4r dist/bundle.js' src/template.svg > dist/PI-score.svg
