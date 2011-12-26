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
		childs: [],
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
		},
		getX: function() {
			return my.x;
		},
		setY: function(value) {
			my.y = value;
		},
		getY: function() {
			return my.y;
		},
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
		addChild: function(child) {
			my.childs.push(child);
		},
		getChilds: function() {
			return my.childs;
		},
		addAction: function(action) {
			my.actions.push(action);
		},
		draw: function() {
			if (my.context) {
				for (var i in my.childs) {
					if (my.childs.hasOwnProperty(i)) {
						var child = my.childs[i];
						child.draw();
						my.context.getContext().drawImage(child.getContext().getCanvas(), child.getX(), child.getY());
					}
				}
			}
		},
		update: function(deltaTime) {
			for (var i in my.actions) {
				if (my.actions.hasOwnProperty(i)) {
					my.actions[i].update(deltaTime, my);
				}
			}
			for (i in my.childs) {
				if (my.childs.hasOwnProperty(i)) {
					my.childs[i].update(deltaTime);
				}
			}
		},
		setContext: function(context) {
			my.context = context;
		},
		getContext: function() {
			return my.context;
		}
	};
	return that;
};
