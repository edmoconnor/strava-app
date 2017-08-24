require('dotenv').config()
var express = require('express');
var util = require('util');
var path = require('path');
var index = require('./routes/index');
var data = require('./routes/data');
var login = require('./routes/login');
var logout = require('./routes/logout');
var passport = require('passport');
var StravaStrategy = require('passport-strava').Strategy;

var server = express();

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var token;

passport.use(new StravaStrategy({
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/strava/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    token = accessToken;
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

server.set('views', path.join(__dirname, 'views'));
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'ejs');
server.use('/auth/strava',express.static(path.join(__dirname, 'public')));
server.use(express.static(path.join(__dirname, 'public')));

server.use(passport.initialize());
server.use(passport.session());

server.use('/', index);
server.use('/login', login);
server.use('/logout', logout);
server.use('/data', data);

server.get('/auth/strava',
  passport.authenticate('strava', { scope: ['public'] }),
  function(req, res){
    // The request will be redirected to Strava for authentication, so this
    // function will not be called.
  });

server.get('/auth/strava/callback', 
  passport.authenticate('strava', { failureRedirect: '/login' }),
  function(req, res) {
    res.render('index', {user: req.user, token: token});
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
};

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = server;
