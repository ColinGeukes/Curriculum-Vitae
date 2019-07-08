function addArrayFunctionality(jQuery, array, elementSettings) {
	array.each = (func) => {
		for (let i = 0; i < array.length; i++) {
			func(i);
		}
	};
}

function addGeneralFunctionality(mock, settings) {
	// Mock the each request.
	mock.each = function each(dictionary, func) {
		Object.keys(dictionary).forEach((key) => {
			func(key, dictionary[key]);
		});
	};

	// Mock the get request.
	mock.get = function get(url) {
		return settings.get(url);
	};
}

function createJqueryMock(elementSettings = {}) {
	const jQueryMock = (element) => ({
		'selector': () => element,
		'ready': (func) => {
			func();
		},
		'resize': (func) => {
			func();
		},

		// DOM alteration functions
		'text': (text) => jQueryMock.__changes.text.push(text),
		'append': (append) => jQueryMock.__changes.append.push(append),
		'prepend': (prepend) => jQueryMock.__changes.prepend.push(prepend),
		'addClass': (addClass) => jQueryMock.__changes.addClass.push(addClass),
		'removeClass': (removeClass) => jQueryMock.__changes.removeClass.push(removeClass),
		'html': (html) => jQueryMock.__changes.html.push(html),
		'css': (type, value) => jQueryMock.__changes.css.push({
			type,
			value
		}),
		'click': (click) => jQueryMock.__changes.click.push(click),

		'find': (elementToFind) => jQueryMock(elementToFind),
		'children': () => {
			const children = [];

			for (let i = 0; i < elementSettings.children.length; i++) {
				children.push(jQueryMock(elementSettings.children[i]));
			}

			addArrayFunctionality(this, children, elementSettings);
			return children;
		},
		'width': () => elementSettings.width
	});

	jQueryMock.__changes = {
		'click': [],
		'css': [],
		'html': [],
		'addClass': [],
		'removeClass': [],
		'prepend': [],
		'append': [],
		'text': []
	};

	// Functionality of the jQuery object
	addGeneralFunctionality(this, elementSettings);
	return jQueryMock;
}

module.exports = {
	'create': createJqueryMock
};
