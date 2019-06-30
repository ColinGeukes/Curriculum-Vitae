class Skill {
	constructor(name, stars, extra = '') {
		this.name = name;
		this.stars = stars;
		this.extra = extra;
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
}


