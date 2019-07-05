/**
 * Class for the Project Ability Tags.
 */
class ProjectAbility {
	constructor(settings) {
		this.id = settings.id;
		this.type = settings.type;
		this.title = settings.title;
	}


	static compare(a, b) {
		// First, compare the type
		if (a.type > b.type) {
			return 1;
		}
		if (a.type < b.type) {
			return -1;
		}

		// Secondly, compare the name
		if (a.title > b.title) {
			return 1;
		}
		if (a.title < b.title) {
			return -1;
		}
		return 0;
	}
}
