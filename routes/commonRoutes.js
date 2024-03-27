const express = require('express')
const router = express.Router()
const {postSignup, verify,verifyOtp,loginData,forgetPass,addToCart}=require("../controllers/commonController")

router.post("/signuppost",postSignup)


router.post("/send-otp",verify)
router.post("/login-post",loginData)

router.post("/verifyOTp",verifyOtp)
router.patch("/resetpass",forgetPass)




// router.post("/login-post",loginData)

module.exports = router