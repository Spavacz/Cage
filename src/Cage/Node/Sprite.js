/**
 * User: Spav
 * Date: 25.12.11
 * Time: 15:52
 */

Cage.Node.Sprite = function(options) {
	var that = new Cage.Node(options);
	var my = that.getMy();
	my.extend({
		asset: my.asset || null,
		source: my.source || {
			x: 0,
			y: 0,
			width: my.width,
			height: my.height
		},
		animation: my.animation || null
	});

	var super_draw = that.superior('draw');
	var super_update = that.superior('update');

	that.extend({
		setAsset: function(asset) {
			my.asset = asset;
			return that;
		},
		getAsset: function() {
			return my.asset;
		},
		setSource: function(x, y, width, height) {
			my.source = {
				x: x,
				y: y,
				width: width,
				height: height
			};
			return that;
		},
		setAnimation: function(animation) {
			my.animation = animation;
			return that;
		},
		getAnimation: function() {
			return my.animation;
		},
		update: function(deltaTime) {
			if(my.animation) {
				my.animation.update(deltaTime, that);
			}
			super_update(deltaTime);
			return that;
		},
		draw: function() {
			my.context.getContext().drawImage(my.asset, my.source.x, my.source.y, my.source.width, my.source.height, 0, 0, my.width, my.height);
			super_draw();
			return that;
		}
	});
	return that;
};
