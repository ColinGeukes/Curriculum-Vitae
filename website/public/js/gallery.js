class Gallery {
	constructor(settings, setup = true) {
		this.element = settings.element;
		this.featuring = settings.featuring;
		this.featuringPointer = 0;
		this.itemHTML = settings.itemHTML;
		this.itemURL = settings.itemURL;
		this.displayAmount = settings.displayAmount;

		// Setting up initial properties.
		if (setup) {
			this._addHTML();
			this._addItemsHTML();
			this.updateSelection();
		}
	}

	/**
	 * Method that adds html of the general gallery to the featuring body.
	 * @private
	 */
	_addHTML() {
		// Append the gallery basics to the parent element.
		this.element.addClass("card-panel");

		// Set the html of the gallary to the element.
		this.element.html(`
			<div class="panel-button button-left">
				<i class="fas fa-chevron-left"></i>
			</div>
			<div class="cards">
				<div class="gallery-content row"></div>
			</div>
			<div class="panel-button button-right">
				<i class="fas fa-chevron-right"></i>
			</div>`);

		// Give the left button the functionality to change display.
		this.element.find('.button-left').click(() => {
			this.updateSelection(-1);
		});

		// Give the right button the functionality to change display.
		this.element.find('.button-right').click(() => {
			this.updateSelection(1);
		});
	}

	/**
	 * Method that adds html of the different features to the featuring body.
	 * @private
	 */
	_addItemsHTML() {
		const galleryContent = this.element.find('.gallery-content');

		for (let i = 0; i < this.featuring.length; i++) {
			const item = this.featuring[i];

			galleryContent.append(`<div class="row-flex"><a class="card" href="${this.itemURL(item)}">${this.itemHTML(item)}</a></div>`);
		}

		// $('#projects .content .cards > .row').append(`<div class="row-flex"><a class="card" href="/project/${projectPreview.id}">${imageField}${textField}</a></div>`);
	}

	/**
	 * Method that updates the project previewer.
	 * @param {number} value - how much the pointer should be changing.
	 */
	updateSelection(value = 0) {
		const cards = $('#projects .cards > .row').children();
		const cardsAmount = cards.length;

		this.featuringPointer = ((this.featuringPointer + value) % cardsAmount + cardsAmount) % cardsAmount;

		const displayAmount = this.displayAmount(this.element.find('.cards').width());
		const pointer = this.featuringPointer;

		cards.each(function eachCard(index) {
			const card = $(this);

			// The featuring is inside the feature range.
			if (index >= pointer && index < pointer + displayAmount) {
				card.removeClass("fully-hidden");
				card.css("order", 0);
				return;
			}

			// The featuring is being looped round.
			if (pointer + displayAmount - index > cardsAmount) {
				card.removeClass("fully-hidden");
				card.css("order", `${1 + index}`);
				return;
			}

			// The featuring is outside the display range, and should be hidden.
			$(this).addClass("fully-hidden");
		});
	}

	/**
	 * This event should be called on every resize update.
	 * It makes sure that the displayed features are using the correct size settings.
	 */
	onResize() {
		// Update the selection, to match correct sizing.
		this.updateSelection(0);
	}
}
