const express = require('express')
const router = express.Router()
const {postSignup, verify}=require("../controllers/commonController")

router.post("/signuppost",postSignup)
router.post("/send-otp",verify)



module.exports = router