var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('trip_record',{title:'行程记录'})
})

module.exports = router;