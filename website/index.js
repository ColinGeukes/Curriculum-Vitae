'use strict';

const express = require('express');
const path = require('path');

const config = require('./config.json');

// Instantiate app
const app = express();

// Setup static content directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine (pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function(req, res) {
  // config.deepfried = req.query.deepfried;
  // let language = 'english';
  // if (req.query.lang) {
  //   language = req.query.lang;
  // } else if (req.query.deepfried) {
  //   language = 'deepfried';
  // }
  // // config.strings = require(`./language/${language}.json`);
  res.render('index', config);
});

app.listen(config.port, function() {
  console.log(`${config.appName} started on port ${config.port}`);
});


module.exports = app;
