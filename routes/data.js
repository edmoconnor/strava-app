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

	var data = [];

	var getAthlete = function() {
		var promise = new Promise(function(resolve, reject){
			strava.athlete.get({'access_token':stravaToken},function(err,athlete) {	
				if(!err) {
					data.push({athlete: athlete})
				}
				else {
					console.log(err);
				}
				resolve(data);
				reject(err);
				console.log(data)
			});
		});
		return promise;
	};

	var getActivities = function(data) {
		var promise = new Promise(function(resolve, reject){
			strava.athlete.listActivities({'access_token':stravaToken},function(err,activity) {
				if(!err) {
					for(var i = 0; i < activity.length; i++){
						var line = polyline.decode(JSON.stringify(activity[i].map.summary_polyline));
						var coords = [];
						for(var j = 0; j < line.length; j++){
							//coords.push([latitude: line[j][0], longitude: line[j][1]])
						}
						//var line = {path: polyline.decode(JSON.stringify(activity[i].map.summary_polyline))};
						//console.log(line)
						activity[i].map.summary_polyline = {path: line, strokeColor: '#808080'};
					}
						
					
				}
				else {
					console.log(err);
				}
				data.push({activity: activity});
				resolve(data)
				console.log(data)
			});
		});
		return promise;
	};
	
	var getStats = function(data) {
		var promise = new Promise(function(resolve, reject){
			strava.athletes.stats({'access_token':stravaToken, id:stravaId}, function(err, stats){
				if(!err){
					data.push({stats: stats});
					//resolve(data);
					res.json(JSON.stringify(data));
					console.log(data)
				}
				else {
					console.log(err);
				}
			});
		});
		return promise;
	};

	var getSegments = function(){
		var promise = new Promise(function(resolve, reject){
			strava.segments.get({'access_token':stravaToken}, function(err, segments){
				if(!err){
					console.log(segments);
					data.push({segments: segments});
				}			
			})
		})
	};
	
	getAthlete()
	.then(getActivities)
	.then(getStats);
	//.then(getSegments);

	});

module.exports = router;
