#!/bin/bash
echo "Stopping the network"
./network.sh down
echo "Removing persisted files"
rm -rf ./wallet
rm -rf ./channel-artifacts
echo "Removing docker cache and persisted volume"
docker system prune
docker volume prune
echo "teardown is complete"