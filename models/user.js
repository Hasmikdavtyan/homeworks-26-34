const mongoose = require('mongoose')

const articleSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true

    }, 
    email:{
        type:String,
        required:[true,'email is required'],
        trim:true,
        
    },
    number:{
        type:Number,
        required:[true,'phonenumber is required'],
        trim:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    }
    
})

module.exports = articleSchema