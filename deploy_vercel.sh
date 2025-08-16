#!/bin/zsh
# Expo web build en Vercel deploy script

rm -rf dist
rm -rf web-build
npx expo export:web
mv web-build dist
vercel --prod --yes
