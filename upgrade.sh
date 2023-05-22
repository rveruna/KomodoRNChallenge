#!/usr/bin/env bash

LATEST_VERSION=`npm show react-native version`

while getopts v: flag
do
    case "${flag}" in
        v) version=${OPTARG};;
    esac
done

[[ ! -z "$version" ]] && TARGET_VERSION=$version  || TARGET_VERSION=$LATEST_VERSION


CURRENT_VERSION=`node -pe "require('./package.json').dependencies['react-native']"`

printf "\n\nCalculating upgrade for $CURRENT_VERSION to $TARGET_VERSION..."

printf "\n\nChecking dependancies...\n\n"
npx @rnx-kit/dep-check --set-version $TARGET_VERSION .


printf "\n\nPerforming React Native Upgrade...\n\n"
if [ "$TARGET_VERSION" = "$CURRENT_VERSION" ]; then
    printf "No React Native upgrade required\n\n";
    exit 0;
fi

sleep 2
npx react-native upgrade $TARGET_VERSION
sleep 2
open "https://react-native-community.github.io/upgrade-helper/?from=$CURRENT_VERSION&to=$TARGET_VERSION"