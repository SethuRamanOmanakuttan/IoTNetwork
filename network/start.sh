#!/bin/bash
export MSYS_NO_PATHCONV=1
echo "Initiating network bootup"
./network.sh up
echo "network is live"
echo "initiating channel creation"
./network.sh createChannel
echo "Channel is created in the network"
echo "Initiating chaincode deployment"
./network.sh deployCC
echo "Chaincode is deployed in the network"
echo "Network bootup complete"
docker ps