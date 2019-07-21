const SMALL_NAVIGATION_WIDTH = 992;

class Navigation {
	constructor() {
		// Add functionality to the toggle menu button
		this.setupToggleButton();

		// Make sure the correct behaviour for the current size is always applied.
		this.onResize();
	}

	setupToggleButton() {
		$('header nav .nav-toggle').click(() => {
			$('header nav').toggleClass('toggled');
		});
	}

	onResize() {
		const width = $(document).width();


		if (width < SMALL_NAVIGATION_WIDTH) {
			$('header nav').addClass('nav-small');
		} else {
			$('header nav').removeClass('nav-small toggled');
		}
	}
}


