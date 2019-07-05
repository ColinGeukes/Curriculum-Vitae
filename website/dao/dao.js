// Used for interaction with the MySQL database.
const mysqlLib = require('mysql');
// Used for reading files for loading queries.
const fs = require('fs');
// Object for logging to the console.
const Console = console;

/**
 * Class that is responsible for querying data from the mysql server.
 */
class Dao {
	/**
	 * Initializes a Data Access Object (DAO).
	 * This object is responsible for handling interaction between server and database
	 * @param {{queries: {string}, mysql: {host : {string}, database : {string}, user : {string}, password : {string},
	 * port : {number}}}} config - the config file
	 * @param {boolean} [loadQueries] - if all queries should be loaded on initialize.
	 */
	constructor(config, loadQueries = true) {
		// Create the connection to the MySQL server.
		this.sql = mysqlLib.createConnection(config.mysql);
		this.sql.connect();

		// Creates the query dictionary.
		this.queries = {};

		// Load all queries if enabled.
		if (loadQueries) {
			this.loadQueries(config.queries);
		}
	}

	/**
	 * Method to load all queries from a dictionary.
	 * @param dirname - the directory path to load all the queries from.
	 * @return {void}
	 */
	loadQueries(dirname) {
		let files;

		// Get all files that are in the directory.
		try {
			files = fs.readdirSync(dirname);
		} catch (e) {
			// If the directory is invalid, we stop loading queries.
			Console.error("Error, while opening query dir", e.message);
			return;
		}

		// Each file in the map contains a query, add them to the pool of queries.
		const that = this;

		files.forEach((filename) => {
			that._loadQueryFromFile(dirname, filename);
		});
	}

	/**
	 * Method to load a SQL statement from a single file.
	 * @param {string} dirname - the path to the file, without the filename.
	 * @param {string }filename - the name of the file
	 * @return {void}
	 */
	_loadQueryFromFile(dirname, filename) {
		const filenameSplit = filename.split('.');

		// If the first extension is not a sql extension. Then skip that file.
		if (filenameSplit[1] !== 'sql') {
			return;
		}

		// Read the file and store it in the queries.
		try {
			this.queries[filename.split('.')[0]] = fs.readFileSync(dirname + filename, 'utf-8');
		} catch (e) {
			// Log the error to the console object.
			Console.error("Error, while opening query file", e.message);
		}
	}

	/**
	 * Method to terminate the connection.
	 */
	close() {
		this.sql.end();
	}

	query(name, identifiers, callback) {
		this.sql.query(this.queries[name], identifiers,
			(err, rows) => {
				callback(err, rows);
			});
	}

	queryContact(name, organization, email, description, callback) {
		this.sql.query(this.queries.post_contact, [
			name,
			organization,
			email,
			description
		],
		(err, rows) => {
			callback(err, rows);
		});
	}
}

module.exports = Dao;
