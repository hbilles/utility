"use strict";

var delay = function () {
	var timeout = 0;

	return function (callback, ms) {
		clearTimeout(timeout);
		timeout = setTimeout(callback, ms);
	};
}();

var findParent = {
	by: function by(el, func) {
		if (!el || func === undefined || el === document) return undefined;

		// if el matches according to function func, return el
		if (func(el)) return el;

		return this.by(el.parentNode, func);
	},
	withClass: function withClass(el, className) {
		return this.by(el, function (node) {
			return node.classList.contains(className);
		});
	},
	withData: function withData(el, attrName) {
		return this.by(el, function (node) {
			node.dataset.hasOwnProperty(attrName);
		});
	}
};

module.exports = {
	delay: delay,
	findParent: findParent
};