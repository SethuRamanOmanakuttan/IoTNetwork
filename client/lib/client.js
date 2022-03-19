const { Wallets , Gateway ,ContractListener} = require('fabric-network')
const fs = require('fs')

// Connect to a gateway peer



class clientApp{
    constructor(configFilePath){
        const configFileData = (fs.readFileSync(configFilePath)).toString();
        this.config = JSON.parse(configFileData);
    }

    async init(identityLabel){
        const connectionProfileJson = (await fs.promises.readFile(this.config.CCP)).toString();
        this.connectionProfile = JSON.parse(connectionProfileJson);
        this.wallet = await Wallets.newFileSystemWallet(this.config.Wallet);
        this.channel = this.config.Channel
        this.chaincodeId = this.config.Chaincode
        this.connectionOptions = {
            identity: identityLabel,
            wallet: this.wallet
        }
    }

    async addIdToWallet(certPath,keyPath,identityLabel){
        const wallet = await Wallets.newFileSystemWallet(this.config.Wallet);

        const cert = fs.readFileSync(certPath).toString();
        const key = fs.readFileSync(keyPath).toString();
    
        const identity = {
            credentials: {
                certificate: cert,
                privateKey: key,
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
    
        await wallet.put(identityLabel, identity);
    }

    async submitTransaction(txnName,args){
        let gateway = new Gateway();

        await gateway.connect(this.connectionProfile, this.connectionOptions);

        try {

            // Obtain the smart contract with which our application wants to interact
            const network = await gateway.getNetwork(this.channel);
            const contract = network.getContract(this.chaincodeId);
    
            // Submit transactions for the smart contract
            const submitResult = await contract.submitTransaction(txnName, ...args);
            return submitResult.toString()
        }catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
        }
        finally {
            // Disconnect from the gateway peer when all work for this client identity is complete
            gateway.disconnect();
        }

    }
    async contractEventListener(eventName){
        let gateway = new Gateway();
        await gateway.connect(this.connectionProfile, this.connectionOptions);
        const network = await gateway.getNetwork(this.channel);
        const contract = network.getContract(this.chaincodeId);
        const listener = async (event) => {
            if (event.eventName === eventName) {
                const details = event.payload.toString('utf8');
                console.log(`Event : ${details}`)
            }
        };
        contract.addContractListener(listener);

    }

    async blockEventListener(){
    
        let gateway = new Gateway();
        await gateway.connect(this.connectionProfile, this.connectionOptions);
        const network = await gateway.getNetwork(this.channel);

        const listener = async (event) => {
            console.log(`Event : ${JSON.stringify(event)}\n\n`)
        }
        const options = {
            startBlock: 1
        };
        await network.addBlockListener(listener, options);
    }
        
    

}


module.exports = {
    clientApp
}
