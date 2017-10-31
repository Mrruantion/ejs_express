var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('trip_stat',{title:'行程统计'})
})

module.exports = router;