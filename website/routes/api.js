const express = require('express');
const Console = console;


function createBasicQueryPath(api, url, query) {
	api.get(url, async (req, res) => {
		api._dao.query(query, req.query, (err, rows) => {
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
		createBasicQueryPath(this, '/types', 'get_types');
		createBasicQueryPath(this, '/projects', 'get_projects');
		createContactPath(this, '/contact');
	}
}

module.exports = Api;
