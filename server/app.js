const express = require('express');
const path = require('path');
const favicon = require('serve-favicon'); // eslint-disable-line
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express); // eslint-disable-line
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line
  // set locals, only providing error in development
  res.locals.message = err.message; // eslint-disable-line
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // eslint-disable-line

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
