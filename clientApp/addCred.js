
//How to use the client module to add identity to wallet

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

addId()