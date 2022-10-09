require('./db/connect')  // require & connect with database
const express = require('express')
const multer = require('multer')
const app = express()
const path = require('path')
const port = process.env.PORT || '8000'

// middleware - parse req.body
app.use(express.json())

app.use('/user',require('./routes/user'))

app.get('/',(req, res)=>{
    res.send('Hello')
})



app.listen(port, ()=>{
    console.log("port listen");
})