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

SKILLS = [
	new Skill('Java', 5, '10+ years'),
	new Skill('JavaScript', 5, '4 years'),
	new Skill('Angular', 5, '2 years'),
	new Skill('HTML(5)', 5, '4 years'),
	new Skill('JSON', 5, '4 years'),
	new Skill('Object Oriented Programming', 5),
	new Skill('MySQL', 4),
	new Skill('Python', 4),
	new Skill('JQuery', 4),
	new Skill('Command Line Interface', 4),
	new Skill('C', 4),
	new Skill('C++', 4),
	new Skill('Scrum', 4),
	new Skill('SASS / SCSS', 4)
].sort(Skill.compare);

TOOLS = [
	new Skill('Windows', 5, '10+ years'),
	new Skill('Linux', 4, '2 years'),
	new Skill('Eclipse', 5, '10+ years'),
	new Skill('WebStorm', 4, '2 years'),
	new Skill('PyCharm', 4, '1 year'),
	new Skill('IntelliJ IDEA', 5, '3 years'),
	new Skill('Notepad++', 4, '8 years')
].sort(Skill.compare);


insertSkillTables('#skills ul', 2, SKILLS);
insertSkillTables('#languages ul', 2, [
	new Skill('Dutch', 5, 'Native'),
	new Skill('English', 5, 'Proficient')
]);
insertSkillTables('#tools ul', 2, TOOLS);

// const LOGO_NAV_TRANSITION = '1.5s';
// const SKILL_PROGRESS_BARS = [];
// const PERSONAL_SKILLS = ['problem solving', 'self-management', 'agile scrum meetings', 'imagination', 'respect', 'listening', 'coopertaion', 'negotiating', 'self-motivation', 'curiosity', 'commitment', 'teamwork', 'patience', 'self-starter', 'focus'].sort();
//
// function createSkillProgressBars() {
// 	const skillElement = $('#skills .skill-list');
// 	let i = 0;
//
// 	function createSkill(name, percentage) {
// 		// Create the skill card
// 		skillElement.append('<div id="skill-' + i.toString() + '" class="skill"><h2>' + name + '</h2></div>');
//
// 		// Create the progress bar of the skill.
// 		SKILL_PROGRESS_BARS.push(new ProgressBar('#skill-' + i.toString(), percentage, 0,
// 			ProgressBar.textProgression,
// 			ProgressBar.gradiantColor(247, 136, 136, 243, 210, 80)));
// 		i++;
// 	}
//
// 	createSkill('java', 100);
// 	createSkill('html/css', 90);
// 	createSkill('javascript', 80);
// 	createSkill('python', 80);
// 	createSkill('sql', 80);
// 	createSkill('c', 70);
// 	createSkill('c++', 70);
// }
//
// function createPlatforms() {
// 	const libraryListElement = $('#platforms #library-list.list');
// 	const platformListElement = $('#platforms #platform-list.list');
//
// 	function createSkill(listElement, name, percentage) {
// 		// Create the skill card
// 		listElement.append('<div><h2>' + name + '</h2><div class="meter"><span style="width: calc(' + percentage + '% - 12px)">' + percentage + '%</span></div></div>');
// 		// div
// 		// h2 NPM
// 		// div(class="meter")
// 		// span(style="width: 25%")
//
//
// 		// // Create the progress bar of the skill.
// 		// SKILL_PROGRESS_BARS.push(new ProgressBar('#skill-' + i.toString(), percentage, 0,
// 		// 	ProgressBar.textProgression,
// 		// 	ProgressBar.gradiantColor(247, 136, 136, 243, 210, 80)));
// 		// i++;
// 	}
//
// 	createSkill(libraryListElement, 'NPM', 90);
// 	createSkill(libraryListElement, 'Git', 90);
// 	createSkill(libraryListElement, 'Angular', 80);
// 	createSkill(libraryListElement, 'API', 80);
// 	createSkill(libraryListElement, 'LibGDX', 90);
// 	createSkill(libraryListElement, 'Swing', 80);
//
// 	createSkill(platformListElement, 'Linux', 90);
// 	createSkill(platformListElement, 'Windows', 90);
// }
//
// function createPersonalSkills() {
// 	for (let i = 0; i < PERSONAL_SKILLS.length; i++) {
// 		$('#personal-skills .list').append('<p>' + PERSONAL_SKILLS[i] + '</p>')
// 	}
// }
//
// function startProgressBars() {
// 	$('#skills .skill').each(function (index) {
// 		SKILL_PROGRESS_BARS[index].start();
// 	});
// }
//
// $(document).ready(function () {
// 	const landingPage = $('#landing-page');
// 	const content = $('#content');
// 	const nav = $('nav');
//
// 	// Create all the skills.
// 	createSkillProgressBars();
// 	createPersonalSkills();
// 	createPlatforms();
//
// 	// Clicking on the welcome page will.
// 	landingPage.click(function () {
// 		// console.log('clicked')
// 		landingPage.css('transition', LOGO_NAV_TRANSITION);
// 		landingPage.css('height', '157px');
// 		landingPage.css('cursor', 'default');
// 		$('#landing-page .container').css('margin', '0 auto');
// 		$('#bubble-welcome').hide();
// 		content.css('transition', LOGO_NAV_TRANSITION);
// 		content.css('margin-top', '85px');
// 		content.css('visibility', 'visible');
// 		nav.css('transition', LOGO_NAV_TRANSITION);
// 		nav.css('top', '0');
//
// 		setTimeout(function () {
// 			$('nav .nav-icon').css('opacity', '1');
// 			landingPage.css('transition', '0s');
// 			nav.css('transition', '0s');
// 			content.css('transition', '0s');
//
// 			// Start playing all progress.
// 			startProgressBars();
// 		}, 850)
// 	});
// });