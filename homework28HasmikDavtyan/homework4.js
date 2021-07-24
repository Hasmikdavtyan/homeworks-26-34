const mongoose = require('mongoose')
const url = require('./config/index')
const model = require('./models/homework2')
const http = require('http')
const formidable = require('formidable')



mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
let db = mongoose.connection

db.on('error', console.error.bind(console,'MongoDb conection error'))
db.on('conected', ()=>{
    console.log('conected')
})
let User = mongoose.model('users', model)





const server = http.createServer(async (req,res)=>{
    res.writeHead(200, {'Content-Type':'text/html'})
   
    
        if(req.url=='/submit'){
           let form = new formidable.IncomingForm()
           form.parse(req, async (err, fields)=>{
               if(err) throw err
            let result = await User.findOne({'name': fields.name}).select('-_id mobile ').lean().catch(e=>{throw e})
            for (let key in result){
                res.write(` <h3>  ${fields.name} :  ${  result[key]}  </h3>`)} 
                res.end() 
              
           })
      

           
        } else{
            res.write(` <form action="/submit" method ='POST'> <select name="name" id="">       `)
            let result = await User.find().select('-_id name ').catch(e=>{throw e})
            for (let key of result){
                //console.log(key.name)
               res.write(`<option> ${key.name} </option>`)
            }   
                res.write(` <input type="submit"> </select>`) 
                res.write(`</form>` )  
                res.end()  
}
    
}).listen(8001)
