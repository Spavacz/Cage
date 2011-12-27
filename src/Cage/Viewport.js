/**
 * User: Spav
 * Date: 25.12.11
 * Time: 15:52
 */

Cage.Viewport = function(options) {
	var my = {
		context: null,
		width: null,
		height: null,
		nodes: []
	};
	my.extend(options);

	my.context = my.context || new Cage.Context({width: my.width, height: my.height});

	var that = {
		setWidth: function(width) {
			my.width = width;
			my.context.setWidth(width);
			return that;
		},
		getWidth: function() {
			return my.width;
		},
		setHeight: function(height) {
			my.height = height;
			my.context.setHeight(height);
			return that;
		},
		getHeight: function() {
			return my.height;
		},
		addNode: function(node) {
			my.nodes.push(node);
			return that;
		},
		getNodes: function() {
			return my.nodes;
		},
		draw: function() {
			if(my.context) {
				for(var i in my.nodes) {
					if(my.nodes.hasOwnProperty(i)) {
						var node = my.nodes[i];
						node.draw();
						my.context.getContext().drawImage(node.getContext().getCanvas(), node.getX(), node.getY(), node.getWidth(), node.getHeight());
					}
				}
			}
			return that;
		},
		update: function(deltaTime) {
			for(var i in my.nodes) {
				if(my.nodes.hasOwnProperty(i)){
					my.nodes[i].update(deltaTime);
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
