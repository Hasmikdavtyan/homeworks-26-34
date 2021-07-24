const http=require('http')
const formidable = require('formidable');
const fs = require('fs');
const mongoose = require('mongoose')
const {mongodb}=require('./config')
const url=require('./config/index.js')



mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let {User}=require('./models/models.js');

async function createDoc(name,email){
    return new User({
        name: name,
        email:email
    }).save()
     
}

async function checkName(name){
    return await  User.findOne({name},(err,result)=>{
        if (err) throw err
    })
}

http.createServer((req, res)=>{
  if(req.url =='/submit'){
    let form= new formidable.IncomingForm()
    form.parse(req, (err,fields)=>{
        async function saveResults (){
        let checkedName =await checkName(fields.name)
        if(!checkedName){
            createDoc(fields.name,fields.email)
            res.end('ok')
    }else{
        res.end('you can choose the same name only once')
    }
    }
    saveResults()
    })
  

  }else{

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<form action="/submit" method="post" enctype="multipart/form-data">
    name:<input type="text" name="name">
   email: <input type="email" name="email">
    <input type="submit">
    </form>`)

    res.end();
  
  }

 
}).listen(8000)
