/**
 * User: Spav
 * Date: 27.12.11
 * Time: 22:25
 */
Cage.Timer = function() {
	var my = {
		lastTick: (new Date()).getTime(),
		seconds: 0
	};

	var that = {
		getSeconds: function() {
			return my.seconds;
		},

		tick: function() {
			var currentTick = (new Date()).getTime();
			var frameSpacing = currentTick - my.lastTick;

			my.lastTick = currentTick;
			my.seconds = frameSpacing / 1000;
			if (isNaN(my.seconds)) {
				my.seconds = 0;
			}

			return that;
		}
	};

	return that;
};
