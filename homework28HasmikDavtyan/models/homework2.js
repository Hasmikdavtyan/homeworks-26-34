const mongoose = require('mongoose')


const homework2Schema = new mongoose.Schema({
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
    mobile:{
        type:Number,
        required:[true,'phonenumber is required'],
        trim:true
    },
})



module.exports = homework2Schema