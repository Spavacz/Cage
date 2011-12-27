/**
 * User: Spav
 * Date: 25.12.11
 * Time: 15:52
 */

Cage.Node.Sprite = function(options) {
	var that = new Cage.Node(options);
	var my = that.getMy();
	my.asset = my.asset || null;
	var super_draw = that.superior('draw');
	that.extend({
		setAsset: function(asset) {
			my.asset = asset;
			return that;
		},
		getAsset: function() {
			return my.asset;
		},
		draw: function() {
			my.context.getContext().drawImage(my.asset, 0, 0, my.width, my.height);
			super_draw();
			return that;
		}
	});
	return that;
};
