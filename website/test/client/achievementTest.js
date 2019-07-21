`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The education module
const achievementModule = rewire('../../public/js/achievement.js');
const Achievement = achievementModule.__get__('Achievement');
// Keeping track of testing values.
let settings;
let testObject;

describe('Achievement', () => {
	context('constructor', () => {
		before((done) => {
			settings = {
				'id': 1,
				'title': 'Achievement title',
				'description': 'Achievement description',
				'icon': 'Achievement icon',
				'date': new Date('2001-01-01'),
				'url': 'bing'
			};
			testObject = new Achievement(settings);
			done();
		});

		it('Should have correct id', () => {
			expect(testObject.id).to.be.a('number');
			expect(testObject.id).to.be.equal(settings.id);
		});

		it('Should have correct title', () => {
			expect(testObject.title).to.be.a('string');
			expect(testObject.title).to.be.equal(settings.title);
		});

		it('Should have correct description', () => {
			expect(testObject.description).to.be.a('string');
			expect(testObject.description).to.be.equal(settings.description);
		});

		it('Should have correct icon', () => {
			expect(testObject.icon).to.be.a('string');
			expect(testObject.icon).to.be.equal(settings.icon);
		});

		it('Should have correct date', () => {
			expect(testObject.date).to.be.a('Date');
			expect(testObject.date).to.be.equal(settings.date);
		});

		it('Should have correct url', () => {
			expect(testObject.url).to.be.a('string');
			expect(testObject.url).to.be.equal(settings.url);
		});
	});

	context('comparator', () => {
		before((done) => {
			testObject = [
				new Achievement({
					'id': 1,
					'title': 'Achievement title',
					'description': 'Achievement description',
					'icon': 'Achievement icon',
					'date': new Date('2001-01-01'),
					'url': 'bing'
				}),
				new Achievement({
					'id': 2,
					'title': 'Achievement title 2',
					'description': 'Achievement description 2',
					'icon': 'Achievement icon 2',
					'date': new Date('2001-01-02'),
					'url': 'google'
				}),
				new Achievement({
					'id': 3,
					'title': 'Achievement title 2',
					'description': 'Achievement description 2',
					'icon': 'Achievement icon 2',
					'date': new Date('2001-01-02'),
					'url': 'google'
				})
			];
			done();
		});

		it('Should sort based on date first, with swap', () => {
			const array = [
				testObject[0],
				testObject[1]
			].sort(Achievement.compare);

			// Should be in correct order, latest start date first.
			expect(array[0]).to.be.equal(testObject[1]);
			expect(array[1]).to.be.equal(testObject[0]);
		});


		it('Should sort based on date first, without swap', () => {
			const array = [
				testObject[1],
				testObject[0]
			].sort(Achievement.compare);

			// Should be in correct order, latest start date first.
			expect(array[0]).to.be.equal(testObject[1]);
			expect(array[1]).to.be.equal(testObject[0]);
		});

		it('equal date should not swap', () => {
			let array = [
				testObject[1],
				testObject[2]
			].sort(Achievement.compare);

			// Should be in correct order, latest start date first.
			expect(array[0]).to.be.equal(testObject[1]);
			expect(array[1]).to.be.equal(testObject[2]);

			// Should be in correct order, latest start date first.
			array = [
				testObject[2],
				testObject[1]
			].sort(Achievement.compare);
			expect(array[0]).to.be.equal(testObject[2]);
			expect(array[1]).to.be.equal(testObject[1]);
		});
	});

	context('Load a project', () => {
		before((done) => {
			settings = [
				{
					'id': 1,
					'title': 'Achievement title',
					'description': 'Achievement description',
					'icon': 'Achievement icon',
					'date': '2001-01-01'
				},
				{
					'id': 2,
					'title': 'Pre-Achievement title',
					'description': 'Pre-Achievement description',
					'icon': 'Pre-Achievement icon',
					'date': '1990-01-01'
				}
			];

			achievementModule.__set__({
				'$': {
					'get': (data) => {
						data.success(settings);
					}
				}
			});

			Achievement.loadAll().then((educations) => {
				testObject = educations;
				done();
			});
		});

		it('Load should yield correct values first object', (done) => {
			expect(testObject[0].id).to.be.a('number');
			expect(testObject[0].id).to.be.equal(settings[0].id);
			expect(testObject[0].title).to.be.a('string');
			expect(testObject[0].title).to.be.equal(settings[0].title);
			expect(testObject[0].description).to.be.a('string');
			expect(testObject[0].description).to.be.equal(settings[0].description);
			expect(testObject[0].icon).to.be.a('string');
			expect(testObject[0].icon).to.be.equal(settings[0].icon);
			expect(testObject[0].date).to.be.a('Date');
			expect(testObject[0].date.getTime()).to.be.equal(new Date(settings[0].date).getTime());
			done();
		});

		it('Load should yield correct values second object', (done) => {
			expect(testObject[1].id).to.be.a('number');
			expect(testObject[1].id).to.be.equal(settings[1].id);
			expect(testObject[1].title).to.be.a('string');
			expect(testObject[1].title).to.be.equal(settings[1].title);
			expect(testObject[1].description).to.be.a('string');
			expect(testObject[1].description).to.be.equal(settings[1].description);
			expect(testObject[1].icon).to.be.a('string');
			expect(testObject[1].icon).to.be.equal(settings[1].icon);
			expect(testObject[1].date).to.be.a('Date');
			expect(testObject[1].date.getTime()).to.be.equal(new Date(settings[1].date).getTime());
			done();
		});
	});

	context('Load a project with sorting', () => {
		before((done) => {
			settings = [
				{
					'id': 1,
					'title': 'Achievement title',
					'description': 'Achievement description',
					'icon': 'Achievement icon',
					'date': '2001-01-01'
				},
				{
					'id': 2,
					'title': 'Pre-Achievement title',
					'description': 'Pre-Achievement description',
					'icon': 'Pre-Achievement icon',
					'date': '2010-01-01'
				}
			];

			achievementModule.__set__({
				'$': {
					'get': (data) => {
						data.success(settings);
					}
				}
			});

			Achievement.loadAll(true).then((educations) => {
				testObject = educations;
				done();
			});
		});

		it('Load should yield correct values first object', (done) => {
			expect(testObject[0].id).to.be.a('number');
			expect(testObject[0].id).to.be.equal(settings[1].id);
			expect(testObject[0].title).to.be.a('string');
			expect(testObject[0].title).to.be.equal(settings[1].title);
			expect(testObject[0].description).to.be.a('string');
			expect(testObject[0].description).to.be.equal(settings[1].description);
			expect(testObject[0].icon).to.be.a('string');
			expect(testObject[0].icon).to.be.equal(settings[1].icon);
			expect(testObject[0].date).to.be.a('Date');
			expect(testObject[0].date.getTime()).to.be.equal(new Date(settings[1].date).getTime());
			done();
		});

		it('Load should yield correct values second object', (done) => {
			expect(testObject[1].id).to.be.a('number');
			expect(testObject[1].id).to.be.equal(settings[0].id);
			expect(testObject[1].title).to.be.a('string');
			expect(testObject[1].title).to.be.equal(settings[0].title);
			expect(testObject[1].description).to.be.a('string');
			expect(testObject[1].description).to.be.equal(settings[0].description);
			expect(testObject[1].icon).to.be.a('string');
			expect(testObject[1].icon).to.be.equal(settings[0].icon);
			expect(testObject[1].date).to.be.a('Date');
			expect(testObject[1].date.getTime()).to.be.equal(new Date(settings[0].date).getTime());
			done();
		});
	});
});

