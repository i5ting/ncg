var app, bodyParser, cookieParser, cors, express, favicon, half_hour, logger, path, routes, session, store, users;

express = require('express');

session = require('express-session');

path = require('path');

favicon = require('serve-favicon');

logger = require('morgan');

cookieParser = require('cookie-parser');

bodyParser = require('body-parser');

routes = require('./routes/index');

users = require('./routes/users');

app = express();

cors = require('cors');

app.use(cors());

store = new session.MemoryStore();

half_hour = 3600000 / 2;

app.use(session({
  store: store,
  secret: 'gupjia.ng@me',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: half_hour
  }
}));

app.use(function(req, res, next) {
  req.model = require('./models');
  return next();
});

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(express["static"](path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/users', users);

app.use(function(req, res, next) {
  var err;
  err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
