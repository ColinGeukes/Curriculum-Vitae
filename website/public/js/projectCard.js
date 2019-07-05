class ProjectCard {
	constructor(id, title, description, startDate) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.startDate = startDate;
	}

	static compare(a, b) {
		// First, compare the amount of stars
		if (a.startDate > b.startDate) {
			return -1;
		}
		if (a.startDate < b.startDate) {
			return 1;
		}
		return 0;
	}

	static async _loadAll(sort = false) {
		// Retrieve all types
		const projects = await new Promise((resolve) => {
			$.get({
				'url': `/api/projects`,
				'success': resolve
			});
		});
		// Create correct return format.
		const data = [];

		for (let i = 0; i < projects.length; i++) {
			const project = projects[i];

			data.push(new ProjectCard(project.id, project.title, project.description, project.date_start));
		}

		// Sort is sort is true.
		if (sort) {
			data.sort(ProjectCard.compare);
		}

		return data;
	}
}
