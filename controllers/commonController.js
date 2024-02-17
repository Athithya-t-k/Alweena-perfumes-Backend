const userModel = require('../models/userSchema')
const twilio = require('../otpverification/twilio')

const object = {
    postSignup: async (req, res) => {
        const { UserName, email, phoneNumber, password } = req.body;
        console.log(req.body);
        const existingUser = await userModel.findOne({ email: email })

        if (existingUser) {
            res.status(400).json({ error: "User already exist.please login" })
        } else {

            const user = new userModel({
                UserName: UserName,
                email: email,
                phoneNumber: phoneNumber,
                password: password
            })
            await user.save()

            twilio(phoneNumber).then(() => {
                res.status(200).json({ otpsend: true, message: "data saved successfully" })
            }).catch(() => {
                res.status(200).json({ otpsend: false, message: "data saved successfully" })
            })

        }
    }
}
module.exports = object