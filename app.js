var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

mongoose.set('debug', true);
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// connect to db
const env_upper = process.env.NODE_ENV.toUpperCase();
const dbAdmin = process.env["DB_ADMIN_"+env_upper]
const dbPassword = process.env["DB_PASSWORD_"+env_upper]
const dbHost = process.env["DB_HOST_"+env_upper]
const dbName = process.env["DB_NAME_"+env_upper]
const dbPort = process.env["DB_PORT_"+env_upper]

const dbURL = `mongodb://${dbAdmin}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

require(path.join(__dirname, "rest_api/models/db_connect"))(dbURL);

// rest api routes
const authRoutes = require(path.join(__dirname, "rest_api/routes/auth"));
const dataRoutes = require(path.join(__dirname, "rest_api/routes/catalog"));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", 'build')));


app.use('/auth', authRoutes)
app.use('/data', dataRoutes);

app.get("*", function(req, res, next) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
