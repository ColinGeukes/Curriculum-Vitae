const LOGO_NAV_TRANSITION = '1.5s';

$(document).ready(function () {
	const landingPage = $('#landing-page');
	const content = $('#content');
	const nav = $('nav');

	// Clicking on the welcome page will.
	landingPage.click(function () {
		// console.log('clicked')
		landingPage.css('transition', LOGO_NAV_TRANSITION);
		landingPage.css('height', '157px');
		landingPage.css('cursor', 'default');
		$('#landing-page .container').css('margin', '0 auto');
		$('#bubble-welcome').hide();
		content.css('transition', LOGO_NAV_TRANSITION);
		content.css('margin-top', '85px');
		content.css('visibility', 'visible');
		nav.css('transition', LOGO_NAV_TRANSITION);
		nav.css('top', '0');

		setTimeout(function () {
			$('nav .nav-icon').css('opacity', '1');
			landingPage.css('transition', '0s');
			nav.css('transition', '0s');
			content.css('transition', '0s');
		}, 850)
	});
});