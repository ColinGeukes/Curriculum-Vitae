`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The project module
const projectModule = rewire('../../../../public/js/views/project/project.js');
const Project = projectModule.__get__('Project');
// The project ability module
const projectAbilityModule = rewire('../../../../public/js/views/project/projectAbility.js');
const ProjectAbility = projectAbilityModule.__get__('ProjectAbility');
// The project properties
let project;
let id;
let title;
let descr1;
let descr2;
let startDate;
let endDate;
let tags;

describe('Project', () => {
	context('constructor', () => {
		beforeEach((done) => {
			id = 1;
			title = 'Test Project';
			descr1 = 'A test project';
			descr2 = 'Written in Java';
			startDate = new Date('1999-01-01');
			endDate = new Date('2000-05-11');
			project = new Project({
				id,
				title,
				"description": `${descr1}<br>${descr2}`,
				startDate,
				endDate
			});
			done();
		});

		it('Should have correct id', (done) => {
			expect(project.id).to.be.a('number');
			expect(project.id).to.be.equal(id);
			done();
		});

		it('Should have correct title', (done) => {
			expect(project.title).to.be.a('string');
			expect(project.title).to.be.equal(title);
			done();
		});

		it('Should have correct description', (done) => {
			expect(project.description).to.be.a('array');
			expect(project.description.length).to.be.equal(2);
			expect(project.description[0]).to.be.a('string');
			expect(project.description[0]).to.be.equal(descr1);
			expect(project.description[1]).to.be.a('string');
			expect(project.description[1]).to.be.equal(descr2);
			done();
		});

		it('Should have correct startDate', (done) => {
			expect(project.startDate).to.be.a('date');
			expect(project.startDate).to.be.equal(startDate);
			done();
		});

		it('Should have correct endDate', (done) => {
			expect(project.endDate).to.be.a('date');
			expect(project.endDate).to.be.equal(endDate);
			done();
		});
	});

	context('Load a project', () => {
		before((done) => {
			id = 1;
			title = 'Test Project';
			descr1 = 'A test project';
			startDate = '1999-01-01';
			endDate = '2000-05-11';

			tags = [
				{
					'id': 1,
					'type_id': 1,
					'type_name': 'language',
					'title': 'Java'
				},
				{
					'id': 2,
					'type_id': 1,
					'type_name': 'language',
					'title': 'JavaScript'
				}
			];

			projectModule.__set__({
				'$': {
					'get': (data) => {
						data.success({
							'project': {
								id,
								title,
								'description': descr1,
								'date_start': startDate,
								'date_end': endDate,
								tags
							}
						});
					},
					'each': (dictionary, func) => {
						Object.keys(dictionary).forEach((key) => {
							func(key, dictionary[key]);
						});
					}
				},
				ProjectAbility
			});

			Project.load(1).then((projectObj) => {
				project = projectObj;
				done();
			});
		});

		it('Load should yield correct values', (done) => {
			// Compare projectObj details.
			expect(project.id).to.be.a('number');
			expect(project.id).to.be.equal(id);
			expect(project.title).to.be.a('string');
			expect(project.title).to.be.equal(title);
			expect(project.description).to.be.a('array');
			expect(project.description.length).to.be.equal(1);
			expect(project.description[0]).to.be.equal(descr1);
			done();
		});

		it('Load should yield correct date objects', (done) => {
			// Compare dates with get time, as objects are not equal in memory location.
			expect(project.startDate).to.be.a('date');
			expect(project.startDate.getTime()).to.be.equal(new Date(startDate).getTime());
			expect(project.endDate).to.be.a('date');
			expect(project.endDate.getTime()).to.be.equal(new Date(endDate).getTime());
			done();
		});

		it('Load should yield correct tags', (done) => {
			// Compare the tags.
			expect(project.tags).to.be.a('Object');
			expect(project.tags.language).to.be.a('array');
			expect(project.tags.language.length).to.be.equal(2);
			expect(project.tags.language[0].id).to.be.a('number');
			expect(project.tags.language[0].id).to.be.equal(tags[0].id);
			expect(project.tags.language[0].type).to.be.a('number');
			expect(project.tags.language[0].type).to.be.equal(tags[0].type_id);
			expect(project.tags.language[0].title).to.be.a('string');
			expect(project.tags.language[0].title).to.be.equal(tags[0].title);
			expect(project.tags.language[1].id).to.be.a('number');
			expect(project.tags.language[1].id).to.be.equal(tags[1].id);
			expect(project.tags.language[1].type).to.be.a('number');
			expect(project.tags.language[1].type).to.be.equal(tags[1].type_id);
			expect(project.tags.language[1].title).to.be.a('string');
			expect(project.tags.language[1].title).to.be.equal(tags[1].title);
			done();
		});
	});
});

