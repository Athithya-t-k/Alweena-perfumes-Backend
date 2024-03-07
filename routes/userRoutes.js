const express = require('express')
const router = express.Router()
const {postSignup, verify,verifyOtp,loginData,forgetPass}=require("../controllers/userController")

router.post("/signuppost",postSignup)


router.post("/send-otp",verify)
router.post("/login-post",loginData)

router.post("/verifyOTp",verifyOtp)
router.patch("/resetpass",forgetPass)




// router.post("/login-post",loginData)





module.exports = router