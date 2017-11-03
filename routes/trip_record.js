var express = require('express');
var router = express.Router();

var plate = require('../config')
router.get('/',function(req,res,next){
    res.render('trip_record',{title:'行程记录'})
})

router.get('/get_trip', function (req, res, next) {
    var db = req.con;
    var query = req.query.data;
    let url = '';
    for (var o in query) {
        if (o == 'TripStartTime') {
            url += o + ">'" + query[o] + "' and "
        } else if (o == 'TripEndTime') {
            url += o + "<'" + query[o] + "' and "
        } else {
            url += o + " = '" + query[o] + "' and "
        }
    }
    url = url.slice(0, -4)
    var sql = 'SELECT * FROM trip_info WHERE ' + url;
    var data = "";
    // var df = Object.assign({},db)
    console.log(sql);
    let pagenum = req.query.page;
    let pageSize = 10;
    sql2 = sql + "limit " + pagenum * pageSize + ' ,' + pageSize;
    db.query(sql, function (err, rows) {
        var total = rows.length;
        var totalPage = parseInt(rows.length / pageSize);
        if (total > pageSize) {
            if (total % pageSize > 0) {
                totalPage += 1
            }
        }
        var data = rows;
        if (total > pageSize) {
            db.query(sql2, function (err, rowss) {
                if (err) throw err;
                var dd = {
                    total: total,
                    pageSize: pageSize,
                    totalPage: totalPage,
                    data: rowss,
                    allDate: data,
                    plate:plate
                }
                res.json(dd)
            })
        } else {
            var dd = {
                total: total,
                pageSize: pageSize,
                totalPage: totalPage,
                data: data,
                allDate: data,
                plate:plate
            }
            // console.log(dd)
            res.json(dd)
        }
    });
})
module.exports = router;