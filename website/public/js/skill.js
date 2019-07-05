const MILLISECONDS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
const MAX_EXPERIENCE_YEARS = 10;

class Skill {
	constructor(name, stars, extra, startDate) {
		this.name = name;
		this.stars = stars;
		this.extra = extra;
		this.startDate = startDate;
		this._setSubtext();
	}

	_setSubtext() {
		// Display the extra as subtext.
		if (this.extra) {
			this.subtext = this.extra;
			return;
		}

		// Display the years of experience as subtext.
		if (this.startDate) {
			// Calculate the amount of years of experience.
			const yearsExperience = Math.round(1 +
				((new Date()).getTime() - (new Date(this.startDate)).getTime()) / MILLISECONDS_PER_YEAR);

			// Bound the max experience years
			if (yearsExperience >= MAX_EXPERIENCE_YEARS) {
				// Display the years of experience with a upper bound.
				this.subtext = `${MAX_EXPERIENCE_YEARS}+ years`;
			} else if (yearsExperience <= 1) {
				// If the skill experience is only a single year, dont display year in plural.
				this.subtext = `1 year`;
			} else {
				// If the years of experience is inbetween the bounds display it normally.
				this.subtext = `${yearsExperience} years`;
			}
		}
	}

	static compare(a, b) {
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

	static async _loadSkills(sort = false) {
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

			// Display extra field if it is not empty.
			data[dataAbilities[i].type].skills.push(new Skill(curr.title, curr.stars, curr.extra, curr.start_date));
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
