function addSkill(parent, skill) {
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

	/**
	 * Method to create the subtext field.
	 * This field is visible if the user hovers over the element.
	 * @param {string} text - the subtext that should be displayed.
	 * @return {string} a html representation of the subtext.
	 */
	function extraField(text) {
		if (text) {
			return `<span class="extra">(${text})</span>`;
		}
		return '';
	}

	$(parent).append(`<li><span class="name">${skill.name}</span>
		${createStarsField(skill.stars, 5)}
		${extraField(skill.subtext)}</li>`);
}

function insertSkillTables(parent, tables, array) {
	// Loop through entire skill array
	for (let i = 0; i < array.length; i++) {
		const table = 1 + Math.floor(i / (array.length / tables));

		addSkill(`${parent}:nth-child(${table})`, array[i]);
	}
}

/**
 * Method to load all abilities and display them.
 * @returns {Promise<void>}
 */
async function loadAll() {
	const data = await Skill._loadSkills(true);

	insertSkillTables('#skills ul', 2, data[0].skills);
	insertSkillTables('#languages ul', 2, data[1].skills);
	insertSkillTables('#tools ul', 2, data[2].skills);
}

let projectPreviewPointer = 0;
let displayAmount = 3;

function updateProjectPreview(value = 0) {
	const cards = $('#projects .cards > .row').children();
	const cardsAmount = cards.length;

	projectPreviewPointer = ((projectPreviewPointer + value) % cardsAmount + cardsAmount) % cardsAmount;

	// Console.log('UPDATING');

	cards.each((index) => {
		const card = $(this);

		if (index >= projectPreviewPointer && index < projectPreviewPointer + displayAmount) {
			card.removeClass("hidden");
			card.css("order", 0);
		} else if (projectPreviewPointer + displayAmount - index > cardsAmount) {
			card.removeClass("hidden");
			card.css("order", `${1 + index}`);
		} else {
			card.addClass("hidden");
		}
	});
}

async function loadAllProjectPreviews() {
	const data = await ProjectCard._loadAll(true);

	function htmlProjectPreview(projectPreview) {
		const textField = `<div class="text"><h1>${projectPreview.title}</h1><p>${projectPreview.description}</p></div>`;
		const imageField = `<div class="image"><img alt="${projectPreview.title} thumbnail" src="/img/projects/${projectPreview.id}/thumbnail.png"></div>`;

		$('#projects .content .cards > .row').append(`<div class="row-flex"><a class="card" href="/project/${projectPreview.id}">${imageField}${textField}</a></div>`);
	}

	for (let i = 0; i < data.length; i++) {
		htmlProjectPreview(data[i]);
	}

	updateProjectPreview();
}

function resizeResponsive() {
	const width = $(window).width();

	// Updates the amount of project previews visible.
	if (width >= 978) {
		displayAmount = 3;
	} else if (width >= 754) {
		displayAmount = 2;
	} else {
		displayAmount = 1;
	}
}


resizeResponsive();

$(document).ready(() => {
	loadAll();
	loadAllProjectPreviews();

	$('#projects .button-left').click(() => {
		updateProjectPreview(-1);
	});

	$('#projects .button-right').click(() => {
		updateProjectPreview(1);
	});
});

// Handle different screen sizes
$(window).resize(() => {
	resizeResponsive();
	updateProjectPreview();
});

