`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The jQuery mock
const jQueryMock = require('../../mocks/jQueryMock.js');
// The project module
const projectModule = rewire('../../../../public/js/views/project/project.js');
const Project = projectModule.__get__('Project');
// The project ability
const projectAbilityModule = rewire('../../../../public/js/views/project/projectAbility.js');
const ProjectAbility = projectAbilityModule.__get__('ProjectAbility');
// The project pageHandler module
const PageHandlerModule = rewire('../../../../public/js/views/project/pageHandler.js');
const loadProject = PageHandlerModule.__get__('loadProject');
// The navigation module
const navigationModule = rewire('../../../../public/js/views/navigation.js');
const Navigation = navigationModule.__get__('Navigation');
// Variables
let jQuery;
let appliedTags;

describe('PageHandler', () => {
	context('DOM Manipulation', () => {
		before((done) => {
			// Setting modules
			PageHandlerModule.__set__('Project', {
				'load': (index) => new Promise((resolve, reject) => {
					const project = new Project({
						'id': index,
						'title': 'project',
						'description': 'test_description',
						'startDate': '1998-11-01',
						'endDate': '2018-01-01'
					});

					project.tags = appliedTags;
					resolve(project);
				})
			});

			/*
			 * Create mock of jquery dom manipulation
			 * const jQueryMock = (element) => ({
			 * 	'text': (text) => {
			 * 	},
			 * 	'append': (text) => {
			 * 	},
			 * 	'removeClass': (text) => {
			 * 	}
			 * });
			 *
			 * jQueryMock.each = (dictionary, func) => {
			 * 	Object.keys(dictionary).forEach((key) => {
			 * 		func(key, dictionary[key]);
			 * 	});
			 * };
			 */
			jQuery = jQueryMock.create({
				'#project .section-header h1': {},
				'#project .section-body .image': {},
				'#project .section-body .description': {},
				'#project-tags': {},
				'#project-tags #type-language': {},
				'.content-container': {},
				'_window': {
					'width': 500
				},
				'_document': {
					'width': 500
				},
				'header nav': {}
			});

			PageHandlerModule.__set__({
				'$': jQuery,
				'window': '_window',
				Navigation
			});
			projectModule.__set__({
				'$': jQuery,
				'document': '_document'
			});

			done();
		});

		it('Should have correct id', (done) => {
			appliedTags = {
				'language': [
					new ProjectAbility({
						'id': 0,
						'type': 1,
						'title': 'java'
					})
				]
			};

			loadProject(1);
			done();
		});
	});
});

