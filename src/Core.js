/**
 * User: Spav
 * Date: 20.11.11
 * Time: 12:46
 */

// onEachFrame
(function() {
	var onEachFrame;
	if (window.webkitRequestAnimationFrame) {
		onEachFrame = function(cb) {
			var _cb = function() {
				cb();
				webkitRequestAnimationFrame(_cb);
			};
			_cb();
		};
	} else if (window.mozRequestAnimationFrame) {
		onEachFrame = function(cb) {
			var _cb = function() {
				cb();
				mozRequestAnimationFrame(_cb);
			};
			_cb();
		};
	} else {
		onEachFrame = function(cb) {
			setInterval(cb, 1000 / 60);
		}
	}
	window.onEachFrame = onEachFrame;
})();

function getHttpRequest() {
	var xmlHttp;
	try {
		// Utworzenie obiektu XMLHttpRequest (silnik Gecko, WebKit, Presto, Trident w IE>6)
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		// Wyłapuje błąd jeśli JavaScript nie posiada obiektu XMLHttpRequest
		try {
			// Utworzenie obiektu ActiveXObject, który jest zawarty w kontrolce ActiveX IE
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				// Utworzenie obiektu ActiveXObject, dla innych wersji IE
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				// Wyświetlenie błędu o braku obsługi obiektu XMLHttpRequest
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
	// zwrócenie obiektu
	return xmlHttp;
}

function ajaxCall(url, params) {
	var options = {
		failure: function(status) {
		},
		success: function(response) {
		},
		method: 'GET',
		data: null
	};
	options.extend(params);

	var xhr = getHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				options.success(xhr.responseText);
			} else {
				options.failure(xhr.status);
			}
		}
	};
	xhr.open(options.method, url, true);
	if (options.method == 'POST') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	}
	xhr.send(options.data);
}

Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};

Object.prototype.superior = function(name) {
	var that = this,
			method = that[name];
	return function() {
		return method.apply(that, arguments);
	}
};

Object.prototype.extend = function(properties) {
	for (var i in properties) {
		this[i] = properties[i];
	}
};

Object.prototype.getEvents = function() {
	if (!this.__events) {
		this.__events = {};
	}
	return this.__events;
};

Object.prototype.addListener = function(name, fn, ctx /* args */) {
	var events = this.getEvents(),
			ctxArgs = Array.prototype.slice.call(arguments, 2);

	if (!this.existEvent(name)) {
		events[name] = [];
	}

	events[name].push(Function.prototype.bind.apply(fn, ctxArgs));
};

Object.prototype.existEvent = function(name) {
	var events = this.getEvents();
	return events[name] ? true : false;
};

Object.prototype.fireEvent = function(name) {
	var i,
			len,
			events = this.getEvents(),
			event = events[name];

	if (this.existEvent(name)) {
		for (i = 0, len = event.length; i < len; i += 1) {
			event[i]();
		}
	}
};

Object.prototype.fireDataEvent = function(name, data) {
	var i,
			len,
			events = this.getEvents(),
			event = events[name];

	if (this.existEvent(name)) {
		for (i = 0, len = event.length; i < len; i += 1) {
			event[i](data);
		}
	}
};

Function.prototype.bind = function(scope) {
	var _function = this;
	return function() {
		return _function.apply(scope, arguments);
	}
};