const userModel = require('../models/userSchema')
const twilio = require('../utilities/twilio')
const bcrypt = require ('bcrypt')
const twilioVerify = require("../utilities/twilioVerify")



const object = {
    postSignup: async (req, res) => {
        
        const { UserName, email, password } = req.body;
        const existingUser = await userModel.findOne({ email: email })
        
        if (existingUser) {
            
            await res.status(400).json({ error: "User already exist.please login" })
            
        } else {

            const hashedPassword =await bcrypt.hash(password, 10); 
            const user = new userModel({
                UserName: UserName,
                email: email,
               
                password: hashedPassword
            })
            await user.save()
            res.status(200).json({message:"user logged"}
            )
      
            
        }
        
    },
    verify: async (req, res) => {
        
        const phoneNumber = req.body.phoneNumber;
        
        // console.log(req.body);
        // Your OTP verification logic goes here

        twilio(phoneNumber).then(() => {
            res.status(200).json({ otpsend: true, message: "data saved successfully" })
        }).catch(() => {
            res.status(400).json({ otpsend: false, error: "OTP send failed.please enter a valid number" })
        })
    },


   
 verifyOtp: async (req,res)=>{
        const {otp,phoneNumber} = req.body;
        if (!Array.isArray(otp)) {
            return res.status(400).json({ error: "Invalid OTP number" });
        }

        const concatedOtp = parseInt(otp.join(""));
        console.log(concatedOtp);


        if (concatedOtp && phoneNumber){
            const verificationChecks = await twilioVerify(phoneNumber,concatedOtp)
            console.log(verificationChecks.status);
            if(verificationChecks.status !=="approved"){
                res.status(401).json({error:"otp is not valid"})

            }else{

                res.status(200).json({message:"otp validation completed"})
            }
        }
    },
    loginData: async(req,res)=>{
        const { UserName,password} =req.body;
        try{
            const existingUser = await userModel.findOne({UserName:UserName});
            if (!existingUser){
                return res.status(404).json({error:"User not found"})
            }

            if (existingUser.password !== password){
                return res.status(401).json({error:"invalid password"})
            }

            res.status(200).json({message:"login successful"})

        }catch(error){
            console.error("Error during login ",error)
            res.status(500).json({error:"internal sever Error"})
        }
    }

}



module.exports = 
    object
    

