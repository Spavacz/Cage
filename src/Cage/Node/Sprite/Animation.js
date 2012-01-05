/**
 * User: Spav
 * Date: 04.01.12
 * Time: 12:44
 */

Cage.Node.Sprite.Animation = function(options) {
	var my = {
		type: 'Loop',
		step: 1,
		currentFrame: 0,
		currentFrameDuration: 0,
		frames: [],
		onFrame: function() {},
		onLoop: function() {}
	};
	my.extend(options);
	//my.currentFrameDuration = my.frames[my.currentFrame].getDuration();

	function updateNode(node) {
		var frame = my.frames[my.currentFrame - 1];
		node.setSource(frame.getX(), frame.getY(), frame.getWidth(), frame.getHeight());
		my.onFrame();
	}

	function nextFrame() {
		my.currentFrame += my.step;
		if (my.currentFrame > my.frames.length || my.currentFrame < 1) {
			my.onLoop();
			switch (my.type) {
				case 'Loop':
					my.currentFrame = 1;
					break;
				case 'PingPong':
					my.step *= -1;
					my.currentFrame += my.step * 2;
					break;
				case 'Once':
					return false;
					break;
			}
		}
		my.currentFrameDuration = my.frames[my.currentFrame - 1].getDuration() + my.currentFrameDuration;
		return my.currentFrame;
	}

	var that = {
		getMy: function() {
			return my;
		},
		update: function(deltaTime, node) {
			my.currentFrameDuration -= deltaTime;
			while (my.currentFrameDuration < 0) // tu petla bo deltaTime moze byc dluzsze niz czas trawania klatki
			{
				if(nextFrame() !== false) {
					updateNode(node);
				} else {
					node.setAnimation(null);
					break;
				}
			}
			return that;
		}
	};

	return that;
};