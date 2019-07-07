class Experience {
	constructor(settings) {
		this.id = settings.id;
		this.name = settings.name;
		this.title = settings.title;
		this.icon = settings.icon;
		this.description = settings.description;
		this.dateStart = settings.dateStart;
		this.dateEnd = settings.dateEnd;
		this.url = settings.url;
	}

	static compare(a, b) {
		// First, compare the start date
		if (a.dateStart > b.dateStart) {
			return -1;
		}
		if (a.dateStart < b.dateStart) {
			return 1;
		}
		return 0;
	}

	static async loadAll(sort = false) {
		// Retrieve all abilities
		const experiences = await new Promise((resolve) => {
			$.get({
				'url': `/api/experiences`,
				'success': resolve
			});
		});
		const data = [];

		experiences.forEach((experience) => {
			// Check if there is an end date if parsing, providing null will give the UTC time.
			let endDate = experience.date_end;

			if (endDate) {
				endDate = new Date(endDate);
			}

			data.push(new Experience({
				'id': experience.id,
				'name': experience.name,
				'title': experience.title,
				'icon': experience.icon,
				'description': experience.description,
				'dateStart': new Date(experience.date_start),
				'dateEnd': endDate,
				'url': experience.link
			}));
		});

		if (sort) {
			data.sort(Experience.compare);
		}

		return data;
	}
}
