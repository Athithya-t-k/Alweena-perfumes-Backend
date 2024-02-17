const express = require('express')
const Router = express.Router()
const {postSignup}=require("../controllers/commonController")

Router.post("/signuppost",postSignup)



module.exports = Router