const mongoose= require('mongoose')
const schema =  mongoose.Schema({
    UserName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    
    password: {
        type: String,
        required: true
    },
    // PhoneVerified:{
    //     type:Boolean,
    //     required: true,
    //     default: false
    // }

})

const userModel=  mongoose.model("Userdata",schema);
module.exports = userModel