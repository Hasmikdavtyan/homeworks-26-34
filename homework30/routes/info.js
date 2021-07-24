var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   data={
		name:'Gevorg', 
		email:'gevorgabgaryan001@gmail.com',
		languages:['c++','javascript', 'php']
	}
   res.render('components/info.ejs',{data: data})
});

module.exports = router;
