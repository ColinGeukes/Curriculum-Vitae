const express = require('express');

/**
 * An api class for adding /api routes to express
 */
class Api extends express.Router {
	/**
	 * Default constructor that adds routes for handling api calls
	 * @param {Dao} dao A Database Access Object for requesting data
	 */
	constructor(dao) {
		super();
		this._dao = dao;

		this.get('/abilities', async (req, res) => {
			this._dao.getAbilities(req.query, function (err, rows) {
				res.send(rows);
			});
		});

		this.get('/types', async (req, res) => {
			this._dao.getTypes(req.query, function (err, rows) {
				res.send(rows);
			});
		});
	}
}

module.exports = Api;
