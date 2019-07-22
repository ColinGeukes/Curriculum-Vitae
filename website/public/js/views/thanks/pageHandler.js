let navigation;

function load() {
	// Create the navigation component
	navigation = new Navigation();

	// Handle different screen sizes
	$(window).resize(() => {
		if (navigation) {
			navigation.onResize();
		}
	});
}
