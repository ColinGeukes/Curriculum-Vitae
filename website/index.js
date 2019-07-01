'use strict';

const express = require('express');
const path = require('path');

const config = require('./config.json');


const Dao = require('./dao/dao.js');
const Api = require('./routes/api.js');

// Instantiate app
const app = express();

// Setup static content directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine (pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function (req, res) {
	res.render('index', config);
});

// Create the api
const dao = new Dao(config.mysql);
const api = new Api(dao);

app.use('/api', api);

app.listen(config.port, function () {
	console.log(`${config.appName} started on port ${config.port}`);
});

module.exports = app;
