var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('oil_stat',{title:'油耗统计'})
})

router.get('/getoil',function(req,res,next){
    // console.log(req)
    // console.log(req.con)
    var db = req.con;
    let dd = req.query;
    var db = req.con;
    var data = "";

    var user = "";
    var user = req.query.user;

    var filter = "";
    if (user) {
        filter = 'WHERE userid = ?';
    }
    db.query('SELECT * FROM account ' + filter, user, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use index.ejs
        // res.render('index', { title: 'Account Information', data: data, user: user });
        res.json({ title: 'Account Information', data: data, user: user })
    });
    // res.json({dfdf:33,reqss:dd})
})
// router.get("/",function(req,res,next){
//     console.log(req,res,next)
// })
// router.get("")
module.exports = router;