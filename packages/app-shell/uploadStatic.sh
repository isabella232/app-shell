#!/bin/bash
apk add curl
UPLOADER="https://github.com/bufferapp/buffer-static-upload/releases/download/0.3.0/buffer-static-upload-`uname -s`"
curl -L $UPLOADER > ./buffer-static-upload
chmod +x ./buffer-static-upload

cd build
FILES="*.js"
../buffer-static-upload -files "$FILES" -dir appshell -skip-versioning

