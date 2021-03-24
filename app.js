var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var bondingRouter = require('./routes/bonding');
var dicSexosRouter = require('./routes/diccionarios/dic_sexos');
var dicEtniasRouter = require('./routes/diccionarios/dic_etnias');
var dicContexturaRouter = require('./routes/diccionarios/dic_contextura');
var dicSitAmorosaRouter = require('./routes/diccionarios/dic_situacion_amorosa');
var rolBondingRouter = require('./routes/rol_bonding');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bonding', bondingRouter);
app.use('/dic_sexos', dicSexosRouter);
app.use('/dic_etnias', dicEtniasRouter);
app.use('/dic_contextura', dicContexturaRouter);
app.use('/rol_bonding', rolBondingRouter);
app.use('/auth', authRouter);
app.use('/dic_sit_amorosa', dicSitAmorosaRouter);

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
