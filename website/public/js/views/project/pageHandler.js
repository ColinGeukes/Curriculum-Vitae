let navigation;

function loadProject(projectId) {
	Project.load(projectId).then((project) => {
		// Set the title.
		$('#project .section-header h1').text(project.title);

		// Set the image.
		$('#project .section-body .image').append(`<img src="/img/projects/${project.id}/thumbnail.png">`);

		// Set the text.
		project.description.forEach((element) => {
			$('#project .section-body .description').append(`<p>${element}</p>`);
		});

		// Create for each type of tag a new display block.
		$.each(project.tags, (type, tags) => {
			$('#project-tags').append(`<div id="type-${type}"><h2>${type}</h2></div>`);

			// Put all the tags inside the display block.
			const tagsElement = $(`#project-tags #type-${type}`);

			tags.forEach((tag) => {
				tagsElement.append(`<p class="tag tag-${tag.type}">${tag.title}</p>`);
			});
		});

		// Make the project page visible.
		$('.content-container').removeClass('fully-hidden');
	});

	// Create the navigation component
	navigation = new Navigation();

	// Handle different screen sizes
	$(window).resize(() => {
		if (navigation) {
			navigation.onResize();
		}
	});
}
