const SMALL_NAVIGATION_WIDTH = 992;

class Navigation {
	constructor() {
		// Make sure the correct behaviour for the current size is always applied.
		this.onResize();
	}

	onResize() {
		const width = $(document).width();


		if (width < SMALL_NAVIGATION_WIDTH) {
			$('header nav').addClass('nav-small');
		} else {
			$('header nav').removeClass('nav-small');
		}
	}
}


