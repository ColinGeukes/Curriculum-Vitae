`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The project ability module
const projectAbilityModule = rewire('../../../../public/js/views/project/projectAbility.js');
const ProjectAbility = projectAbilityModule.__get__('ProjectAbility');
// The project properties
let projectAbilitySettings;
let projectAbility;

describe('ProjectAbility', () => {
	context('constructor', () => {
		before((done) => {
			projectAbilitySettings = {
				'id': 1,
				'type': 3,
				'title': 'tag_title'
			};

			projectAbility = new ProjectAbility(projectAbilitySettings);
			done();
		});

		it('Should have correct id', (done) => {
			expect(projectAbility.id).to.be.a('number');
			expect(projectAbility.id).to.be.equal(projectAbilitySettings.id);
			done();
		});

		it('Should have correct type', (done) => {
			expect(projectAbility.type).to.be.a('number');
			expect(projectAbility.type).to.be.equal(projectAbilitySettings.type);
			done();
		});

		it('Should have correct title', (done) => {
			expect(projectAbility.title).to.be.a('string');
			expect(projectAbility.title).to.be.equal(projectAbilitySettings.title);
			done();
		});
	});


	context('comparator', () => {
		it('Compare based on type', (done) => {
			// Create the case
			const tag1 = new ProjectAbility({
				'id': 1,
				'type': 3,
				'title': 'tag_title'
			});
			const tag2 = new ProjectAbility({
				'id': 1,
				'type': 1,
				'title': 'tag_title'
			});
			// Should swap
			const tags = [
				tag1,
				tag2
			].sort(ProjectAbility.compare);

			expect(tags[0]).to.be.equal(tag2);
			expect(tags[1]).to.be.equal(tag1);

			// Should not swap
			const tags2 = [
				tag2,
				tag1
			].sort(ProjectAbility.compare);

			expect(tags2[0]).to.be.equal(tag2);
			expect(tags2[1]).to.be.equal(tag1);

			done();
		});

		it('Compare based on title', (done) => {
			// Create the case
			const tag1 = new ProjectAbility({
				'id': 1,
				'type': 2,
				'title': 'abbb'
			});
			const tag2 = new ProjectAbility({
				'id': 1,
				'type': 2,
				'title': 'abba'
			});
			// Should swap
			const tags = [
				tag1,
				tag2
			].sort(ProjectAbility.compare);

			expect(tags[0]).to.be.equal(tag2);
			expect(tags[1]).to.be.equal(tag1);

			// Should not swap
			const tags2 = [
				tag2,
				tag1
			].sort(ProjectAbility.compare);

			expect(tags2[0]).to.be.equal(tag2);
			expect(tags2[1]).to.be.equal(tag1);

			done();
		});

		it('Compare equality remain the same', (done) => {
			// Create the case
			const tag1 = new ProjectAbility({
				'id': 1,
				'type': 2,
				'title': 'equality'
			});
			const tag2 = new ProjectAbility({
				'id': 1,
				'type': 2,
				'title': 'equality'
			});
			// Should not swap
			const tags = [
				tag1,
				tag2
			].sort(ProjectAbility.compare);

			expect(tags[0]).to.be.equal(tag1);
			expect(tags[1]).to.be.equal(tag2);

			// Should not swap
			const tags2 = [
				tag2,
				tag1
			].sort(ProjectAbility.compare);

			expect(tags2[0]).to.be.equal(tag2);
			expect(tags2[1]).to.be.equal(tag1);

			done();
		});
	});
});

