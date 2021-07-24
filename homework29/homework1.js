const mongoose = require('mongoose')
const url=require('./config/index.js')
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const model=require('./models/people.js')

let People = mongoose.model('people', model)

People.deleteOne({'name':'Sirun'}, (err, result)=>{
    if (err) throw err
    console.log(result)
})