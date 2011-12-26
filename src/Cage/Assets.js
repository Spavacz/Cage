/**
 * User: Spav
 * Date: 25.12.11
 * Time: 15:46
 */

Cage.Assets = (function() {
	var that = {},
			assets = {
				sound: {},
				image: {}
			},
			loadCount,
			itemsToLoad;

	var audioFormats = (function() {
		var audio = document.createElement("audio");
		var returnExtensions = [];
		if (audio.canPlayType("audio/ogg") == "probably" || audio.canPlayType("audio/ogg") == "maybe") {
			returnExtensions.push('ogg');
		}
		if (audio.canPlayType("audio/wav") == "probably" || audio.canPlayType("audio/wav") == "maybe") {
			returnExtensions.push('wav');
		}
		if (audio.canPlayType("audio/mp3") == "probably" || audio.canPlayType("audio/mp3") == "maybe") {
			returnExtensions.push('mp3');
		}
		return returnExtensions;
	})();

	function loadSound(src, id) {
		var asset = new Cage.Asset.Sound({
			id: id,
			src: src
		});
		that.fireDataEvent('asset_start', {asset: asset});

		if (audioFormats.length) {
			var audio = document.createElement("audio");
			document.body.appendChild(audio);
			audio.addEventListener("canplaythrough", eventAssetLoad, false);
			audio.addEventListener('error', eventAssetLoad, false);
			var filename;
			if (src.indexOf('.ogg') == -1 && src.indexOf('.mp3') == -1 && src.indexOf('.wav') == -1) {
				filename = src + '.' + audioFormats[0];
			}
			else {
				filename = src;
			}
			audio.setAttribute("src", filename);
			assets.sound[id] = audio;
			return;
		}
		loadCount++; // load failed
	}

	function loadImage(src, id) {
		var asset = new Cage.Asset.Image({
			id: id,
			src: src
		});

		that.fireDataEvent('asset_start', {asset: asset});

		var image = new Image();
		image.asset = asset;
		image.addEventListener('load', eventAssetLoad, false);
		image.addEventListener('error', eventAssetLoad, false);
		image.src = src;
		assets.image[id] = image;
	}

	function eventAssetLoad(e) {
		loadCount++;
		var eventData = {
			asset: this,
			progress: loadCount * 100 / itemsToLoad
		};

		that.fireDataEvent('asset_end', eventData);

		if (eventData.progress == 100) {
			that.fireEvent('assets_complete');
		}
	}

	that.extend({
		load: function(files) {
			var i;

			loadCount = 0;
			itemsToLoad = (files.sounds ? Object.getOwnPropertyNames(files.sounds).length : 0) + (files.images ? Object.getOwnPropertyNames(files.images).length : 0);

			if (files.sounds) {
				for (i in files.sounds) {
					if (files.sounds.hasOwnProperty(i)) {
						loadSound(files.sounds[i], i);
					}
				}
			}

			if (files.images) {
				for (i in files.images) {
					if (files.images.hasOwnProperty(i)) {
						loadImage(files.images[i], i);
					}
				}
			}
		},
		getSound: function(id, url) {
			if (url) {
				loadSound(url, id)
			}
			return assets.sound[id];
		},
		getImage: function(id, url) {
			if (url) {
				loadImage(url, id);
			}
			return assets.image[id];
		}
	});
	return that;
})();
