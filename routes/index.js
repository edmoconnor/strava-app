var express = require('express');
var router = express.Router();
var strava = require('strava-v3');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('index', req);
  res.render('index', { user: req.user });
  //res.render('index', { title: 'Express' });
});




module.exports = router;
