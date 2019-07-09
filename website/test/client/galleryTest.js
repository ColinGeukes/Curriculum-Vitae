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
		beforeEach((done) => {
			/*
			 * Setting the jQuery mock
			 * Setting the jQuery mock
			 */
			jQuery = jQueryMock.create({
				'_element': {
					'find': {
						'.button-left': '_button-left',
						'.button-right': '_button-right',
						'.gallery-content': '_gallery-content',
						'.cards': '_cards'
					}
				},
				'#projects .cards > .row': {
					'children': '_cardsChildren'
				},
				'_cardsChildren': [
					'child 1',
					'child 2',
					'child 3'
				],
				'child 1': {
					'attr': {
						'id': 'child 1'
					}
				},
				'child 2': {
					'attr': {
						'id': 'child 2'
					}
				},
				'child 3': {
					'attr': {
						'id': 'child 3'
					}
				},
				'_button-left': {},
				'_button-right': {},
				'_gallery-content': {},
				'_cards': {
					'width': 450
				}
			});
			galleryModule.__set__({
				'$': jQuery
			});

			settings = {
				'element': jQuery('_element'),
				'featuring': [
					'item a',
					'item b'
				],
				'itemHTML': () => null,
				'itemURL': () => null,
				'displayAmount': () => 2
			};

			testingObj = new Gallery(settings, true);
			done();
		});

		it('Default settings', (done) => {
			// Default pointer
			expect(testingObj.featuringPointer).to.be.a('number');
			expect(testingObj.featuringPointer).to.be.equal(0);

			// Added html to the element
			expect(jQuery.config._element.__changes.html.length).to.be.equal(1);
			done();
		});

		it('Click event of left button', (done) => {
			// Initial state should be 0
			expect(testingObj.featuringPointer).to.be.equal(0);

			// Firing click event
			jQuery.config['_button-left'].__changes.click[0]();

			// Featuring pointer should be wrapped around.
			expect(testingObj.featuringPointer).to.be.equal(2);
			done();
		});

		it('Click event of right button', (done) => {
			// Initial state should be 0
			expect(testingObj.featuringPointer).to.be.equal(0);

			// Firing click event
			jQuery.config['_button-right'].__changes.click[0]();

			// Featuring pointer should be wrapped around.
			expect(testingObj.featuringPointer).to.be.equal(1);
			done();
		});
	});
});

