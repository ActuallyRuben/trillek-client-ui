require.config({
	paths: {
		trillek: '../assets/js/trillek',
	}
});

mocha.setup('tdd');
mocha.reporter('html');
window.assert = chai.assert;

define([
	'../assets/js/require-config',

	'tests/pages/all',
	'tests/pages/AbstractPage',
	'tests/pages/SplashPage',

	'tests/services/PageRouter',
	'tests/services/PageDisplayManager',

	'tests/controllers/AbstractController',
	'tests/models/AbstractModel',
	'tests/views/AbstractView'
], function (config) {
	mocha.run();
});
