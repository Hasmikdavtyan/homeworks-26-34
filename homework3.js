const schema = require('./models/user')
const url = require('./config/index')

const mongoose = require('mongoose')


mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
let db = mongoose.connection

db.on('error', console.error.bind(console,'MongoDb conection error'))
db.on('conected', ()=>{
    console.log('conected')
})


let User = mongoose.model('users', schema)

let user1 = new User({
    name:'Hasmik',
    email:'hasmik.davtyan.95@gmail.com',
    number:'077767990',
    message:'hallo my dear'
})

console.log(user1)
user1.save((err)=>{
    if (err) throw err
    console.log('the first userInfo is added')
})

