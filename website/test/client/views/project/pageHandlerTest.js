`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The project module
const projectModule = rewire('../../../../public/js/views/project/project.js');
const Project = projectModule.__get__('Project');
// The project ability
const projectAbilityModule = rewire('../../../../public/js/views/project/projectAbility.js');
const ProjectAbility = projectAbilityModule.__get__('ProjectAbility');
// The project pageHandler module
const PageHandlerModule = rewire('../../../../public/js/views/project/pageHandler.js');
const loadProject = PageHandlerModule.__get__('loadProject');

let appliedTags;

describe('PageHandler', () => {
	context('DOM Manipulation', () => {
		before((done) => {

			// Setting modules
			PageHandlerModule.__set__('Project', {
				'load': (index) => {
					return new Promise(function (resolve, reject) {
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
				}
			});

			// Create mock of jquery dom manipulation
			let jQueryMock = (element) => ({
				'text': (text) => {
				},
				'append': (text) => {
				},
				'removeClass': (text) => {
				},
			});
			jQueryMock.each = (dictionary, func) => {
				Object.keys(dictionary).forEach(function (key) {
					func(key, dictionary[key]);
				})
			};

			PageHandlerModule.__set__({'$': jQueryMock});
			projectModule.__set__({'$': jQueryMock});


			// const Project = projectModule.__get__('Project');

			done();
		});

		it('Should have correct id', (done) => {

			appliedTags = {
				'language': [new ProjectAbility({
					'id': 0,
					'type': 1,
					'title': 'java'
				})]
			};

			loadProject(1);
			done();
		});
	});
});

