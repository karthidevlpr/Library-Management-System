/**
 * Created by karthick on 31/08/16.
 */

var express = require('express');
var app = express();
var port = process.env.PORT || 7070;
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var Init = require("./server/init/init");


app.use(cors());

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Library');

app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true,cookie: { path: '/', httpOnly: true, maxAge: 30 * 30000 },rolling: true}));

require("./server/routes.js")(app);

Init.saveSuperAdmin();

app.listen(port);
console.log('App is listening on port: ' + port);
