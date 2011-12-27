/**
 * User: Spav
 * Date: 27.12.11
 * Time: 22:25
 */
Cage.Loop = function(options) {
	var my = {
		loops: 0,
		fps: 60,
		maxFrameSkip: 20,
		nextGameTick: (new Date).getTime(),
		lastGameTick: null,
		timer: new Cage.Timer(),
		update: function(deltaTime){},
		draw: function(interpolation){}
	};
	my.extend(options);
	my.skipTicks = 1000 / my.fps;

	function _run() {
		my.loops = 0;
		while ((new Date).getTime() > my.nextGameTick && my.maxFrameSkip > my.loops) {
			my.timer.tick();
			my.update(my.timer.getSeconds());
			my.nextGameTick += my.skipTicks;
			my.loops++;
		}

		if (!my.loops) {
			my.draw((my.nextGameTick - (new Date).getTime()) / my.skipTicks);
		} else {
			my.draw(0);
		}
	}

	var that = {
		run: function() {
			window.onEachFrame(_run);
		}
	};
	return that;
};
