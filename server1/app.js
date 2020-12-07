var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
//라우터
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginrouter = require('./routes/login');
var signuprouter = require('./routes/signup');
var mypagerouter = require('./routes/mypage');
var reservationrouter = require('./routes/reservation');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  key: "user",
  secret: "abc",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 500,
  },
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginrouter);
app.use('/signup', signuprouter);
app.use('/mypage', mypagerouter);
app.use('/reservation', reservationrouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get("/", (req, res) => {
  console.log('세션 정보 확인')
  if (req.session.user) {
    console.log('세션 존재')
    res.send({ loggedin: true, user: req.session.user });

  } else {
    console.log('세션 없음')
    res.send({ loggedin: false });
  }
});

module.exports = app;
