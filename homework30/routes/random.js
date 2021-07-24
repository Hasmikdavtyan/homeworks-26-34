let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })
const random = require('random')


/* GET users listing. */
router.get('/', function(req, res, next) {

   res.render('components/random.ejs',)
});

router.post('/', urlencodedParser ,  function(req, res, next) {
    let data = random.int(min = Number( req.body.min), Number(max = req.body.max) )
    res.render ('components/randomInfo.ejs', {data:data})
 });

module.exports = router;
