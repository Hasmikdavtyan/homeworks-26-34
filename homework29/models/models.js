const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
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
        
    }
   })

   const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'titel is required'],
      

    }, 

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        
    },
    body:{
        type: String,
        required:[true,'body is required'],
        
    }
   })

const User = mongoose.model('user', userSchema)
const Blog = mongoose.model('blog', blogSchema)



module.exports = {
    User, Blog 
}