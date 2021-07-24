const mongoose = require('mongoose')
const url = require('./config/index')
const model = require('./models/homework2')
const http = require('http')


mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
let db = mongoose.connection

db.on('error', console.error.bind(console,'MongoDb conection error'))
db.on('conected', ()=>{
    console.log('conected')
})
let User = mongoose.model('users', model)


const Server =http.createServer(async(req, res)=>{
     res.writeHead(200, {'Content-Type':'text/html'})
    res.write(` <ol>`)
     let result = await User.findOne({}).select('-_id name email mobile').lean()
      for (let key in result){
         res.write(`<li> ${result[key]} </li>`)
      }
        
                res.end(` </ol> `)
       

         
         

}).listen(8002)