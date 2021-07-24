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
   res.write(` <table style="border:1px solid black;">`)
   res.write(` <tr>`)

    let result = await User.find().select('-_id name ').catch(e=>{throw e})
     for (let key of result){
         //console.log(key.name)
        res.write(`<td> ${key.name} </td>`)
     }
               res.write(` </tr>`)
               res.end(` </table> `)
      

        
        

}).listen(8002)