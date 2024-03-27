const {default: mongoose} = require('mongoose');

function config(){
    mongoose.connect (process.env.MONGO_URL).then(()=>{
        console.log("Database connected");
    }).catch((err)=>{
        console.log(" database not connected",err);
    })

}

module.exports = config;