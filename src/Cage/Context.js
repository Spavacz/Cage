/**
 * User: Spav
 * Date: 25.12.11
 * Time: 15:52
 */

Cage.Context = function(options) {
	var my = {
		canvas: null,
		height: 0,
		width: 0
	};
	my.extend(options);

	my.canvas = my.canvas || document.createElement('canvas');
	my.canvas.setAttribute('width', my.width);
	my.canvas.setAttribute('height', my.height);

	var that = {
		setWidth: function(width) {
			my.width = width;
			my.canvas.setAttribute('width', my.width);
			return that;
		},
		getWidth: function() {
			return my.width;
		},
		setHeight: function(height) {
			my.height = height;
			my.canvas.setAttribute('height', my.height);
			return that;
		},
		getHeight: function() {
			return my.height;
		},
		getContext: function() {
			return my.canvas.getContext('2d');
		},
		getCanvas: function() {
			return my.canvas;
		}
	};
	return that;
};
