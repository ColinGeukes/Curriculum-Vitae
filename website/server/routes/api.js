const express = require('express');
const Console = console;

/**
 * Method to retrieve and bind the correct params.
 * @param {JSON} queryParams - the params from the query.
 * @param {[String]} neededParams - list of all keys the query needs.
 * @return {Array} param array that the query needs.
 */
function getRequestParams(queryParams, neededParams) {
	const requestParams = [];

	neededParams.forEach((element) => {
		requestParams.push(queryParams[element]);
	});
	return requestParams;
}

function standardResponse(res, err, rows) {
	// Check if the request resulted in an error
	if (err) {
		// If debugging is on, do something with the error.
		if (this.debugging) {
			// Print the error, for debugging purposes.
			Console.error(err);
		}

		// Respond with the error
		res.send(err);
		return;
	}

	// Respond with the result
	res.send(rows);
}

function createBasicQueryPath(api, url, query, params = []) {
	api.get(url, async (req, res) => {
		// Retrieve all the needed params from the request.
		const requestParams = getRequestParams(req.query, params);

		api._dao.query(query, requestParams, (err, rows) => {
			// Send the response
			standardResponse(res, err, rows);
		});
	});
}

function createContactPath(api, url) {
	api.post(url, async (req, res) => {
		const body = req.body;

		// Store the contact form in the database
		api._dao.queryContact(body.name, body.organization, body.email, body.description, (err, rows) => {
			if (rows) {
				res.redirect(`/thanks/${body.name}`);
				Console.log(`Successfully stored information about a new contact in the database: ${body.email}`);
			}
		});

		// Send a thank you email to one that filled the form.
		api.mailer.sendMail(body.email, 'Thank you for contacting!', 'thanks', {
			'receiver': body.name,
			'name': body.name,
			'organization': body.organization,
			'description': body.description,
			'sender': api.mailer.username
		}, () => {
			Console.log(`Successfully send email contact to: ${body.email}`);
		}, (failure) => {
			Console.error(`ERROR: failed to send email ${failure}`);
		});

		// Send a notification to myself, to gain updates if someone tries to contact me
		api.mailer.sendMail(api.notificationMail, 'Someone has contacted you!', 'inform', {
			'receiver': api.mailer.username,
			'name': body.name,
			'organization': body.organization,
			'email': body.email,
			'description': body.description
		}, () => {
			Console.log(`Successfully send email contact inform to: ${api.notificationMail}`);
		}, (failure) => {
			Console.error(`ERROR: failed to send email ${failure}`);
		});
	});
}

function createProjectPath(api, url) {
	api.get(url, async (req, res) => {
		// Retrieve all the needed params from the request.
		const requestParams = getRequestParams(req.query, ['id']);

		api._dao.query('get_project', requestParams, (err, rows) => {
			api._dao.query('get_project_abilities', requestParams, (err2, rows2) => {
				// Create the correct response format.
				const respFormat = {
					'project': rows[0]
				};

				respFormat.project.tags = rows2;

				// Send the response
				standardResponse(res, err2, respFormat);
			});
		});
	});
}

/**
 * An api class for adding /api routes to express
 */
class Api extends express.Router {
	/**
	 * Default constructor that adds routes for handling api calls
	 * @param {Dao} dao - A Database Access Object for requesting data
	 * @param {boolean} debugging - If true, error logs will be printed on the console.
	 */
	constructor(config, debugging = true) {
		super();
		this._dao = config.dao;
		this.mailer = config.mailer;
		this.notificationMail = config.notificationMail;
		this.debugging = debugging;

		// Create a simple api query call.
		const that = this;

		createBasicQueryPath(this, '/abilities', 'get_abilities');
		createBasicQueryPath(this, '/projects', 'get_projects');
		createBasicQueryPath(this, '/educations', 'get_educations');
		createBasicQueryPath(this, '/experiences', 'get_experiences');
		createBasicQueryPath(this, '/achievements', 'get_achievements');
		createProjectPath(this, '/project');
		createContactPath(this, '/contact');
	}
}

module.exports = Api;
