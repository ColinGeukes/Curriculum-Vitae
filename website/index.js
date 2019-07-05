const express = require('express');
const path = require('path');
const config = require('./config.json');
const Dao = require('./dao/dao.js');
const Api = require('./routes/api.js');
// Instantiate app
const app = express();

// Handling of post requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

// Setup static content directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine (pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', (req, res) => {
	res.render('index', config);
});

app.get('/thanks/:name', (req, res) => {
	let values = config;
	values['params'] = req.params;
	res.render('thanks', values);
});

// Create the api
const dao = new Dao(config.dao, true);
const api = new Api(dao);

app.use('/api', api);

app.listen(config.port, () => {
	console.log(`${config.appName} started on port ${config.port}`);
});

module.exports = app;
