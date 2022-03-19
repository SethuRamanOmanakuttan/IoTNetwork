const {clientApp} = require('./client')

let clientObj = new clientApp("./config.json")
let AdminIdLabel = "Admin@Org1" //Adminid
let UserIdLabel = "User@Org1" //userID


function addId(){ //function to add user and admin id to the wallet
    let cert = "network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem"
    let key = "network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/priv_sk"
    clientObj.addIdToWallet(cert,key,AdminIdLabel)
    cert = "network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/User1@org1.example.com-cert.pem"
    key = "network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/priv_sk"
    clientObj.addIdToWallet(cert,key,UserIdLabel)
}

async function submitTxn(){
    await clientObj.init(UserIdLabel) //only admin label can perform register and delete functions
    let response = null

    let txnName = "registerDevice"
    let args = ["3344","18-03-2022_16:00"]
    response = await clientObj.submitTransaction(txnName,args)

    // txnName = "addData"
    // args = ["3344","19-03-2022_19:00","100"]
    // response = await clientObj.submitTransaction(txnName,args)
    // console.log(`response is ${response}`)


    // txnName = "readData"
    // args = ["3344"]
    // response = await clientObj.submitTransaction(txnName,args)
    // console.log(`response is ${response}`)


    // txnName = "deleteIoTData"
    // args = ["3344"]
    // response = await clientObj.submitTransaction(txnName,args)
    

    if(response == ""){
        response = "Transaction submitted successfully!"
    }else if(response == undefined){
        response = "Transaction failed!"

    }
    console.log(response)
}

//Comment/Uncomment the functions according to the usage and run the file
addId() //only run this once
// submitTxn()
