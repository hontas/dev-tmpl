(function () {
	'use strict';

	function log(msg) {
		if ('console' in window) {
			window.console.log(msg);
		}
	}

	log('L\'app du monde!');
})();
