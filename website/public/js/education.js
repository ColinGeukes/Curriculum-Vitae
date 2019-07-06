class Education {
	constructor(settings) {
		this.id = settings.id;
		this.name = settings.name;
		this.type = settings.type;
		this.title = settings.title;
		this.icon = settings.icon;
		this.description = settings.description;
		this.dateStart = settings.dateStart;
		this.dateEnd = settings.dateEnd;
	}

	static async loadAll() {
		// Retrieve all abilities
		const educations = await new Promise((resolve) => {
			$.get({
				'url': `/api/educations`,
				'success': resolve
			});
		});
		const data = [];


		educations.forEach((education) => {
			// Check if there is an end date if parsing, providing null will give the UTC time.
			let endDate = education.date_end;

			if (endDate) {
				endDate = new Date(endDate);
			}

			data.push(new Education({
				'id': education.id,
				'name': education.name,
				'type': education.type,
				'title': education.title,
				'icon': education.icon,
				'description': education.description,
				'dateStart': new Date(education.date_start),
				'dateEnd': endDate
			}));
		});

		return data;
	}
}
