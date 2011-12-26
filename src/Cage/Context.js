/**
 * User: Spav
 * Date: 25.12.11
 * Time: 15:52
 */

Cage.Context = function(options) {
	var my = {
		canvas: null,
		context: null,
		height: 0,
		width: 0
	};
	my.extend(options);

	my.canvas = my.canvas || document.createElement('canvas');
	my.canvas.setAttribute('width', my.width);
	my.canvas.setAttribute('height', my.height);
	my.context = my.canvas.getContext('2d');

	var that = {
		setWidth: function(width) {
			my.width = width;
		},
		getWidth: function() {
			return my.width;
		},
		setHeight: function(height) {
			my.height = height;
		},
		getHeight: function() {
			return my.height;
		},
		getContext: function() {
			return my.context;
		},
		getCanvas: function() {
			return my.canvas;
		}
	};
	return that;
};
