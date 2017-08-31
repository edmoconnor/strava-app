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
    
    strava.athlete.get({'access_token':stravaToken},function(err,athlete) {	
        if(!err) {
            res.json(JSON.stringify(athlete));
        }else{
            console.log("error");
        }
        
    });

});

module.exports = router;
