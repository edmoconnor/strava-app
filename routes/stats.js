var express = require('express');
var router = express.Router();
var strava = require('strava-v3');

router.get('/', function(req, res, next) {

	

					strava.athletes.stats({id:'3868525'}, function(err, stats){
						var data = [];
						if(!err){
							data.push({stats: stats});
							res.json(JSON.stringify(data));
							/*
							strava.segments.get({id: 1234}, function(err, segments){
								if(!err){
									//console.log(segments);
									data.push({segments: segments});
									res.json(JSON.stringify(data));
								}
								else {
									console.log(err)
								}
							})
							*/
						}
						else {
							console.log(err);
						}
					});
});

module.exports = router;
