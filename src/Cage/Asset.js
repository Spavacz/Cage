/**
 * User: Spav
 * Date: 25.12.11
 * Time: 15:52
 */

Cage.Asset = function(options) {
	var my = {
		id: null,
		src: null
	};
	my.extend(options);

	return {
		setId: function(value) {
			my.id = value;
		},
		getId: function() {
			return my.id;
		},
		setSrc: function(value) {
			my.src = value;
		},
		getSrc: function() {
			return my.src;
		}
	};
};
