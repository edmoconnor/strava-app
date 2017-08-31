var express = require('express');
var router = express.Router();
var strava = require('strava-v3');
var polyline = require('polyline');
	
router.get('/', function(req, res, next) {
	var token = req.query.token;
	var id = req.query.id;
	
	var tokenString= [];
	for (var key in token) {
		tokenString.push(token[key])
	}
	
	var stravaToken = tokenString.join("");
	var stravaId = parseInt(id);

    strava.athlete.listActivities({'access_token':stravaToken},function(err,activity) {  
        if(!err) {
            for(var i = 0; i < activity.length; i++){
                var line = polyline.decode(JSON.stringify(activity[i].map.summary_polyline))
                activity[i].map.summary_polyline = {path: line, strokeColor: '#808080'};
            }
            res.json(JSON.stringify(activity));
        }else{
            console.log("error");
        }
    });

});

module.exports = router;

