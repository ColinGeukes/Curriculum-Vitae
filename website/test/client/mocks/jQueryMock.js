function addArrayFunctionality(jQuery, array, configuration) {
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

function createArrayElement(jQuery, configuration, element) {
	const arrayObject = configuration[element];

	// Add the each function
	arrayObject.each = (func) => {
		for (let i = 0; i < configuration[element].length; i++) {
			func.bind(configuration[element][i])(i);
		}
	};

	arrayObject.get = function get() {
		return {
			'reverse': () => {
				const ret = [];

				for (let i = arrayObject.length - 1; i >= 0; i--) {
					ret.push(arrayObject[i]);
				}
				return jQuery(ret, configuration, element);
			}
		};
	};
	return arrayObject;
}

function createSingleElement(jQuery, configuration, element) {
	// Add default values to keep track of changes
	if (!(element in configuration)) {
		throw Error(`jQueryMock has no element '${element}'`);
	}

	// Console.log(element);
	configuration[element].__changes = {
		'css': [],
		'html': [],
		'click': [],
		'addClass': [],
		'removeClass': [],
		'prepend': [],
		'append': [],
		'text': []
	};

	// Create the element
	return {
		'selector': () => element,
		'ready': (func) => {
			func();
		},
		'resize': (func) => {
			func();
		},

		// DOM alteration functions
		'text': (text) => configuration[element].__changes.text.push(text),
		'append': (append) => configuration[element].__changes.append.push(append),
		'prepend': (prepend) => configuration[element].__changes.prepend.push(prepend),
		'addClass': (addClass) => configuration[element].__changes.addClass.push(addClass),
		'removeClass': (removeClass) => configuration[element].__changes.removeClass.push(removeClass),
		'html': (html) => configuration[element].__changes.html.push(html),
		'css': (type, value) => configuration[element].__changes.css.push({
			type,
			value
		}),
		'click': (clickFunction) => configuration[element].__changes.click.push(clickFunction),
		'find': (elementToFind) => {
			// Check if the find is declared, if not throw an error.
			if (!(elementToFind in configuration[element].find)) {
				throw new Error(`Element '${element}' has no element '${elementToFind}' in [find]`);
			}
			return jQuery(configuration[element].find[elementToFind]);
		},
		'children': () => jQuery(configuration[element].children),
		'width': () => configuration[element].width,
		'height': () => configuration[element].height,
		'scrollTop': () => configuration[element].scrollTop,
		'offset': () => configuration[element].offset,
		'attr': (attribute) => configuration[element].attr[attribute]
	};
}

function createJqueryMock(configuration = {}) {
	const jQueryMock = function jQueryMock(element) {
		// JQuery can also return an array of elements, which behaves differently
		if (Array.isArray(configuration[element])) {
			const arrayElement = createArrayElement(jQueryMock, configuration, element);

			configuration[element].__element = arrayElement;
			return arrayElement;
		}
		const singleElement = createSingleElement(jQueryMock, configuration, element);

		configuration[element].__element = singleElement;
		return singleElement;
	};

	// Functionality of the jQuery object
	addGeneralFunctionality(this, configuration);

	jQueryMock.config = configuration;
	return jQueryMock;
}

module.exports = {
	'create': createJqueryMock
};
