#!/bin/bash
ORG=3
P0PORT=11051
CAPORT=11054
PEERPEM=./organizations/peerOrganizations/org3.example.com/tlsca/tlsca.org3.example.com-cert.pem
CAPEM=./organizations/peerOrganizations/org3.example.com/ca/ca.org3.example.com-cert.pem

echo "$($ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./organizations/peerOrganizations/org3.example.com/connection-org3.json
echo "$($ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./organizations/peerOrganizations/org3.example.com/connection-org3.yaml
