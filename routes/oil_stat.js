var express = require('express');
var router = express.Router();
var plate = require('../config');
router.get('/', function (req, res, next) {
    res.render('oil_stat', { title: '油耗统计' })
})


router.get('/getoil', function (req, res, next) {
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
    db.query(sql, function (err, rows) {
        var data = rows;
        var dd = {
            data: data,
            allDate: data,
            plate:plate
        }
        res.json(dd)
    });
})


// function getBeforeDate(n,now) {
//     var n = n;
//     var d = new Date();
//     var year = d.getFullYear();
//     var mon = d.getMonth() + 1;
//     var day = d.getDate();
//     if (day <= n) {
//         if (mon > 1) {
//             mon = mon - 1;
//         }
//         else {
//             year = year - 1;
//             mon = 12;
//         }
//     }
//     d.setDate(d.getDate() - n);
//     year = d.getFullYear();
//     mon = d.getMonth() + 1;
//     day = d.getDate();
//     s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
//     return s;
// }
module.exports = router;