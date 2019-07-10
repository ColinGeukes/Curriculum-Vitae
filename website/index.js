const express = require('express');
const path = require('path');
const config = require('./config.json');
const Dao = require('./dao/dao.js');
const Mailer = require('./server/mailer/mailer.js');
const Api = require('./server/routes/api.js');
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

app.get('/project/:id', (req, res) => {
	let values = config;
	values['params'] = req.params;
	res.render('project', values);
});

// Create the api
const dao = new Dao(config.dao, true);
const mailer = new Mailer(config.email);
const api = new Api({
	'dao': dao,
	'mailer': mailer,
	'notificationMail': config.notificationMail
});

app.use('/api', api);

app.listen(config.port, () => {
	console.log(`${config.appName} started on port ${config.port}`);
});

module.exports = app;
