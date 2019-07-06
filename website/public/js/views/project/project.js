class Project {
	constructor(settings) {
		this.id = settings.id;
		this.title = settings.title;
		this.description = settings.description.split('<br>');
		this.startDate = settings.startDate;
		this.endDate = settings.endDate;
		this.tags = [];
	}

	/**
	 * Method to load a project from the database.
	 * @param {number} projectId - the id of the project you want to retrieve.
	 * @return {Promise<Project>} - returns a Project object.
	 */
	static async load(projectId, jQuery = $, ProjectAbilityClass = ProjectAbility) {
		// Retrieve the project
		const projectData = (await new Promise((resolve) => {
			jQuery.get({
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
			'endDate': new Date(projectData.date_end)
		});

		// Add the tags of the project to the list of Tags inside the Project.
		projectData.tags.forEach((element) => {
			project.tags.push(new ProjectAbilityClass(element));
		});

		// Sort the tags.
		project.tags.sort(ProjectAbilityClass.compare);

		return project;
	}
}
