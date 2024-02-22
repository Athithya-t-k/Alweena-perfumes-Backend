const userModel = require('../models/userSchema')
const twilio = require('../otpverification/twilio')
const bcrypt = require ('bcrypt')



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
        
        console.log(req.body);
        // Your OTP verification logic goes here

        twilio(phoneNumber).then(() => {
            res.status(200).json({ otpsend: true, message: "data saved successfully" })
        }).catch(() => {
            res.status(400).json({ otpsend: false, error: "OTP send failed.please enter a valid number" })
        })
    },


   
 verifyOtp: async (req,res)=>{
        const otpcheck = req.body.otpNumber;
        console.log();
    },
    loginData: async (req, res) => {
        const { username, password } = req.body;
       
    }
    
}




    






module.exports = 
    object
    

