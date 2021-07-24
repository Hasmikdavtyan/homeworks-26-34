var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('components/contact');
});

router.post('/', urlencodedParser, function(req, res, next) {
     data = req.body
     res.render('components/contact-success', {data:data});
  });

module.exports = router;
