const {clientApp} = require('../client')

let clientObj = new clientApp("./config.json")
let AdminIdLabel = "Admin@Org1" //Adminid
let UserIdLabel = "User@Org1" //userID


async function submitTxn(){
    await clientObj.init(AdminIdLabel) //only admin label can perform register and delete functions

    let txnName = "registerDevice"
    let args = ["334556874","18-03-2022_16:00"]

    // txnName = "addData"
    // args = ["3344","19-03-2022_19:00","100"]

    // txnName = "readData"
    // args = ["3344"]

    // txnName = "deleteIoTData"
    // args = ["3344"]
    
    response = await clientObj.submitTransaction(txnName,args)

    if(response == ""){
        response = "Transaction submitted successfully!"
    }else if(response == undefined){
        response = "Transaction failed!"

    }
    console.log(response)
}

submitTxn()
