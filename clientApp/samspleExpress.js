const {clientApp} = require('../client')

let clientObj = new clientApp("./config.json")


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/add', (req, res) => {
    //extract data code
    clientObj.init('User2@Org1')
    clientObj.submitTransaction('addData',[123,3])
    res.send('Hello World!')
    cli
  })

app.get('/read', (req, res) => {
    clientObj.init('User2@Org1')
    clientObj.submitTransaction('readData',[123])
    res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})