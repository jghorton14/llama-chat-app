#!/bin/bash

npm run build

DIRECTORY=/Users/$USER/Documents/Coding.nosync/llama.cpp/templates/

rm -rf $DIRECTORY

mkdir -p $DIRECTORY
cp -R build/* $DIRECTORY
