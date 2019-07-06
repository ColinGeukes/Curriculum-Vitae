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
		it('Should load correct project', (done) => {
			id = 1;
			title = 'Test Project';
			descr1 = 'A test project';
			startDate = '1999-01-01';
			endDate = '2000-05-11';

			tags = [
				{'id': 1,
					'type': 1,
					'title': 'Java'},
				{'id': 2,
					'type': 1,
					'title': 'JavaScript'}
			];

			Project.load(1, {
				'get' (data) {
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
				}
			}, ProjectAbility).then((projectObj) => {
				// Compare projectObj details.
				expect(projectObj.id).to.be.a('number');
				expect(projectObj.id).to.be.equal(id);
				expect(projectObj.title).to.be.a('string');
				expect(projectObj.title).to.be.equal(title);
				expect(projectObj.description).to.be.a('array');
				expect(projectObj.description.length).to.be.equal(1);
				expect(projectObj.description[0]).to.be.equal(descr1);

				// Compare dates with get time, as objects are not equal in memory location.
				expect(projectObj.startDate).to.be.a('date');
				expect(projectObj.startDate.getTime()).to.be.equal(new Date(startDate).getTime());
				expect(projectObj.endDate).to.be.a('date');
				expect(projectObj.endDate.getTime()).to.be.equal(new Date(endDate).getTime());

				// Compare the tags.
				expect(projectObj.tags).to.be.a('array');
				expect(projectObj.tags[0].id).to.be.a('number');
				expect(projectObj.tags[0].id).to.be.equal(tags[0].id);
				expect(projectObj.tags[0].type).to.be.a('number');
				expect(projectObj.tags[0].type).to.be.equal(tags[0].type);
				expect(projectObj.tags[0].title).to.be.a('string');
				expect(projectObj.tags[0].title).to.be.equal(tags[0].title);
				expect(projectObj.tags[1].id).to.be.a('number');
				expect(projectObj.tags[1].id).to.be.equal(tags[1].id);
				expect(projectObj.tags[1].type).to.be.a('number');
				expect(projectObj.tags[1].type).to.be.equal(tags[1].type);
				expect(projectObj.tags[1].title).to.be.a('string');
				expect(projectObj.tags[1].title).to.be.equal(tags[1].title);

				done();
			});
		});
	});
});

