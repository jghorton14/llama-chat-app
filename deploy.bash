#!/bin/bash

npm run build

DIRECTORY=/Users/jhorton/Documents/Coding.nosync/llama.cpp/templates/

rm -rf $DIRECTORY

mkdir -p $DIRECTORY
cp -R build/* $DIRECTORY