var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var apiArticle = require('./routes/apiArticle')

var cors = require('cors');
app.use(cors());
mongoose.connection.openUri(`mongodb://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@cluster0-shard-00-00-xrrgq.mongodb.net:27017,cluster0-shard-00-01-xrrgq.mongodb.net:27017,cluster0-shard-00-02-xrrgq.mongodb.net:27017/Good-Reads?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`, (err) => {
 err ? console.log(err) : console.log('Database Connected to good-reads');
})
mongoose.Promise = global.Promise;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/api/users', users);
app.use('/api', apiArticle)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
