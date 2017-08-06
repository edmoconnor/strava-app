var express = require('express');
var router = express.Router();
var strava = require('strava-v3');
var polyline = require('@mapbox/polyline');
	
router.get('/polyDecode', function(req, res, next) {
	console.log('ffffffffffffffffffffffff')
	var line = polyline.decode(req);
	console.log('decode')
		return JSON.stringify(line)


});

module.exports = router;
