const mysqlLib = require('mysql');
const fs = require('fs');
// const ts = require('es6-template-strings');
const compile = require('es6-template-strings/compile');
const resolveToString = require('es6-template-strings/resolve-to-string');

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

		// Load all the queries from stored file.
		this.loadQueries('./dao/queries/');
	}

	loadQueries(dirname) {
		// Creates the query dictionary.
		this.queries = {};
		const that = this;

		// function readFiles(dirname, onFileContent, onError) {
		fs.readdir(dirname, function (err, filenames) {
			if (err) {
				console.log("Error, while opening query file", err);
				return;
			}
			filenames.forEach(function (filename) {
				fs.readFile(dirname + filename, 'utf-8', function (err, content) {
					if (err) {
						console.log("Error, while opening query file", err);
						return;
					}

					that.queries[filename.split('.')[0]] = compile(content);
				});
			});
		});
	}

	/**
	 * Method to terminate the connection.
	 */
	close() {
		this.sql.end();
	}


	query(name, identifiers, callback) {


		if (!('type' in identifiers)) {
			identifiers['type'] = '';
		}

		this.sql.query(resolveToString(this.queries[name], identifiers), //TODO: Use the dedicated query files.
			function (err, rows) {
				callback(err, rows);
			}
		);
	}

	/**
	 * Method to retrieve all abilities.
	 * @param identifiers - extra parameters used for the query.
	 * @param callback {function(errors, rows)} - function that is called after the query was executed.
	 */
	// getAbilities(identifiers, callback) {
	// 	this.sql.query(this.queries['get_abilities'], //TODO: Use the dedicated query files.
	// 		function (err, rows) {
	// 			callback(err, rows);
	// 		}
	// 	);
	// }
	//
	// /**
	//  * Method to retrieve all types.
	//  * @param identifiers - extra parameters used for the query.
	//  * @param callback {function(errors, rows)} - function that is called after the query was executed.
	//  */
	// getTypes(identifiers, callback) {
	// 	this.sql.query(this.queries['get_types'], //TODO: Use the dedicated query files.
	// 		function (err, rows) {
	// 			callback(err, rows);
	// 		}
	// 	);
	// }
}

module.exports = Dao;
