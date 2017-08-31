var express = require('express');
var router = express.Router();
var strava = require('strava-v3');
	
router.get('/', function(req, res, next) {
	var token = req.query.token;
	var id = req.query.id;
	
	var tokenString= [];
	for (var key in token) {
		tokenString.push(token[key])
	}
	
	var stravaToken = tokenString.join("");
	var stravaId = parseInt(id);
	var data = [];

    strava.athletes.stats({'access_token':stravaToken, id:stravaId}, function(err, stats){
        if(!err){
            res.json(JSON.stringify(stats))
        }else{
            console.log("error");
        }
    });


});

module.exports = router;
