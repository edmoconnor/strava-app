var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!req.user){
      res.redirect("/login");
    }else{
      console.log('index', req.user);
      res.render('index', { user: req.user, token: token });
    }
});

module.exports = router;
