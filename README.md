# IoTNetwork

## getting started

  - Make sure you have the following softwares with the prescribed versions
    - docker v20.10.7 [ make sure docker has root privileges]
    - docker-compose v1.29.2
  - Make all the scripts (.sh) in the bin and network sub-folder executable, using the chmod command
  - In the root directory, install all the node dependecies using the command 
     ```
        npm install     
     ```

## Setting up the network

 - From the root folder, go to the network folder and run
    ```
    ./start.sh
    ```
 - This will bootup the network
 - The sample client codes are available in the sampleApp file in the root folder
 - You can refer the codes in the sampleApp.js file to create your own client
 - Once you finish working with the network, use the command 
   ```
   ./teardown.sh
   ```
 - This will bring down the network and clear all the persisted data