`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The project card module
const projectCardModule = rewire('../../../../public/js/projectCard.js');
const ProjectCard = projectCardModule.__get__('ProjectCard');
// The skill module
const skillModule = rewire('../../../../public/js/skill.js');
const Skill = skillModule.__get__('Skill');
// The education module
const educationModule = rewire('../../../../public/js/education.js');
const Education = educationModule.__get__('Education');
// The experience module
const experienceModule = rewire('../../../../public/js/experience.js');
const Experience = experienceModule.__get__('Experience');
// The project ability
const projectAbilityModule = rewire('../../../../public/js/views/project/projectAbility.js');
const ProjectAbility = projectAbilityModule.__get__('ProjectAbility');


// The project pageHandler module
const PageHandlerModule = rewire('../../../../public/js/views/main/pageHandler.js');
const initPageHandler = PageHandlerModule.__get__('initPageHandler');

describe('Main PageHandler', () => {
	context('DOM Manipulation while loading everything', () => {
		before((done) => {

			// Create mock of jquery dom manipulation
			function createJqueryMock(get, elementSettings) {
				const jQueryMock = (element) => ({
					'ready': (func) => {
						func();
					},
					'resize': (func) => {
						func();
					},
					'text': (text) => {
					},
					'append': (text) => {
					},
					'prepend': (text) => {
					},
					'addClass': (text) => {
					},
					'removeClass': (text) => {
					},
					'click': (func) => {
					},
					'children': () => {
						return createJqueryMock(get, elementSettings)('child 1');
					},
					'width': () => {
						return elementSettings.width;
					},
					'each': (func) => {
						func(0);
					}
				});

				jQueryMock.each = (dictionary, func) => {
					Object.keys(dictionary).forEach((key) => {
						func(key, dictionary[key]);
					});
				};

				jQueryMock.get = () => {
					return get;
				};
				return jQueryMock;
			}


			educationModule['loadAll'] = function () {
				return new Promise(function (resolve) {
					resolve([new Education({
						'id': 1,
						'name': 'Edu name',
						'title': 'Edu title',
						'type': 'Edu type',
						'description': 'Edu description',
						'icon': 'Edu icon',
						'dateStart': new Date('2001-01-01')
					}), new Education({
						'id': 2,
						'name': 'Edu name 2',
						'title': 'Edu title 2',
						'type': 'Edu type 2',
						'description': 'Edu description 2',
						'icon': 'Edu icon 2',
						'dateStart': new Date('2001-01-01'),
						'dateEnd': new Date('2001-01-01')
					})]);
				});
			};

			experienceModule['loadAll'] = function () {
				return new Promise(function (resolve) {
					resolve([new Experience({
						'id': 1,
						'name': 'Experience name',
						'title': 'Experience title',
						'description': 'Experience description',
						'icon': 'Experience icon',
						'dateStart': new Date('2001-01-01'),
						'dateEnd': new Date('2005-01-01')
					})]);
				});
			};

			skillModule['_loadSkills'] = function () {
				return new Promise(function (resolve) {
					resolve({
						'language': {
							'type': 1, 'skills': [
								new Skill({
									'name': 'Java',
									'stars': 5,
									'extra': 'Very good at it'
								})
							]
						}, 'skills': {
							'type': 2, 'skills': [
								new Skill({
									'name': 'Testing',
									'stars': 3
								})
							]
						}
					});
				});
			};

			projectCardModule['_loadAll'] = function () {
				return new Promise(function (resolve) {
					resolve([new ProjectCard({
						'id': 1,
						'title': 'Experience title',
						'description': 'Experience description',
						'startDate': new Date('2001-01-01')
					})]);
				});
			};

			PageHandlerModule.__set__({
				'$': createJqueryMock('', {width: '5000px'}),
				'Education': educationModule,
				'Experience': experienceModule,
				'ProjectCard': projectCardModule,
				'Skill': skillModule,
				'window': 'window',
				'document': 'document'
			});

			done();
		});

		it('Should initialize the page without errors', (done) => {
			initPageHandler();
			done();
		});
	});
});

