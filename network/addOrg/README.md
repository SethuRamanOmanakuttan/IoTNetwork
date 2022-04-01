## Adding Org2 to the test network

You can use the `addOrg.sh` script to add another organization to the Fabric test network. The `addOrg.sh` script generates the Org2 crypto material, creates an Org2 organization definition, and adds Org2 to a channel on the test network.

You first need to run `./network.sh up createChannel` in the `test-network` directory before you can run the `addOrg.sh` script.

```
./network.sh up createChannel
cd addOrg2
./addOrg.sh up
```

If you used `network.sh` to create a channel other than the default `mychannel`, you need pass that name to the `addOrg.sh` script.
```
./network.sh up createChannel -c channel1
cd addOrg2
./addOrg.sh up -c channel1
```

You can also re-run the `addOrg.sh` script to add Org2 to additional channels.
```
cd ..
./network.sh createChannel -c channel2
cd addOrg2
./addOrg.sh up -c channel2
```

For more information, use `./addOrg.sh -h` to see the `addOrg.sh` help text.
