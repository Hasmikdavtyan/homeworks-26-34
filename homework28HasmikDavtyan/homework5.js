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
        
           let result = await User.findOne({'name':  new RegExp( fields.search) }).select('username -email -password -__v ').lean().catch(e=>{throw e})
            if(result){
           for (let key in result){
                res.write(` <h3>  ${ key} :  ${  result[key]}  </h3>`)} 
                res.end() 
           }else {
            res.write(` <h3>   no result  </h3>`)
            res.end()
           }
           })

        


           
        } else{
            res.write(` <form action="/submit" method ='POST'>  <input name='search' type="search">   <input type="submit">   </form>`)
            res.end()  
}
    
}).listen(8001)
