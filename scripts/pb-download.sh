#!/bin/sh

PB_VERSION=0.34.0

curl -sSL -o ./pb/pb.zip "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_darwin_arm64.zip"
unzip ./pb/pb.zip -d ./pb/zip
mv ./pb/zip/pocketbase ./pb/pocketbase
chmod +x ./pb/pocketbase
rm -rf ./pb/zip ./pb/pb.zip
