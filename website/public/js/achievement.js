class Achievement {
	constructor(settings) {
		this.id = settings.id;
		this.title = settings.title;
		this.description = settings.description;
		this.icon = settings.icon;
		this.date = settings.date;
		this.url = settings.url;
	}

	static compare(a, b) {
		// First, compare the start date
		if (a.date > b.date) {
			return -1;
		}
		if (a.date < b.date) {
			return 1;
		}
		return 0;
	}

	static async loadAll(sort = false) {
		// Retrieve all abilities
		const achievements = await new Promise((resolve) => {
			$.get({
				'url': `/api/achievements`,
				'success': resolve
			});
		});
		const data = [];

		achievements.forEach((achievement) => {
			data.push(new Achievement({
				'id': achievement.id,
				'title': achievement.title,
				'description': achievement.description,
				'icon': achievement.icon,
				'date': new Date(achievement.date),
				'url': achievement.link
			}));
		});

		if (sort) {
			data.sort(Achievement.compare);
		}

		return data;
	}
}
