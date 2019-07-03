function addSkill(parent, skill, stars, extra) {
	/**
	 * Method to create the star span
	 * @param {number} amount - The number of stars that should be filled
	 * @param {number} total - The total number of stars in the span.
	 * @returns {string} span with all the (filled) stars.
	 */
	function createStarsField(amount, total) {
		/**
		 * Method to create a (filled) star
		 * @param {boolean} filled - If the star should be filled
		 * @returns {string} html representation of a (filled) star.
		 */
		function createStar(filled) {
			// Return a filled star
			if (filled) {
				return '<i class="fas fa-star filled"></i>';
			}
			return '<i class="fas fa-star"></i>';
		}

		// Open the span tag.
		let ret = '<span class="score">';

		for (let i = 1; i <= total; i++) {
			ret += createStar(amount >= i);
		}

		// Close the span tag and return the result.
		return `${ret}</span>`;
	}


	function extraField(text) {
		if (text) {
			return `<span class="extra">(${extra})</span>`;
		}
		return '';
	}

	$(parent).append(`<li><span class="name">${skill}</span>
		${createStarsField(stars, 5)}
		${extraField(extra)}</li>`);
}

function insertSkillTables(parent, tables, array) {
	// Loop through entire skill array
	for (let i = 0; i < array.length; i++) {
		const table = 1 + Math.floor(i / (array.length / tables));

		addSkill(`${parent}:nth-child(${table})`, array[i].name, array[i].stars, array[i].extra);
	}
}

/*
 * SKILLS = [
 * 	new Skill('Java', 5, '10+ years'),
 * 	new Skill('JavaScript', 5, '4 years'),
 * 	new Skill('Angular', 5, '2 years'),
 * 	new Skill('HTML(5)', 5, '4 years'),
 * 	new Skill('JSON', 5, '4 years'),
 * 	new Skill('Object Oriented Programming', 5),
 * 	new Skill('MySQL', 4),
 * 	new Skill('Python', 4),
 * 	new Skill('JQuery', 4),
 * 	new Skill('Command Line Interface', 4),
 * 	new Skill('C', 4),
 * 	new Skill('C++', 4),
 * 	new Skill('Scrum', 4),
 * 	new Skill('SASS / SCSS', 4)
 * 	new Skill('LibGDX', 5, '7 years')
 */

/*
 *
 * TOOLS = [
 * 	New Skill('Windows', 5, '10+ years'),
 * 	New Skill('Linux', 4, '2 years'),
 * 	New Skill('Eclipse', 5, '10+ years'),
 * 	New Skill('WebStorm', 4, '2 years'),
 * 	New Skill('PyCharm', 4, '1 year'),
 * 	New Skill('IntelliJ IDEA', 5, '3 years'),
 * 	New Skill('Notepad++', 4, '8 years')
 * ].sort(Skill.compare);
 *
 *
 * InsertSkillTables('#skills ul', 2, SKILLS);
 * InsertSkillTables('#languages ul', 2, [
 * 	New Skill('Dutch', 5, 'Native'),
 * 	New Skill('English', 5, 'Proficient')
 * ]);
 * InsertSkillTables('#tools ul', 2, TOOLS);
 *
 */

// Console.log('abilities', _getAbilities());

/**
 * Method to load all abilities and display them.
 * @returns {Promise<void>}
 */
async function loadAll() {
	data = await Skill._loadSkills(true);

	insertSkillTables('#skills ul', 2, data[0].skills);
	insertSkillTables('#languages ul', 2, data[1].skills);
	insertSkillTables('#tools ul', 2, data[2].skills);
}

loadAll();
