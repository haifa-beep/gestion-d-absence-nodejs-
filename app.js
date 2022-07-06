var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// connection to the database
var mongoose = require('mongoose');
var config = require('./db/db.json');
mongoose.connect(config.mongo.uri,
  () => { console.log('Connected th DB') }
);
// connection to the database ended

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var AbsenceRouter = require('./routes/absence');
var JusitfRouter = require('./routes/justif');
var userRouter = require('./routes/user');
var roleRouter = require('./routes/role');
var classRouter = require('./routes/classe');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static("uploads"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/absence', AbsenceRouter);
app.use('/justif', JusitfRouter);
app.use('/user', userRouter);
app.use('/role', roleRouter);
app.use('/classe', classRouter);

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

app.use(cors());

module.exports = app;
