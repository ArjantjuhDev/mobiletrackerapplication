#!/bin/zsh
ADB_PATHS=(
  "/mnt/c/Users/arjan/AppData/Local/Android/Sdk/platform-tools/adb"
  "$HOME/Android/Sdk/platform-tools/adb"
  "/usr/local/android-sdk/platform-tools/adb"
)

ADB_FOUND=""
for path in "${ADB_PATHS[@]}"; do
  if [ -f "$path" ]; then
    ADB_FOUND="$path"
    break
  fi
done

if [ -n "$ADB_FOUND" ]; then
  PLATFORM_TOOLS_DIR=$(dirname "$ADB_FOUND")
  echo "adb gevonden op $ADB_FOUND"
  export PATH=$PATH:"$PLATFORM_TOOLS_DIR"
  echo "export PATH=\$PATH:$PLATFORM_TOOLS_DIR" >> ~/.zshrc
  echo "PATH is bijgewerkt. Test met: adb --version"
else
  echo "adb NIET gevonden in de standaard locaties."
  echo "Installeer of herstel Android SDK Platform-tools via Android Studio."
  echo "Controleer of je SDK pad klopt en pas het script eventueel aan."
fi
