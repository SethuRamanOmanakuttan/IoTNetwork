//How to use the client module to set up a block event listener


const {clientApp} = require('../client')

let AdminIdLabel = "Admin@Org1" //Adminid


let clientObj = new clientApp("./config.json")

async function runEventListner(){
    await clientObj.init(AdminIdLabel)
    await clientObj.blockEventListener()
}

runEventListner()