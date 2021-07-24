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
User.updateOne({email: 'hasmik.davtyan.95@gmail.com'}, {email:'davit.davtyan.96@gmail.com'}, (err, res)=>{
    if(err) throw err
    console.log('doc is updated', res)
})