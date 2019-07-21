`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The jQuery mock
const jQueryMock = require('../mocks/jQueryMock.js');
// The education module
const navigationModule = rewire('../../../public/js/views/navigation.js');
const Navigation = navigationModule.__get__('Navigation');
let navigation;
let jQuery;

describe('Navigation', () => {
	context('small navigation', () => {
		before((done) => {
			jQuery = jQueryMock.create({
				'_document': {'width': 299},
				'header nav': {}
			});

			navigationModule.__set__({
				'$': jQuery,
				'document': '_document',
				'SMALL_NAVIGATION_WIDTH': 300
			});

			navigation = new Navigation();

			done();
		});

		it('Should have loaded with small size', () => {
			expect(jQuery.config['header nav'].__changes.addClass[0]).to.be.equal('nav-small');
		});
	});

	context('large navigation', () => {
		before((done) => {
			jQuery = jQueryMock.create({
				'_document': {'width': 301},
				'header nav': {}
			});

			navigationModule.__set__({
				'$': jQuery,
				'document': '_document',
				'SMALL_NAVIGATION_WIDTH': 300
			});

			navigation = new Navigation();

			done();
		});

		it('Should have loaded with small size', () => {
			expect(jQuery.config['header nav'].__changes.removeClass[0]).to.be.equal('nav-small');
		});
	});
});
