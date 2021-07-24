const mongoose = require('mongoose')
const url = require('./config/index')
const model = require('./models/homework2')


mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
let db = mongoose.connection

db.on('error', console.error.bind(console,'MongoDb conection error'))
db.on('conected', ()=>{
    console.log('conected')
})

let User = mongoose.model('users', model)

  User.find({}, (err, data)=>{
   if (err) throw err
  
    console.log(data)
   
   
 })
