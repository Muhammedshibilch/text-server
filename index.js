require('dotenv').config()
require('./config/connection')
const express = require('express')
const cors = require('cors')
const router = require('./router/router')


const textServer = express()
textServer.use(cors())
textServer.use(express.json())
textServer.use(router)




const PORT = 3000

textServer.listen(PORT,()=>{
    console.log(`textServer started at the port ${PORT} and waiting for client request`);
})

textServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:blue">text server started and waiting for client request</h1>`)
})

textServer.post('/',(req,res)=>{
    res.status(200).send(`Post Request`)
})