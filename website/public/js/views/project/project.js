class Project {
	constructor(settings) {
		this.id = settings.id;
		this.title = settings.title;
		this.description = settings.description.split('<br>');
		this.startDate = settings.startDate;
		this.endDate = settings.endDate;
		this.url = settings.url;
		this.tags = {};
	}

	/**
	 * Method to load a project from the database.
	 * @param {number} projectId - the id of the project you want to retrieve.
	 * @return {Promise<Project>} - returns a Project object.
	 */
	static async load(projectId) {
		// Retrieve the project
		const projectData = (await new Promise((resolve) => {
			$.get({
				'url': `/api/project?id=${projectId}`,
				'success': resolve
			});
		})).project;
		// Create the Project object
		const project = new Project({
			'id': projectData.id,
			'title': projectData.title,
			'description': projectData.description,
			'startDate': new Date(projectData.date_start),
			'endDate': new Date(projectData.date_end),
			'url': projectData.link
		});

		// Add the tags of the project to the list of Tags inside the Project.
		projectData.tags.forEach((element) => {
			// Create the array dictionary.
			if (!(element.type_name in project.tags)) {
				project.tags[element.type_name] = [];
			}

			project.tags[element.type_name].push(new ProjectAbility({
				'id': element.id,
				'type': element.type_id,
				'title': element.title
			}));
		});

		// Sort all the tags.
		$.each(project.tags, (key, value) => {
			value.sort(ProjectAbility.compare);
		});

		return project;
	}
}
