const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")


const port = 4004
const mongoose = require('./Config/config')
const dotenv = require("dotenv")
dotenv.config()
mongoose()


app.use (cors())
app.use (bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const commonRouter=require('./routes/commonRoutes')
const userRoute=require('./routes/userRoutes')

app.use('/',commonRouter)
app.use('/user',userRoute)


app.listen(port,() => console.log('server started on the port ', port))