#!/bin/zsh
# Clear all caches and update dependencies for React Native, Expo, and Webpack

echo "Cleaning yarn cache..."
yarn cache clean

echo "Removing node_modules/.cache, .expo, dist..."
rm -rf node_modules/.cache .expo dist

echo "Reinstalling dependencies..."
yarn install

echo "Updating Expo, React Native, React, Webpack..."
yarn add expo@latest react-native@latest react@latest

yarn add --dev webpack@latest webpack-cli@latest

echo "Running expo install --fix and expo-doctor..."
npx expo install --fix
npx expo-doctor

echo "Done. Now run: npx expo build:web"
