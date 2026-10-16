const dns = require('dns');
dns.setServers(['8.8.8.8']);
const dotenv = require('dotenv').config();
const express = require('express');
const ConnectDb = require('./config/db.js')
const app = express();




app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"This is Root"
    })
})

const PORT = process.env.PORT || 3000 
app.listen(PORT,()=>{
    ConnectDb();
    console.log(`Server is running port ${process.env.PORT}`);

})

