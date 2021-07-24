const http=require('http')
const formidable = require('formidable');
const fs = require('fs');
const mongoose = require('mongoose')
const {mongodb}=require('./config')
const url=require('./config/index.js')



mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let {Blog,User}=require('./models/models.js');

async function createDoc(title,body, user){
    return new Blog({
        title: title,
        body:body,
        user:user
    }).save()
     
}


http.createServer(async(req, res)=>{
  if(req.url =='/submit'){
    let form= new formidable.IncomingForm()
    form.parse(req, (err,fields)=>{
        console.log(fields)
        createDoc(fields.name, fields.body, fields.user)
        res.end()
       })
  

  }else{
     
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<form action="/submit" method="post" enctype="multipart/form-data">
    Title:<input type="text" name="name"> <br>
          <textarea name="body" id="" cols="30" rows="10"></textarea> <br>`)

    res.write(`User:  <select name="user" id=""> `)
    let result = await User.find().select('_id name ').catch(e=>{throw e})
    for (let key of result){
        
       res.write(`<option value="${key._id} " > ${key.name} </option>`)
    }   
    res.write(` </select>`)
    res.write (`<input type="submit">`)
    res.write(`</form>`) 

    res.end();
  
    
       
       
   
  }

 
}).listen(8000)
