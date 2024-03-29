`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The education module
const educationModule = rewire('../../public/js/education.js');
const Education = educationModule.__get__('Education');
// Keeping track of testing values.
let settings;
let testObject;

describe('Education', () => {
	context('constructor', () => {
		before((done) => {
			settings = {
				'id': 1,
				'name': 'Education name',
				'title': 'Education title',
				'description': 'Education description',
				'icon': 'Education icon',
				'type': 'Education type',
				'dateStart': new Date('2001-01-01'),
				'dateEnd': new Date('2005-01-01'),
				'url': 'bing'
			};
			testObject = new Education(settings);
			done();
		});

		it('Should have correct id', () => {
			expect(testObject.id).to.be.a('number');
			expect(testObject.id).to.be.equal(settings.id);
		});

		it('Should have correct name', () => {
			expect(testObject.name).to.be.a('string');
			expect(testObject.name).to.be.equal(settings.name);
		});

		it('Should have correct title', () => {
			expect(testObject.title).to.be.a('string');
			expect(testObject.title).to.be.equal(settings.title);
		});

		it('Should have correct type', () => {
			expect(testObject.type).to.be.a('string');
			expect(testObject.type).to.be.equal(settings.type);
		});

		it('Should have correct description', () => {
			expect(testObject.description).to.be.a('array');
			expect(testObject.description[0]).to.be.equal(settings.description);
		});

		it('Should have correct icon', () => {
			expect(testObject.icon).to.be.a('string');
			expect(testObject.icon).to.be.equal(settings.icon);
		});

		it('Should have correct startDate', () => {
			expect(testObject.dateStart).to.be.a('Date');
			expect(testObject.dateStart).to.be.equal(settings.dateStart);
		});

		it('Should have correct dateEnd', () => {
			expect(testObject.dateEnd).to.be.a('Date');
			expect(testObject.dateEnd).to.be.equal(settings.dateEnd);
		});

		it('Should have correct url', () => {
			expect(testObject.url).to.be.a('string');
			expect(testObject.url).to.be.equal(settings.url);
		});
	});

	context('comparator', () => {
		before((done) => {
			testObject = [
				new Education({
					'id': 1,
					'name': 'Education name',
					'title': 'Education title',
					'description': 'Education description',
					'icon': 'Education icon',
					'type': 'Education type',
					'dateStart': new Date('2001-01-01'),
					'dateEnd': new Date('2005-01-01'),
					'url': 'bing'
				}),
				new Education({
					'id': 2,
					'name': 'Education name 2',
					'title': 'Education title 2',
					'description': 'Education description 2',
					'icon': 'Education icon 2',
					'type': 'Education type 2',
					'dateStart': new Date('2001-01-02'),
					'dateEnd': new Date('2005-01-02'),
					'url': 'google'
				}),
				new Education({
					'id': 3,
					'name': 'Education name 2',
					'title': 'Education title 2',
					'description': 'Education description 2',
					'icon': 'Education icon 2',
					'type': 'Education type 2',
					'dateStart': new Date('2001-01-02'),
					'dateEnd': new Date('2005-01-02'),
					'url': 'google'
				})
			];
			done();
		});

		it('Should sort based on date first, with swap', () => {
			const array = [
				testObject[0],
				testObject[1]
			].sort(Education.compare);

			// Should be in correct order, latest start date first.
			expect(array[0]).to.be.equal(testObject[1]);
			expect(array[1]).to.be.equal(testObject[0]);
		});


		it('Should sort based on date first, without swap', () => {
			const array = [
				testObject[1],
				testObject[0]
			].sort(Education.compare);

			// Should be in correct order, latest start date first.
			expect(array[0]).to.be.equal(testObject[1]);
			expect(array[1]).to.be.equal(testObject[0]);
		});

		it('equal date should not swap', () => {
			let array = [
				testObject[1],
				testObject[2]
			].sort(Education.compare);

			// Should be in correct order, latest start date first.
			expect(array[0]).to.be.equal(testObject[1]);
			expect(array[1]).to.be.equal(testObject[2]);

			// Should be in correct order, latest start date first.
			array = [
				testObject[2],
				testObject[1]
			].sort(Education.compare);
			expect(array[0]).to.be.equal(testObject[2]);
			expect(array[1]).to.be.equal(testObject[1]);
		});
	});

	context('Load a project', () => {
		before((done) => {
			settings = [
				{
					'id': 1,
					'name': 'Education name',
					'title': 'Education title',
					'type': 'Education type',
					'description': 'Education description',
					'icon': 'Education icon',
					'date_start': '2001-01-01',
					'date_end': '2005-01-01'
				},
				{
					'id': 2,
					'name': 'Pre-Education name',
					'title': 'Pre-Education title',
					'type': 'Pre-Education type',
					'description': 'Pre-Education description',
					'icon': 'Pre-Education icon',
					'date_start': '1990-01-01',
					'date_end': null
				}
			];

			educationModule.__set__({
				'$': {
					'get': (data) => {
						data.success(settings);
					}
				}
			});

			Education.loadAll().then((educations) => {
				testObject = educations;
				done();
			});
		});

		it('Load should yield correct values first object', (done) => {
			expect(testObject[0].id).to.be.a('number');
			expect(testObject[0].id).to.be.equal(settings[0].id);
			expect(testObject[0].name).to.be.a('string');
			expect(testObject[0].name).to.be.equal(settings[0].name);
			expect(testObject[0].type).to.be.a('string');
			expect(testObject[0].type).to.be.equal(settings[0].type);
			expect(testObject[0].title).to.be.a('string');
			expect(testObject[0].title).to.be.equal(settings[0].title);
			expect(testObject[0].description).to.be.a('array');
			expect(testObject[0].description[0]).to.be.equal(settings[0].description);
			expect(testObject[0].icon).to.be.a('string');
			expect(testObject[0].icon).to.be.equal(settings[0].icon);
			expect(testObject[0].dateStart).to.be.a('Date');
			expect(testObject[0].dateStart.getTime()).to.be.equal(new Date(settings[0].date_start).getTime());
			expect(testObject[0].dateEnd).to.be.a('Date');
			expect(testObject[0].dateEnd.getTime()).to.be.equal(new Date(settings[0].date_end).getTime());
			done();
		});

		it('Load should yield correct values second object', (done) => {
			expect(testObject[1].id).to.be.a('number');
			expect(testObject[1].id).to.be.equal(settings[1].id);
			expect(testObject[1].name).to.be.a('string');
			expect(testObject[1].name).to.be.equal(settings[1].name);
			expect(testObject[1].type).to.be.a('string');
			expect(testObject[1].type).to.be.equal(settings[1].type);
			expect(testObject[1].title).to.be.a('string');
			expect(testObject[1].title).to.be.equal(settings[1].title);
			expect(testObject[1].description).to.be.a('array');
			expect(testObject[1].description[0]).to.be.equal(settings[1].description);
			expect(testObject[1].icon).to.be.a('string');
			expect(testObject[1].icon).to.be.equal(settings[1].icon);
			expect(testObject[1].dateStart).to.be.a('Date');
			expect(testObject[1].dateStart.getTime()).to.be.equal(new Date(settings[1].date_start).getTime());
			expect(testObject[1].dateEnd).to.be.equal(null);
			done();
		});
	});

	context('Load a project with sorting', () => {
		before((done) => {
			settings = [
				{
					'id': 1,
					'name': 'Education name',
					'title': 'Education title',
					'type': 'Education type',
					'description': 'Education description',
					'icon': 'Education icon',
					'date_start': '2001-01-01',
					'date_end': '1995-01-01'
				},
				{
					'id': 2,
					'name': 'Pre-Education name',
					'title': 'Pre-Education title',
					'type': 'Pre-Education type',
					'description': 'Pre-Education description',
					'icon': 'Pre-Education icon',
					'date_start': '2010-01-01',
					'date_end': null
				}
			];

			educationModule.__set__({
				'$': {
					'get': (data) => {
						data.success(settings);
					}
				}
			});

			Education.loadAll(true).then((educations) => {
				testObject = educations;
				done();
			});
		});

		it('Load should yield correct values first object', (done) => {
			expect(testObject[0].id).to.be.a('number');
			expect(testObject[0].id).to.be.equal(settings[1].id);
			expect(testObject[0].name).to.be.a('string');
			expect(testObject[0].name).to.be.equal(settings[1].name);
			expect(testObject[0].type).to.be.a('string');
			expect(testObject[0].type).to.be.equal(settings[1].type);
			expect(testObject[0].title).to.be.a('string');
			expect(testObject[0].title).to.be.equal(settings[1].title);
			expect(testObject[0].description).to.be.a('array');
			expect(testObject[0].description[0]).to.be.equal(settings[1].description);
			expect(testObject[0].icon).to.be.a('string');
			expect(testObject[0].icon).to.be.equal(settings[1].icon);
			expect(testObject[0].dateStart).to.be.a('Date');
			expect(testObject[0].dateStart.getTime()).to.be.equal(new Date(settings[1].date_start).getTime());
			expect(testObject[0].dateEnd).to.be.equal(null);
			done();
		});

		it('Load should yield correct values second object', (done) => {
			expect(testObject[1].id).to.be.a('number');
			expect(testObject[1].id).to.be.equal(settings[0].id);
			expect(testObject[1].name).to.be.a('string');
			expect(testObject[1].name).to.be.equal(settings[0].name);
			expect(testObject[1].type).to.be.a('string');
			expect(testObject[1].type).to.be.equal(settings[0].type);
			expect(testObject[1].title).to.be.a('string');
			expect(testObject[1].title).to.be.equal(settings[0].title);
			expect(testObject[1].description).to.be.a('array');
			expect(testObject[1].description[0]).to.be.equal(settings[0].description);
			expect(testObject[1].icon).to.be.a('string');
			expect(testObject[1].icon).to.be.equal(settings[0].icon);
			expect(testObject[1].dateStart).to.be.a('Date');
			expect(testObject[1].dateStart.getTime()).to.be.equal(new Date(settings[0].date_start).getTime());
			expect(testObject[1].dateEnd).to.be.a('Date');
			expect(testObject[1].dateEnd.getTime()).to.be.equal(new Date(settings[0].date_end).getTime());
			done();
		});
	});
});

