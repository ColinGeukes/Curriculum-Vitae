const mysqlLib = require('mysql');

/**
 * Class that is responsible for querying data from the mysql server.
 */
class Dao {

	/**
	 * Initializes a Data Access Object (DAO).
	 * This object is responsible for handling interaction between server and database
	 * @param config - The connection config files.
	 */
	constructor(config) {
		// Create the connection to the MySQL server.
		this.sql = mysqlLib.createConnection(config);
		this.sql.connect();
	}

	/**
	 * Method to terminate the connection.
	 */
	close() {
		this.sql.end();
	}

	/**
	 * Method to retrieve all abilities.
	 * @param identifiers - extra parameters used for the query.
	 * @param callback {function(errors, rows)} - function that is called after the query was executed.
	 */
	getAbilities(identifiers, callback) {
		this.sql.query("SELECT * FROM abilities", //TODO: Use the dedicated query files.
			function (err, rows) {
				callback(err, rows);
			}
		);
	}

	/**
	 * Method to retrieve all types.
	 * @param identifiers - extra parameters used for the query.
	 * @param callback {function(errors, rows)} - function that is called after the query was executed.
	 */
	getTypes(identifiers, callback) {
		this.sql.query("SELECT * FROM types", //TODO: Use the dedicated query files.
			function (err, rows) {
				callback(err, rows);
			}
		);
	}
}

module.exports = Dao;
