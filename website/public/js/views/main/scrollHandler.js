const LAST_SECTION_SCROLL_NAV_SELECT_DIFF = 10;
const SCROLLED_INTO_VIEW_FACTOR = 0.2;

/**
 * Method that checks if the element has been scrolled into view.
 * @param element - the element you want to check for scrolling into view.
 * @return {boolean} - true if scrolled into view, false otherwise
 */
function isScrolledIntoView(element) {
	// Declare variable for top of viewport
	const topViewPort = $(window).scrollTop();
	// Declare variable for bottom of viewport
	const botViewPort = topViewPort + $(window).height();
	// Declare Bot = Top + viewport
	const topOfElement = element.offset().top;
	// Get coordinates of element relative to the document.
	const botOfElement = topOfElement + element.height();
	// Calculate the height of screen with factor applied that enables the scroll in effect.
	const heightDiff = $(window).height() * SCROLLED_INTO_VIEW_FACTOR;

	return topOfElement <= botViewPort - heightDiff && botOfElement >= topViewPort + heightDiff;
}

/**
 * Method that checks if the element is in the view.
 * @param element - the element you want to check if it is in the view.
 * @return {boolean} - true if in the view, false otherwise.
 */
function isInView(element) {
	// Declare variable for top of viewport
	const topViewPort = $(window).scrollTop();
	// Declare variable for bottom of viewport
	const botViewPort = topViewPort + $(window).height();
	// Get coordinates of element relative to the document.
	const botOfElement = element.offset().top + element.height();

	return botOfElement <= botViewPort && botOfElement >= topViewPort;
}

function bottomOfPage(bottom, notBottom) {
	if ($(window).scrollTop() + $(window).height() >= $(document).height() - LAST_SECTION_SCROLL_NAV_SELECT_DIFF) {
		bottom();
	} else {
		notBottom();
	}
}

/**
 * Method to select a single nav button for highlighting.
 * @param sectionElement - the section element that is currently visible.
 */
function selectSingleNavButton(sectionElement) {
	$(`nav #nav-${sectionElement.attr('id')}`).addClass('activated');

	// Remove all other activated
	$(`.nav-button:not(#nav-${sectionElement.attr('id')})`).each(function removeActivatedClass() {
		$(this).removeClass('activated');
	});
}

/**
 * Method that animate all intro animations if they come into view.
 * If the intro animation tag has the loading class, then the animation will not happen.
 */
function animateSections() {
	$('.intro-animation:not(.loading)').each(function introAnimation() {
		const element = $(this);

		if (isScrolledIntoView(element)) {
			element.removeClass('intro-animation');
		}
	});
}

/**
 * Method that highlights the current section on the nav bar as if it was pressed.
 */
function highlightCurrentNavElement() {
	// Keep track of all the sections
	const sections = $('section');

	// Different script will run if the user is at the bottom, else last section can never be selected.
	bottomOfPage(() => {
		// If user is scrolled to the bottom of the page, select last section as selected on nav.
		selectSingleNavButton($(sections[sections.length - 1]));
	}, () => {
		// If user is not scrolled to the bottom of the page, check which section the user is currently at.
		let navActivated = false;

		sections.each(function checkSectionInView() {
			// Don't do anything if a nav button has already been activated.
			if (!navActivated) {
				const element = $(this);

				if (isInView(element)) {
					navActivated = true;
					selectSingleNavButton(element);
				}
			}
		});
	});
}

/**
 * Function that handles all the scroll events.
 */
function scrollUpdate() {
	animateSections();
	highlightCurrentNavElement();
}
