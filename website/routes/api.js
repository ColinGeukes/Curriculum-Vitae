const express = require('express');

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
				that._dao.query(query, req.query, function (err, rows) {
					if (err) {
						if (that.debugging)
							console.log("Error", err);
						res.send(err);
						return;
					}
					res.send(rows);
				});
			});
		}

		createPath('/abilities', 'get_abilities');
		createPath('/types', 'get_types');
	}
}

module.exports = Api;
