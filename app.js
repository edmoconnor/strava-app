var express = require('express');
var util = require('util');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var data = require('./routes/data');
var activity = require('./routes/data');
var stats = require('./routes/stats');
var login = require('./routes/login');
var polyDecode = require('./routes/polyDecode');
var passport = require('passport');
var StravaStrategy = require('passport-strava').Strategy;

var STRAVA_CLIENT_ID = "8483";
var STRAVA_CLIENT_SECRET = "2ef9bc848bbc85107300550421cc452708c0c975";
var app = express();
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
}); 

passport.use(new StravaStrategy({
    clientID: STRAVA_CLIENT_ID,
    clientSecret: STRAVA_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/strava/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Strava profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Strava account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));





// configure Express
////app.configure(function() {
 app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
 //app.use(express.static(__dirname + '/public'));
//app.use('/static', express.static(path.join(__dirname, '../public')));
  //app.use(express.logger());
  //app.use(express.cookieParser());
  //app.use(express.bodyParser());
  //app.use(express.methodOverride());
  //app.use(express.session({ secret: 'keyboard cat' }));

  //app.use(app.router);
 
//});
app.use('/auth/strava',express.static(path.join(__dirname, 'public')));
//app.use('/auth/strava',express.static(path.join(__dirname, 'public')));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//app.use('/', index);
app.use('/data', data);
//app.use('/login', login);
app.use('/activity', activity);
app.use('/stats', stats);
app.use('/polyDecode', polyDecode);


app.get('/', function(req, res){
  console.log('index', req.user);
  res.render('index', { user: req.user });
});

app.get('/login', function(req, res){
  console.log('login', req.user);
  res.render('login', { user: req.user });
});


app.get('/account', ensureAuthenticated, function(req, res){
  console.log('account', req);
  res.render('account', { user: req.user });
});
app.get('/auth/strava',
  passport.authenticate('strava', { scope: ['public'] }),

  function(req, res){
    // The request will be redirected to Strava for authentication, so this
    // function will not be called.
  });

// GET /auth/strava/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/strava/callback', 
  passport.authenticate('strava', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('2222222222222222222222222222', req)
     res.render('index', {user: req.user});
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  //console.log(req)
  res.redirect('/login')
}
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
