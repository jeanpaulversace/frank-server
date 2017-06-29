// initialize  =================================================================
require('dotenv').config();
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./auth/passport-facebook-token')(passport); // pass passport for configuration

// database =============================
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

// routes ======================================================================
require('./routes')(app);

// launch ======================================================================
app.listen(port);
