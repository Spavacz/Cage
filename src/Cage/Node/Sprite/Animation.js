/**
 * User: Spav
 * Date: 04.01.12
 * Time: 12:44
 */

Cage.Node.Sprite.Animation = function(options) {
	var my = {
		type: 'loop',
		step: 1,
		currentFrame: 0,
		currentFrameDuration: 0,
		frames: []
	};
	my.extend(options);
	//my.currentFrameDuration = my.frames[my.currentFrame].getDuration();

	function updateNode(node) {
		var frame = my.frames[my.currentFrame - 1];
		node.setSource(frame.getX(), frame.getY(), frame.getWidth(), frame.getHeight());
	}

	function nextFrame() {
		my.currentFrame += my.step;
		if (my.currentFrame > my.frames.length || my.currentFrame < 1) {
			switch (my.type) {
				case 'loop':
					my.currentFrame = 1;
					break;
				case 'ping-pong':
					my.step *= -1;
					my.currentFrame += my.step * 2;
					break;
			}
		}
		my.currentFrameDuration = my.frames[my.currentFrame - 1].getDuration() + my.currentFrameDuration;
	}

	var that = {
		getMy: function() {
			return my;
		},
		update: function(deltaTime, node) {
			my.currentFrameDuration -= deltaTime;
			while (my.currentFrameDuration < 0) // tu petla bo deltaTime moze byc dluzsze niz czas trawania klatki
			{
				nextFrame();
				updateNode(node);
			}
		}
	};

	return that;
};