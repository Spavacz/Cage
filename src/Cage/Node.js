/**
 * User: Spav
 * Date: 25.12.11
 * Time: 15:52
 */

Cage.Node = function(options) {
	var my = {
		context: null,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		childrens: [],
		actions: []
	};
	my.extend(options);

	my.context = my.context || new Cage.Context({width: my.width, height: my.height});

	var that = {
		getMy: function() {
			return my;
		},
		setX: function(value) {
			my.x = value;
			return that;
		},
		getX: function() {
			return my.x;
		},
		setY: function(value) {
			my.y = value;
			return that;
		},
		getY: function() {
			return my.y;
		},
		setWidth: function(width) {
			my.width = width;
			my.canvas.setWidth(width);
			return that;
		},
		getWidth: function() {
			return my.width;
		},
		setHeight: function(height) {
			my.height = height;
			my.canvas.setHeight(height);
			return that;
		},
		getHeight: function() {
			return my.height;
		},
		addChild: function(child) {
			my.childrens.push(child);
			return that;
		},
		getChildrens: function() {
			return my.childrens;
		},
		addAction: function(action) {
			my.actions.push(action);
			return that;
		},
		draw: function() {
			if (my.context) {
				for (var i in my.childrens) {
					if (my.childrens.hasOwnProperty(i)) {
						var child = my.childrens[i];
						child.draw();
						my.context.getContext().drawImage(child.getContext().getCanvas(), child.getX(), child.getY());
					}
				}
			}
			return that;
		},
		update: function(deltaTime) {
			for (var i in my.actions) {
				if (my.actions.hasOwnProperty(i)) {
					my.actions[i].update(deltaTime, my);
				}
			}
			for (i in my.childrens) {
				if (my.childrens.hasOwnProperty(i)) {
					my.childrens[i].update(deltaTime);
				}
			}
			return that;
		},
		setContext: function(context) {
			my.context = context;
			return that;
		},
		getContext: function() {
			return my.context;
		}
	};
	return that;
};
