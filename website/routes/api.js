const express = require('express');
const Console = console;

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

		function createPath(url, query) {
			that.get(url, async (req, res) => {
				that._dao.query(query, req.query, (err, rows) => {
					// Check if the request resulted in an error
					if (err) {
						// If debugging is on, do something with the error.
						if (that.debugging) {
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

		createPath('/abilities', 'get_abilities');
		createPath('/types', 'get_types');
	}
}

module.exports = Api;
