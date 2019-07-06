// Which project preview should be displayed
let projectPreviewPointer = 0;

/**
 * Method to add an ability skill to the page
 * @param parent - where the skill should be added
 * @param {Skill}skill - the skill object that should be added
 */
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
 * Method that updates the project previewer.
 * @param {number} value - how much the pointer should be changing.
 */
function updateProjectPreview(value = 0) {
	/**
	 * Method to get the amount of displays that should be visible;
	 * @return {number}
	 */
	function getDisplayAmount() {
		const width = $(window).width();

		if (width >= 978) {
			return 3;
		} else if (width >= 754) {
			return 2;
		}
		return 1;
	}

	const cards = $('#projects .cards > .row').children();
	const cardsAmount = cards.length;

	projectPreviewPointer = ((projectPreviewPointer + value) % cardsAmount + cardsAmount) % cardsAmount;

	const displayAmount = getDisplayAmount();

	cards.each(function eachCard(index) {
		const card = $(this);

		if (index >= projectPreviewPointer && index < projectPreviewPointer + displayAmount) {
			card.removeClass("fully-hidden");
			card.css("order", 0);
		} else if (projectPreviewPointer + displayAmount - index > cardsAmount) {
			card.removeClass("fully-hidden");
			card.css("order", `${1 + index}`);
		} else {
			$(this).addClass("fully-hidden");
		}
	});
}

/*
 * Function createTimelineComponent(){
 *
 * }
 */

/**
 * Method to load everything from the page that is connected to external sources.
 * @returns {void}
 */
function loadAll() {
	function getYearDifference(dateStart, dateEnd) {
		const yearA = dateStart.getFullYear();

		// End date not known yet.

		if (!dateEnd) {
			return `${yearA} - ...`;
		}
		const yearB = dateEnd.getFullYear();

		// Date year is equal, thus do not display  a period of years
		if (yearA === yearB) {
			return `${yearA}`;
		}

		// Date year is unequal, thus display a period of years.
		return `${yearA} - ${yearB}`;
	}

	// Load education types.
	Education.loadAll().then((educations) => {
		educations.forEach((education) => {
			$('#education .main-timeline').append(`<div class="timeline">
			<a href="/education/${education.id}" class="timeline-content">
			<div class="timeline-year-tag">
				<div class="timeline-year-outer">
					<span class="timeline-year">${getYearDifference(education.dateStart, education.dateEnd)}</span>
				</div>
				<div class="timeline-icon-outer">
					<div class="timeline-icon"><i class="${education.icon}" aria-hidden="true"></i></div>
				</div>
			</div>
			<div class="content"><h3 class="title">${education.name}</h3>
			<p class="description">${education.description}</p></div></a></div>`);
		});


		/*
		 * Div(class="timeline")
		 * a(href="#" class="timeline-content")
		 * span(class="timeline-year") 2018
		 * div(class="timeline-icon")
		 * i(class="fa fa-rocket" aria-hidden="true")
		 * div(class="content")
		 * h3(class="title") Web Development
		 * p(class="description") Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
		 */
	});

	// Load all the skills.
	Skill._loadSkills(true).then((data) => {
		let first = true;
		const abilitiesContentElement = $('#abilities .inner-content');

		$.each(data, (key, skillType) => {
			// Add a row index.
			if (!first) {
				abilitiesContentElement.append('<hr>');
			}

			// Add the skill.
			abilitiesContentElement.append(`<h2>${key}</h2><div id="${key}" class="row">
				<ul class="row-2 no-bullets scores"></ul><ul class="row-2 no-bullets scores"></ul></div>`);
			insertSkillTables(`#${key} ul`, 2, skillType.skills);
			first = false;
		});
	});

	// Load all project previews.
	ProjectCard._loadAll(true).then((data) => {
		/**
		 * Method to add a project preview to the DOM.
		 * @param projectPreview
		 */
		function htmlProjectPreview(projectPreview) {
			const textField = `<div class="text"><h1>${projectPreview.title}</h1><p>${projectPreview.description}</p></div>`;
			const imageField = `<div class="image"><img alt="${projectPreview.title} thumbnail" src="/img/projects/${projectPreview.id}/thumbnail.png"></div>`;

			$('#projects .content .cards > .row').append(`<div class="row-flex"><a class="card" href="/project/${projectPreview.id}">${imageField}${textField}</a></div>`);
		}

		for (let i = 0; i < data.length; i++) {
			htmlProjectPreview(data[i]);
		}

		updateProjectPreview();
	});

	// Give the preview buttons an onclick event.
	$('#projects .button-left').click(() => {
		updateProjectPreview(-1);
	});

	$('#projects .button-right').click(() => {
		updateProjectPreview(1);
	});
}

$(document).ready(() => {
	loadAll();
});

// Handle different screen sizes
$(window).resize(() => {
	updateProjectPreview();
});

