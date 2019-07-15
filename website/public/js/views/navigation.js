const SMALL_NAVIGATION_WIDTH = 768;

class Navigation {

	constructor(){

		// Add functionality to the toggle menu button
		this.setupToggleButton();

		//Make sure the correct behaviour for the current size is always applied.
		this.onResize();
	}

	setupToggleButton() {
		$('header nav .nav-toggle').click(function toggleMenu() {
			$('header nav').toggleClass('toggled');
		});
	}

	onResize() {
		const width = $(document).width();


		if(width < SMALL_NAVIGATION_WIDTH){
			$('header nav').addClass('nav-small');
		} else {
			$('header nav').removeClass('nav-small toggled');
		}

		console.log(width);
	}
}



