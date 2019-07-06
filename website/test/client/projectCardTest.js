`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The ProjectCard module
const projectCardModule = rewire('../../public/js/projectCard.js');
const ProjectCard = projectCardModule.__get__('ProjectCard');
// The ProjectCard details
let settings;
let projectCard;
let cards;

describe('ProjectCard', () => {
	context('constructor', () => {
		before((done) => {
			settings = {
				'id': 1,
				'title': 'project Alpha',
				'description': 'Some lines',
				'startDate': new Date('1998-05-17')
			};
			projectCard = new ProjectCard(settings);
			done();
		});

		it('Should have correct id', (done) => {
			expect(projectCard.id).to.be.a('number');
			expect(projectCard.id).to.be.equal(settings.id);
			done();
		});

		it('Should have correct title', (done) => {
			expect(projectCard.title).to.be.a('string');
			expect(projectCard.title).to.be.equal(settings.title);
			done();
		});

		it('Should have correct description', (done) => {
			expect(projectCard.description).to.be.a('string');
			expect(projectCard.description).to.be.equal(settings.description);
			done();
		});

		it('Should have correct startDate', (done) => {
			expect(projectCard.startDate).to.be.a('Date');
			expect(projectCard.startDate).to.be.equal(settings.startDate);
			done();
		});
	});

	context('load all project previews without sorting', () => {
		before((done) => {
			// The data provided from the database
			settings = [
				{
					'id': 1,
					'title': 'project Alpha',
					'description': 'Some lines',
					'date_start': '1998-05-17'
				},
				{
					'id': 2,
					'title': 'project Beta',
					'description': 'Some more lines',
					'date_start': '2010-05-17'
				}
			];

			// Mocking api request.
			projectCardModule.__set__({
				'$': {
					'get': (data) => {
						data.success(settings);
					}
				}
			});

			// Loading all data first and every case should check correct loading
			ProjectCard._loadAll().then((data) => {
				cards = data;
				done();
			});
		});

		it('should load first preview correctly', (done) => {
			expect(cards[0].id).to.be.a('number');
			expect(cards[0].id).to.be.equal(settings[0].id);
			expect(cards[0].title).to.be.a('string');
			expect(cards[0].title).to.be.equal(settings[0].title);
			expect(cards[0].description).to.be.a('string');
			expect(cards[0].description).to.be.equal(settings[0].description);
			expect(cards[0].startDate).to.be.a('Date');
			expect(cards[0].startDate.getTime()).to.be.equal(new Date(settings[0].date_start).getTime());
			done();
		});

		it('should load second preview correctly', (done) => {
			expect(cards[1].id).to.be.a('number');
			expect(cards[1].id).to.be.equal(settings[1].id);
			expect(cards[1].title).to.be.a('string');
			expect(cards[1].title).to.be.equal(settings[1].title);
			expect(cards[1].description).to.be.a('string');
			expect(cards[1].description).to.be.equal(settings[1].description);
			expect(cards[1].startDate).to.be.a('Date');
			expect(cards[1].startDate.getTime()).to.be.equal(new Date(settings[1].date_start).getTime());
			done();
		});
	});

	context('load all project previews with sorting', () => {
		before((done) => {
			// The data provided from the database
			settings = [
				{
					'id': 1,
					'title': 'project Alpha',
					'description': 'Some lines',
					'date_start': '1998-05-17'
				},
				{
					'id': 2,
					'title': 'project Beta',
					'description': 'Some more lines',
					'date_start': '2010-05-17'
				}
			];

			// Mocking api request.
			projectCardModule.__set__({
				'$': {
					'get': (data) => {
						data.success(settings);
					}
				}
			});

			// Loading all data first and every case should check correct loading
			ProjectCard._loadAll(true).then((data) => {
				cards = data;
				done();
			});
		});

		it('should load first preview correctly', (done) => {
			expect(cards[0].id).to.be.a('number');
			expect(cards[0].id).to.be.equal(settings[1].id);
			expect(cards[0].title).to.be.a('string');
			expect(cards[0].title).to.be.equal(settings[1].title);
			expect(cards[0].description).to.be.a('string');
			expect(cards[0].description).to.be.equal(settings[1].description);
			expect(cards[0].startDate).to.be.a('Date');
			expect(cards[0].startDate.getTime()).to.be.equal(new Date(settings[1].date_start).getTime());
			done();
		});

		it('should load second preview correctly', (done) => {
			expect(cards[1].id).to.be.a('number');
			expect(cards[1].id).to.be.equal(settings[0].id);
			expect(cards[1].title).to.be.a('string');
			expect(cards[1].title).to.be.equal(settings[0].title);
			expect(cards[1].description).to.be.a('string');
			expect(cards[1].description).to.be.equal(settings[0].description);
			expect(cards[1].startDate).to.be.a('Date');
			expect(cards[1].startDate.getTime()).to.be.equal(new Date(settings[0].date_start).getTime());
			done();
		});
	});

	context('comparator', () => {
		it('Should compare on date', (done) => {
			// Setup case
			const projectCard1 = new ProjectCard({
				'id': 1,
				'title': 'project Alpha',
				'description': 'Some lines',
				'startDate': new Date('1998-05-17')
			});
			const projectCard2 = new ProjectCard({
				'id': 2,
				'title': 'project Beta',
				'description': 'Some more lines',
				'startDate': new Date('2010-05-17')
			});
			// Should swap positions
			const array1 = [
				projectCard1,
				projectCard2
			].sort(ProjectCard.compare);

			expect(array1[0]).to.be.equal(projectCard2);
			expect(array1[1]).to.be.equal(projectCard1);

			// Should keep positions
			const array2 = [
				projectCard2,
				projectCard1
			].sort(ProjectCard.compare);

			expect(array2[0]).to.be.equal(projectCard2);
			expect(array2[1]).to.be.equal(projectCard1);

			done();
		});

		it('Equality should not swap', (done) => {
			// Setup case
			const projectCard1 = new ProjectCard({
				'id': 1,
				'title': 'project Alpha',
				'description': 'Some lines',
				'startDate': new Date('1998-05-17')
			});
			const projectCard2 = new ProjectCard({
				'id': 2,
				'title': 'project Beta',
				'description': 'Some more lines',
				'startDate': new Date('1998-05-17')
			});
			// Should keep positions
			const array1 = [
				projectCard1,
				projectCard2
			].sort(ProjectCard.compare);

			expect(array1[0]).to.be.equal(projectCard1);
			expect(array1[1]).to.be.equal(projectCard2);

			// Should keep positions
			const array2 = [
				projectCard2,
				projectCard1
			].sort(ProjectCard.compare);

			expect(array2[0]).to.be.equal(projectCard2);
			expect(array2[1]).to.be.equal(projectCard1);

			done();
		});
	});
});

