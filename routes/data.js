var express = require('express');
var router = express.Router();
var strava = require('strava-v3');
var polyline = require('polyline');
	
router.get('/', function(req, res, next) {
	var uid = req.query.query;
	console.log('iidddddddddddd', uid);

	strava.athlete.get({},function(err,athlete) {
		var data = [];
		if(!err) {
			data.push({athlete: athlete})
			console.log(data)
			strava.athlete.listActivities({},function(err,activity) {
				if(!err) {
					//console.log(JSON.stringify(activity[0].map.summary_polyline));
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
					
					data.push({activity: activity});
					strava.athletes.stats({}, function(err, stats){
						//console.log('ddddddddddddddddddddddddddddd', activity[0].map.summary_polyline);
						
						if(!err){
							data.push({stats: stats});
							strava.segments.get({}, function(err, segments){
								if(!err){
									//console.log(segments);
									data.push({segments: segments});
									res.json(JSON.stringify(data));
								}
								else {
									console.log(err)
								}
							})
						}
						else {
							console.log(err);
						}
					})
				}
				else {
					console.log(err);
				}
			})
		}
		else {
			console.log(err);
		}
	});

});

module.exports = router;
