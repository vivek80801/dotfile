#!/bin/bash

CURRENT_PATH=$(pwd)

if [[ ${1} == "" ]]
then
    read -p "Enter relative path to background image file path: " BACKGROUND_FILE
    awesome-client "local gears = require(\"gears\") gears.wallpaper.maximized(\"${CURRENT_PATH}/${BACKGROUND_FILE}\", s, true)"
else
    awesome-client "local gears = require(\"gears\") gears.wallpaper.maximized(\"${CURRENT_PATH}/${1}\", s, true)"
fi

notify-send "Background Change"
