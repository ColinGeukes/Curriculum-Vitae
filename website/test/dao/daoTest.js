`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The skill module
const daoModule = rewire('../../dao/dao.js');
const Dao = daoModule.__get__('Dao');
let dao;
const config = {
	"queries": "./dao/queries/",
	"mysql": {
		"user": "tester",
		"host": "185.95.13.85",
		"database": "cv_test",
		"password": "no-pass",
		"port": 3306
	}
};

describe('Dao', () => {
	context('query calls', () => {
		before((done) => {
			dao = new Dao(config);
			done();
		});

		it('queries loaded', (done) => {
			expect(Object.keys(dao.queries).length).to.not.equal(0);
			done();
		});

		it('query file invalid extension', (done) => {
			// Keep track of the queries loaded.
			const queriesLoaded = Object.keys(dao.queries).length;

			// Load invalid file.
			dao._loadQueryFromFile(config.queries, 'invalid_extension.xml');

			// State of DAO should remain the same.
			expect(Object.keys(dao.queries).length).to.be.equal(queriesLoaded);

			done();
		});

		it('query file invalid filename', (done) => {
			// Keep track of the queries loaded.
			const queriesLoaded = Object.keys(dao.queries).length;

			// Load invalid file.
			dao._loadQueryFromFile(config.queries, 'non_existing_filename.sql');

			// State of DAO should remain the same.
			expect(Object.keys(dao.queries).length).to.be.equal(queriesLoaded);

			done();
		});

		it('load queries from invalid directory', (done) => {
			// Keep track of the queries loaded.
			const queriesLoaded = Object.keys(dao.queries).length;

			// Load invalid file.
			dao.loadQueries('./non_existing_dir/');

			// State of DAO should remain the same.
			expect(Object.keys(dao.queries).length).to.be.equal(queriesLoaded);

			done();
		});

		after((done) => {
			// Close the connection.
			dao.close();
			done();
		});
	});

	context('query calls', () => {
		before((done) => {
			dao = new Dao(config, true);
			done();
		});

		it('Initialising DAO without autoloading queries', (done) => {
			dao = new Dao(config, false);

			// No queries should be loaded.
			expect(Object.keys(dao.queries).length).to.be.equal(0);

			done();
		});
	});
});
