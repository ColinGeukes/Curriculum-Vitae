function addSkill(parent, skill, stars, extra) {
	$(parent).append('<li><span class="name">' + skill + '</span>' +
		'<span class="score">' +
		'<i class="fas fa-star ' + ((stars >= 1) ? 'filled' : '') + '"></i>' +
		'<i class="fas fa-star ' + ((stars >= 2) ? 'filled' : '') + '"></i>' +
		'<i class="fas fa-star ' + ((stars >= 3) ? 'filled' : '') + '"></i>' +
		'<i class="fas fa-star ' + ((stars >= 4) ? 'filled' : '') + '"></i>' +
		'<i class="fas fa-star ' + ((stars >= 5) ? 'filled' : '') + '"></i>' +
		'</span>' +
		(extra ? '<span class="extra">(' + extra + ')</span>' : '') +
		'</li>')
}

function insertSkillTables(parent, tables, array) {
	// Loop through entire skill array
	for (let i = 0; i < array.length; i++) {
		let table = 1 + Math.floor(i / (array.length / tables));
		addSkill(parent + ':nth-child(' + table + ')', array[i].name, array[i].stars, array[i].extra);
	}
}

// SKILLS = [
// 	new Skill('Java', 5, '10+ years'),
// 	new Skill('JavaScript', 5, '4 years'),
// 	new Skill('Angular', 5, '2 years'),
// 	new Skill('HTML(5)', 5, '4 years'),
// 	new Skill('JSON', 5, '4 years'),
// 	new Skill('Object Oriented Programming', 5),
// 	new Skill('MySQL', 4),
// 	new Skill('Python', 4),
// 	new Skill('JQuery', 4),
// 	new Skill('Command Line Interface', 4),
// 	new Skill('C', 4),
// 	new Skill('C++', 4),
// 	new Skill('Scrum', 4),
// 	new Skill('SASS / SCSS', 4)
// ].sort(Skill.compare);
//
// TOOLS = [
// 	new Skill('Windows', 5, '10+ years'),
// 	new Skill('Linux', 4, '2 years'),
// 	new Skill('Eclipse', 5, '10+ years'),
// 	new Skill('WebStorm', 4, '2 years'),
// 	new Skill('PyCharm', 4, '1 year'),
// 	new Skill('IntelliJ IDEA', 5, '3 years'),
// 	new Skill('Notepad++', 4, '8 years')
// ].sort(Skill.compare);
//
//
// insertSkillTables('#skills ul', 2, SKILLS);
// insertSkillTables('#languages ul', 2, [
// 	new Skill('Dutch', 5, 'Native'),
// 	new Skill('English', 5, 'Proficient')
// ]);
// insertSkillTables('#tools ul', 2, TOOLS);
//

// console.log('abilities', _getAbilities());

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