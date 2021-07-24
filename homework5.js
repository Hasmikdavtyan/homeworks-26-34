const mongoose = require('mongoose')
const url = require('./config/index')
const model = require('./models/user')
const http = require('http')
const formidable = require('formidable')

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection
db.on('error', console.error.bind(console,'MongoDb conection error'))
db.on('conected', ()=>{
   console.log( 'DB is conected')
})

let People = mongoose.model('user', model)


const server = http.createServer((req, res)=>{

    if(req.url =='/submit'){
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields)=>{
        if (err) throw err
        let p = new People({
            name:fields.name,
            email:fields.email,
            number: fields.number,
            message: fields.message
        })
        
        p.save((err)=>{
            if(err) throw err
            console.log('info is added')
        })
    })
    res.end('your info is sended')

    }else{
     res.writeHead(200, {'Content-Type':'text/html'})
        res.write(`  <form action="/submit" method="post">
        <label for=""> name: </label>
    <input  name='name' type="text"> <br>
    <label for=""> email:  </label>
    <input  name='email' type="email"> <br>
    <label for=""> phonenumber: </label>
    <input  name='number' type="number"> <br> 
    <label for=""> message: </label>
    <input name='message' type="text"> <br> <br>
    <input type="submit">
    </form>`)
    res.end()
    }
    
   
}).listen(8001)

