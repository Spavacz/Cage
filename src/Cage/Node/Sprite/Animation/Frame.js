/**
 * User: Spav
 * Date: 04.01.12
 * Time: 14:10
 */

Cage.Node.Sprite.Animation.Frame = function(options) {
	var my = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		duration: 0
	};
	my.extend(options);

	var that = {
		getX: function() {
			return my.x;
		},
		getY: function() {
			return my.y;
		},
		getWidth: function() {
			return my.width;
		},
		getHeight: function() {
			return my.height;
		},
		getDuration: function() {
			return my.duration;
		}
	};

	return that;
};