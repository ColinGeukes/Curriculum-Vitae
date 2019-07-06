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
			standardResponse(res, err, rows);
		});
	});
}

function createContactPath(api, url) {
	api.post(url, async (req, res) => {
		const body = req.body;

		api._dao.queryContact(body.name, body.organization, body.email, body.description, (err, rows) => {
			if (rows) {
				res.redirect(`/thanks/${body.name}`);
			}
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
	constructor(dao, debugging = true) {
		super();
		this._dao = dao;
		this.debugging = debugging;

		// Create a simple api query call.
		const that = this;


		createBasicQueryPath(this, '/abilities', 'get_abilities');
		createBasicQueryPath(this, '/projects', 'get_projects');
		createBasicQueryPath(this, '/educations', 'get_educations');
		createProjectPath(this, '/project');
		createContactPath(this, '/contact');
	}
}

module.exports = Api;
