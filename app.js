const express = require('express')
const app = express()
const port = 4004


app.listen(port,() => console.log('server started on the port ', port))