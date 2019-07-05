async function loadProject() {
	const project = await Project.load(PROJECT_ID);

	// Set the title.
	$('#project .section-header h1').text(project.title);

	// Set the text.
	project.description.forEach((element) => {
		$('#project .section-body .description').append(`<p>${element}</p>`);
	});

	project.tags.forEach((element) => {
		$('#tags .section-body .tags').append(`<p class="tag tag-${element.type}">${element.title}</p>`);
	});

	// Make the project page visible.
	$('.content-container').removeClass('fully-hidden');
}

loadProject();
