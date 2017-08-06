var express = require('express');
var router = express.Router();
var strava = require('strava-v3');

router.get('/', function(req, res, next) {

	

			strava.athlete.listActivities({},function(err,activity) {
				var data = [];
				if(!err) {
					//console.log(activity)
					data.push({activity: activity});
					res.json(JSON.stringify(data));
				}
				else {
					console.log(err);
				}
			})
		}

});

module.exports = router;
