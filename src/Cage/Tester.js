/**
 * User: Spav
 * Date: 26.12.11
 * Time: 04:15
 */

Cage.Tester = function(testsCount, debug) {
	var errorsCount = 0;

	function onTestEnd(result) {
		testsCount--;

		if (testsCount < 0) {
			console.warn('Too many tests');
		}

		if (result) {
			console.info('RESULT: Pass');
		} else {
			console.warn('RESULT: Error');
			errorsCount++;
		}
	}

	function onAllTestsEnd() {
		if (testsCount == 0) {
			if (errorsCount > 0) {
				console.error('Total errors: ' + errorsCount);
			} else {
				console.info('All Tests Passed');
			}
		}
	}

	return {
		test: function(title, result, details) {
			console.group(title);
			if (debug && typeof(details) == 'function') {
				console.group('Details');
				details();
				console.groupEnd();
			}
			onTestEnd(result);
			console.groupEnd();
			onAllTestsEnd();
		}
	}
};