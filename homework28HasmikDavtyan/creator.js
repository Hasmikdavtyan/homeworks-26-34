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

User.insertMany([
  {name:'Anna', email:'Anna@gmail.com', mobile:'9210053520'},
   {name:'Maria', email:'Maria@gmail.com', mobile:'9810098100'},
   {name:'Lara', email:'Lara@gmail.com', mobile:'9210053520'},
   {name:'Mery', email:'Mery@gmail.com', mobile:'9810098100'},
   {name:'Greta', email:'Greta@gmail.com', mobile:'9210053520'},
   {name:'Sirun', email:'Sirun@gmail.com', mobile:'9810098100'}
], function (err, info){
  if (err) throw err
  console.log('info is added')
})

