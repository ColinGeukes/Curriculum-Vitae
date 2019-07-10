`use strict`;

/**
 *******
 * -- Environment
 ********
 */
const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
const jQueryMock = require('../../mocks/jQueryMock.js');
/**
 * ******
 * -- MODULES
 ********
 */
const scrollHandlerModule = rewire('../../../../public/js/views/main/scrollHandler.js');
/**
 *******
 * -- Variables
 ********
 */
let jQuery;

describe('Main ScrollHandler', () => {
	context('Functionality testing', () => {
		it('Scrolled into view', (done) => {
			// Setting up the jQuery mock.
			jQuery = jQueryMock.create({
				'window': {
					'scrollTop': 50,
					'height': 500
				},
				'view-element': {
					'height': 200,
					'offset': {
						'top': 100
					}
				}
			});

			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery,
				'window': 'window'
			});

			// Checking equality.
			const value = scrollHandlerModule.__get__("isScrolledIntoView")(jQuery('view-element'));

			expect(value).to.be.a('boolean');
			expect(value).to.be.equal(true);
			done();
		});
		it('Not scrolled into view', (done) => {
			// Setting up the jQuery mock.
			jQuery = jQueryMock.create({
				'window': {
					'scrollTop': 330,
					'height': 500
				},
				'view-element': {
					'height': 200,
					'offset': {
						'top': 100
					}
				}
			});

			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery,
				'window': 'window'
			});

			// Checking equality.
			const value = scrollHandlerModule.__get__("isScrolledIntoView")(jQuery('view-element'));

			expect(value).to.be.a('boolean');
			expect(value).to.be.equal(false);
			done();
		});
		it('Element in view', (done) => {
			// Setting up the jQuery mock.
			jQuery = jQueryMock.create({
				'window': {
					'scrollTop': 100,
					'height': 400
				},
				'view-element': {
					'height': 200,
					'offset': {
						'top': 299
					}
				}
			});

			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery,
				'window': 'window'
			});

			// Checking equality.
			const value = scrollHandlerModule.__get__("isInView")(jQuery('view-element'));

			expect(value).to.be.a('boolean');
			expect(value).to.be.equal(true);
			done();
		});
		it('Element not in view', (done) => {
			// Setting up the jQuery mock.
			jQuery = jQueryMock.create({
				'window': {
					'scrollTop': 100,
					'height': 400
				},
				'view-element': {
					'height': 200,
					'offset': {
						'top': 301
					}
				}
			});

			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery,
				'window': 'window'
			});

			// Checking equality.
			const value = scrollHandlerModule.__get__("isInView")(jQuery('view-element'));

			expect(value).to.be.a('boolean');
			expect(value).to.be.equal(false);
			done();
		});
		it('At bottom of the page', (done) => {
			// Setting up the jQuery mock.
			jQuery = jQueryMock.create({
				'window': {
					'scrollTop': 500,
					'height': 900
				},
				'document': {
					'height': 1400
				}
			});

			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery,
				'window': 'window',
				'document': 'document',
				'LAST_SECTION_SCROLL_NAV_SELECT_DIFF': 0
			});

			// Checking correct path.
			scrollHandlerModule.__get__("bottomOfPage")(() => {
				// At the bottom of the page
				done();
			}, () => {
				// Not at the bottom of the page
				throw Error("not Bottom should not be called");
			});
		});
		it('Not at bottom of the page', (done) => {
			// Setting up the jQuery mock.
			jQuery = jQueryMock.create({
				'window': {
					'scrollTop': 500,
					'height': 900
				},
				'document': {
					'height': 1401
				}
			});

			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery,
				'window': 'window',
				'document': 'document',
				'LAST_SECTION_SCROLL_NAV_SELECT_DIFF': 0
			});

			// Checking correct path.
			scrollHandlerModule.__get__("bottomOfPage")(() => {
				// At the bottom of the page
				throw Error("Bottom should not be called");
			}, () => {
				// Not at the bottom of the page
				done();
			});
		});
		it('Selecting single nav button', (done) => {
			// Setting up the jQuery mock.
			jQuery = jQueryMock.create({
				'activatedSessions': {
					'attr': {
						'id': 'profile'
					}
				},
				'.nav-button:not(#nav-profile)': [
					'session-1',
					'session-2'
				],
				'nav #nav-profile': {},
				'session-1': {},
				'session-2': {}
			});

			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery

			});

			// Checking correct path classes added and removed.
			scrollHandlerModule.__get__("selectSingleNavButton")(jQuery('activatedSessions'));
			expect(jQuery.config['nav #nav-profile'].__changes.addClass[0]).to.be.equal('activated');
			expect(jQuery.config['session-1'].__changes.removeClass[0]).to.be.equal('activated');
			expect(jQuery.config['session-2'].__changes.removeClass[0]).to.be.equal('activated');

			done();
		});
		it('Scroll update at bottom of page', (done) => {
			// Setting up the jQuery mock.
			jQuery = jQueryMock.create({
				'window': {
					'scrollTop': 500,
					'height': 900
				},
				'document': {
					'height': 1400
				},
				'section': [
					'section-1',
					'section-2'
				],
				'section-1': {},
				'section-2': {
					'attr': {
						'id': 'last-section'
					}
				},
				'.intro-animation:not(.loading)': ['_animation'],
				'_animation': {
					'offset': {
						'top': 10,
						'height': 100
					}
				}
			});


			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery,
				'window': 'window',
				'document': 'document',
				'LAST_SECTION_SCROLL_NAV_SELECT_DIFF': 0
			});

			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery,
				'bottomOfPage': (bottom) => bottom(),
				'selectSingleNavButton': (section) => {
					// Last section should be given.
					expect(section).to.be.equal(jQuery.config['section-2'].__element);
					done();
				}
			});

			// Bottom of page should be called, function is already tested thus it is stubbed.
			scrollHandlerModule.__get__("scrollUpdate")();
		});
		it('Scroll update, highlight middle section and apply animaton', (done) => {
			// Setting up the jQuery mock.
			jQuery = jQueryMock.create({
				'window': {
					'scrollTop': 500,
					'height': 900
				},
				'document': {
					'height': 1400
				},
				'section': [
					'section-1',
					'section-2',
					'section-3'
				],
				'section-1': {},
				'section-2': {
					'attr': {
						'id': 'middle-section'
					}
				},
				'section-3': {},
				'.intro-animation:not(.loading)': ['_animation'],
				'_animation': {
					'offset': {
						'top': 960
					},
					'height': 10
				}
			});


			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery,
				'window': 'window',
				'document': 'document',
				'LAST_SECTION_SCROLL_NAV_SELECT_DIFF': 0
			});

			// Applying variables.
			scrollHandlerModule.__set__({
				'$': jQuery,
				'bottomOfPage': (bottom, notBottom) => notBottom(),
				'isInView': (element) => element === jQuery.config['section-2'].__element,
				'selectSingleNavButton': () => {

					// Should remove the intro animation class.
					expect(jQuery.config['_animation'].__changes['removeClass'][0]).to.be.equal('intro-animation');

					// Getting here is the end of the function.
					done();
				}
			});

			// Bottom of page should be called, function is already tested thus it is stubbed.
			scrollHandlerModule.__get__("scrollUpdate")();
		});
	});
});
