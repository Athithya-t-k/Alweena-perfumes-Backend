const mongoose= require('mongoose');
const schema = new mongoose.Schema({
    UserName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber:{
        type:Number,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        required: true
    }
    

})

const userModel=  mongoose.model("Userdata",schema);
module.exports = userModel