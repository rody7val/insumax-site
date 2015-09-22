var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var partials      = require('express-partials');
var LocalStorage  = require('node-localstorage').LocalStorage;
var shop          = require('cornershop', true);

var routes = require('./routes/index');

var app = express();

// vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// myCart:
app.use(function(req, res, next){
    var cart = shop('cart');
    localStorage = new LocalStorage('./scratch');
    cart.addItem({
      id:10,
      name:'Superman Poster',
      desc:'10x5 - superman logo bottom-right',
      price:12.5,
      qty:2,
      image:'/img/shop/superman.png'
    });
    cart.save();
    localStorage.setItem('myCart', cart);
    // hacer visible cart en las vistas
    res.locals.cart = cart;
    next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
