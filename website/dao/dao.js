const mysqlLib = require('mysql');
const fs = require('fs');
// Const ts = require('es6-template-strings');
const compile = require('es6-template-strings/compile');
const resolveToString = require('es6-template-strings/resolve-to-string');
const Console = console;

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

		// Function readFiles(dirname, onFileContent, onError) {
		fs.readdir(dirname, (err1, filenames) => {
			if (err1) {
				Console.error('Error, while opening query file', err1);
				return;
			}
			filenames.forEach((filename) => {
				fs.readFile(dirname + filename, 'utf-8', (err2, content) => {
					if (err2) {
						Console.error('Error, while opening query file', err2);
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
			identifiers.type = '';
		}

		this.sql.query(resolveToString(this.queries[name], identifiers),
			(err, rows) => {
				callback(err, rows);
			});
	}
}

module.exports = Dao;
