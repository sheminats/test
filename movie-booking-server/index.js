//loads .env file contents to process.env
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/router')
require('./DB/connection')

//to create express server
const stServer=express()

//use cors in server
stServer.use(cors())

//use json parser
stServer.use(express.json())

//available file / folder from server to other app
stServer.use('/uploadss',express.static('./uploadss'))

//use router
stServer.use(router)


//to host  stServer
const PORT=3000

stServer.listen(PORT,()=>{
    console.log(`"ShowTime Server started at port:${PORT}`);
})


//to resolve get http request to http://localhost:3000/
stServer.get('/',(req,res)=>{
res.send("<h1  style=color:black;>ShowTime Server started....Waiting for client request</h1>")
})

