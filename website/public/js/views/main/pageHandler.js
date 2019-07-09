// Which project preview should be displayed
let projectGallery;

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

	// Load educations.
	Education.loadAll(true).then((educations) => {
		educations.forEach((education) => {
			// Add filler classes to the experience so the colour-schema passes correctly to the next section.
			$('#experiences .main-timeline').prepend(`<div class="fully-hidden"></div>`);

			// Add the education to the education timeline.
			$('#education .main-timeline').append(`<div class="timeline">
				<a href="${education.url}" class="timeline-content">
					<div class="timeline-year-tag">
						<div class="timeline-icon"><i class="${education.icon}" aria-hidden="true"></i></div>
						<span class="timeline-year">${getYearDifference(education.dateStart, education.dateEnd)}</span>
					</div>
					<div class="content">
						<h3 class="title">${education.name}</h3>
						<h4 class="subtitle">${education.title}</h4>
						<p class="description">${education.description}</p>
					</div>
				</a>
			</div>`);
		});

		// Make sure the selected nav is still the correct one.
		scrollUpdate();
	});

	// Load experiences.
	Experience.loadAll(true).then((experiences) => {
		experiences.forEach((experience) => {
			$('#experiences .main-timeline').append(`<div class="timeline">
				<a href="${experience.url}" class="timeline-content">
					<div class="timeline-year-tag">
						<div class="timeline-icon"><i class="${experience.icon}" aria-hidden="true"></i></div>
						<span class="timeline-year">${getYearDifference(experience.dateStart, experience.dateEnd)}</span>
					</div>
					<div class="content">
						<h3 class="title">${experience.name}</h3>
						<h4 class="subtitle">${experience.title}</h4>
						<p class="description">${experience.description}</p>
					</div>
				</a>
			</div>`);
		});

		// Make sure the selected nav is still the correct one.
		scrollUpdate();
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

		// Make sure the selected nav is still the correct one.
		scrollUpdate();
	});

	// Load all project previews inside a Gallery.
	ProjectCard._loadAll(true).then((data) => {
		projectGallery = new Gallery({
			'element': $('#projects .project-gallery'),
			'featuring': data,
			'itemHTML': (item) => `
					<div class="image">
						<img alt="${item.title} thumbnail" src="/img/projects/${item.id}/thumbnail.png">
					</div>
					<div class="text">
						<h1>${item.title}</h1>
						<p>${item.description}</p>
					</div>`,
			'itemURL': (item) => `/project/${item.id}`,
			'displayAmount': (width) => 1 + Math.floor((width - 150) / 300)
		});

		// Make sure the selected nav is still the correct one.
		scrollUpdate();
	});
}

/**
 * Main onResize method that handles all resize effects.
 */
function onResize() {
	if (projectGallery) {
		projectGallery.onResize();
	}
}

/**
 * Method to initialise everything of this page handler.
 * Should be called in a script in the html file.
 * Calling function right away does not work for testing purposes.
 */
function initPageHandler() {
	// Do events when the document is ready.
	$(document).ready(() => {
		loadAll();
		scrollUpdate();
	});

	// Handle different screen sizes
	$(window).resize(() => {
		onResize();
	});

	// Handle all scroll events of this page.
	$(window).scroll(() => {
		scrollUpdate();
	});
}

