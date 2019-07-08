`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The jQuery mock
const jQueryMock = require('./mocks/jQueryMock.js');
// The skill module
const galleryModule = rewire('../../public/js/gallery.js');
const Gallery = galleryModule.__get__('Gallery');
let settings;
let testingObj;
let called;
let parent;
let jQuery;

describe('Gallery', () => {
	context('constructor', () => {
		called = {
			'itemHTML': [],
			'itemURL': [],
			'displayAmount': []
		};

		before((done) => {
			settings = {
				'element': 'parent',
				'featuring': [
					'item a',
					'item b'
				],
				'itemHTML': (item) => {
					called.itemHTML.push(item);
				},
				'itemURL': (item) => {
					called.itemHTML.push(item);
				},
				'displayAmount': (width) => {
					called.displayAmount.push(width);
				}
			};

			testingObj = new Gallery(settings, false);
			done();
		});

		it('Should have default pointer', (done) => {
			expect(testingObj.featuringPointer).to.be.a('number');
			expect(testingObj.featuringPointer).to.be.equal(0);
			done();
		});

		it('Should have element', (done) => {
			expect(testingObj.element).to.be.equal(settings.element);
			done();
		});

		it('Should have featuring', (done) => {
			expect(testingObj.featuring).to.be.equal(settings.featuring);
			done();
		});

		it('Should have itemHTML', (done) => {
			expect(testingObj.itemHTML).to.be.equal(settings.itemHTML);
			done();
		});

		it('Should have itemURL', (done) => {
			expect(testingObj.itemURL).to.be.equal(settings.itemURL);
			done();
		});

		it('Should have correct displayAmount', (done) => {
			expect(testingObj.displayAmount).to.be.equal(settings.displayAmount);
			done();
		});
	});

	context('functionality testing', () => {
		called = {
			'itemHTML': [],
			'itemURL': [],
			'displayAmount': []
		};

		beforeEach((done) => {
			// Setting the jQuery mock
			jQuery = jQueryMock.create({
				'children': [
					'child 1',
					'child 2',
					'child 3'
				]
			});
			galleryModule.__set__({
				'$': jQuery
			});

			parent = jQuery('parent');

			settings = {
				'element': parent,
				'featuring': [
					'item a',
					'item b'
				],
				'itemHTML': (item) => {
					called.itemHTML.push(item);
				},
				'itemURL': (item) => {
					called.itemHTML.push(item);
				},
				'displayAmount': (width) => {
					called.displayAmount.push(width);
					return 2;
				}
			};

			testingObj = new Gallery(settings, true);
			done();
		});

		it('Default settings', (done) => {
			// Default pointer
			expect(testingObj.featuringPointer).to.be.a('number');
			expect(testingObj.featuringPointer).to.be.equal(0);

			// Class .card-panel should always be added.
			addClasses = jQuery.__changes.addClass;
			for (let i = 0; i < addClasses.length; i++) {
				if (addClasses[i] === 'card-panel') {
					done();
				}
			}
		});

		it('Click event of left button', (done) => {
			// Initial state should be 0
			expect(testingObj.featuringPointer).to.be.equal(0);

			// Firing click event
			jQuery.__changes.click[0]();

			// Featuring pointer should be wrapped around.
			expect(testingObj.featuringPointer).to.be.equal(2);
			done();
		});

		it('Click event of right button', (done) => {
			// Initial state should be 0
			expect(testingObj.featuringPointer).to.be.equal(0);

			// Firing click event
			jQuery.__changes.click[1]();

			// Featuring pointer should be wrapped around.
			expect(testingObj.featuringPointer).to.be.equal(1);
			done();
		});
	});
});

