const mongoose = require('mongoose')
const url=require('./config/index.js')
const http = require('http')
const url2 = require('url')

const querystring  = require('querystring')

mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const model=require('./models/people.js')

let People = mongoose.model('people', model)


const Server =http.createServer(async(req, res)=>{
    res.writeHead(200, {'Content-Type':'text/html'})
    res.write(` <a href="/">Page1</a>
   <a href="/?page=2">Page2</a>
   <a href="/?page=3">Page3</a>
   <a href="/?page=4">Page4</a>
  </nav>`)
    let urlInfo = url2.parse(req.url)
    let q = querystring.parse(urlInfo.query)
   
    if(urlInfo.path=='/'){
        let result = await People.find({}).limit(1).select('-_id name ').lean()
        res.end( `<p> ${result[0].name}</p>`)         
     
    } else if(q.page==2){
        let result = await People.find({}).limit(1).skip(1).select('-_id name ').lean()
       res.end( `<p> ${result[0].name}</p>`)         
        
    }else if(q.page==3){
        let result = await People.find({}).limit(1).skip(2).select('-_id name ').lean()
        res.end( `<p> ${result[0].name}</p>`)         
    } else if(q.page==4){
        let result = await People.find({}).limit(1).skip(3).select('-_id name ').lean()
        res.end( `<p> ${result[0].name}</p>`)         
    }
   

        res.end()
        

}).listen(8002)



 