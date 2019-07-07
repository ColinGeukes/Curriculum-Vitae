`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The skill module
const skillModule = rewire('../../public/js/skill.js');
const Skill = skillModule.__get__('Skill');
// The skills
let skill;
let extra;
let name;
let stars;
let date;

describe('Skill', () => {
	context('constructor', () => {
		beforeEach((done) => {
			name = 'Java';
			stars = 5;
			extra = 'native';
			date = new Date();
			skill = new Skill({
				name,
				stars,
				extra,
				'startDate': date
			});
			done();
		});

		it('Should have correct name', (done) => {
			expect(skill.name).to.be.equal(name);
			done();
		});

		it('Should have correct amount of stars', (done) => {
			expect(skill.stars).to.be.equal(stars);
			done();
		});

		it('Should have correct extra field', (done) => {
			expect(skill.extra).to.be.equal(extra);
			done();
		});
	});

	context('correct subtext', () => {
		it('Low experience', (done) => {
			skill = new Skill({
				name,
				stars,
				'startDate': new Date()
			});

			// Assertion
			expect(skill.subtext).to.be.a('string');
			expect(skill.subtext).to.be.equal(`1 year`);
			done();
		});

		it('Normal experience', (done) => {
			// Create the skill
			const yearsExperience = 5;

			date = new Date();

			date.setTime(date.getTime() - yearsExperience * skillModule.__get__('MILLISECONDS_PER_YEAR'));
			skill = new Skill({
				name,
				stars,
				'startDate': date
			});

			// Assertion
			expect(skill.subtext).to.be.a('string');
			expect(skill.subtext).to.be.equal(`${Math.ceil(yearsExperience)} years`);
			done();
		});

		it('High experience', (done) => {
			// Create the skill
			const yearsExperience = skillModule.__get__('MAX_EXPERIENCE_YEARS');

			date = new Date();

			date.setFullYear(date.getFullYear() - yearsExperience);
			skill = new Skill({
				name,
				stars,
				'startDate': date
			});

			// Assertion
			expect(skill.subtext).to.be.a('string');
			expect(skill.subtext).to.be.equal(`${yearsExperience}+ years`);
			done();
		});
	});

	context('comparator', () => {
		it('Sorting based on stars', (done) => {
			const skill1 = new Skill({
				'name': 'a',
				'stars': 5
			});
			const skill2 = new Skill({
				'name': 'b',
				'stars': 3
			});
			const skill3 = new Skill({
				'name': 'c',
				'stars': 4
			});
			const array = [
				skill1,
				skill2,
				skill3
			].sort(Skill.compare);

			// Check equalities.
			expect(array[0]).to.be.equal(skill1);
			expect(array[1]).to.be.equal(skill3);
			expect(array[2]).to.be.equal(skill2);
			done();
		});

		it('Sorting based on name', (done) => {
			const skill1 = new Skill({
				'name': 'c',
				'stars': 3
			});
			const skill2 = new Skill({
				'name': 'a',
				'stars': 3
			});
			const skill3 = new Skill({
				'name': 'b',
				'stars': 3
			});
			const array = [
				skill1,
				skill2,
				skill3
			].sort(Skill.compare);

			// Check equalities.
			expect(array[0]).to.be.equal(skill2);
			expect(array[1]).to.be.equal(skill3);
			expect(array[2]).to.be.equal(skill1);
			done();
		});

		it('Sorting based on equality, no change', (done) => {
			const skill1 = new Skill({
				'name': 'a',
				'stars': 5,
				'extra': 'extra_1'
			});
			const skill2 = new Skill({
				'name': 'a',
				'stars': 5,
				'extra': 'extra_2'
			});
			const array = [
				skill1,
				skill2
			].sort(Skill.compare);

			// Check equalities.
			expect(array[0].extra).to.be.equal('extra_1');
			expect(array[1].extra).to.be.equal('extra_2');
			done();
		});
	});
});

