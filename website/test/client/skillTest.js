`use strict`;

const chai = require('chai');
const {expect} = chai;
const rewire = require('rewire');
// The skill module
const skillModule = rewire('../../public/js/skill.js');
const Skill = skillModule.__get__('Skill');
// The skills
let extra;
let name;
let skill;
let stars;

describe('Skill', () => {
	context('constructor', () => {
		beforeEach((done) => {
			name = 'Java';
			stars = 5;
			extra = '11+ years';
			skill = new Skill(name, stars, extra);
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

	context('comparator', () => {
		it('Sorting based on stars', (done) => {
			const skill1 = new Skill('a', 5);
			const skill2 = new Skill('b', 3);
			const skill3 = new Skill('c', 4);
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
			const skill1 = new Skill('c', 3);
			const skill2 = new Skill('a', 3);
			const skill3 = new Skill('b', 3);
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
			const skill1 = new Skill('a', 3, 'extra_1');
			const skill2 = new Skill('a', 3, 'extra_2');
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

