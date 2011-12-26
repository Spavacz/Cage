/**
 * User: Spav
 * Date: 25.12.11
 * Time: 15:52
 */

Cage.Node.Text = function(options) {
	var that = new Cage.Node(options);
	var my = that.getMy();
	my.text = my.text | null;
	var super_draw = that.superior('draw');

	that.extend({
		setText: function(text) {
			my.text = text;
		},
		getText: function() {
			return my.text;
		},
		draw: function() {
			my.context.getContext().fillText(my.text, my.x, my.y);
			super_draw();
		}
	});
	return that;
};
