var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('oil_stat',{title:'油耗统计'})
})

module.exports = router;