const mongoose = require('mongoose')


const People = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true,
        lowercase:true

    }, 
    email:{
        type:String,
        required:[true,'email is required'],
        trim:true,
        
    },
    tel:{
        type:Number,
        required:[true,'phonenumber is required'],
        trim:true
    },
})



module.exports = People