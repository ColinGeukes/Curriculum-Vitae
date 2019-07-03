class Skill {
	constructor (name, stars, extra = '') {
		this.name = name;
		this.stars = stars;
		this.extra = extra;
	}

	static compare (a, b) {
		// First, compare the amount of stars
		if (a.stars > b.stars) {
			return -1;
		}
		if (a.stars < b.stars) {
			return 1;
		}

		// Secondly, compare the name.
		if (a.name > b.name) {
			return 1;
		}
		if (a.name < b.name) {
			return -1;
		}
		return 0;
	}

	static async _loadSkills (sort = false) {
		// Retrieve all types
		const dataTypes = await new Promise((resolve) => {
			$.get({
				'url': `/api/types`,
				'success': resolve
			});
		});
		// Retrieve all abilities
		const dataAbilities = await new Promise((resolve) => {
			$.get({
				'url': `/api/abilities`,
				'success': resolve
			});
		});
		// Create correct return format.
		const data = {};

		// Load all types in correct format.
		for (let i = 0; i < dataTypes.length; i++) {
			data[dataTypes[i].id] = {
				'type': dataTypes[i].name,
				'skills': []
			};
		}

		// Load all skills in correct format, and group correct types.
		for (let i = 0; i < dataAbilities.length; i++) {
			const curr = dataAbilities[i];

			data[dataAbilities[i].type].skills.push(new Skill(curr.title, curr.stars, curr.extra));
		}

		// Sort is sort is true.
		if (sort) {
			for (let i = 0; i < dataTypes.length; i++) {
				data[dataTypes[i].id].skills.sort(Skill.compare);
			}
		}

		return data;
	}
}
