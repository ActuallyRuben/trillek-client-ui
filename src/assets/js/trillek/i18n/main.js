define(function (require) {
	'use strict';

	var angular = require('angular');
	var _ = require('lodash');
	require('angularTranslate');
	require('angularTranslateStorageLocal');
	require('angularTranslateHandlerLog');

	var languages = {
		en: require('./en'),
		pl: require('./pl'),
		nl: require('./nl'),
		da: require('./da'),
		sv: require('./sv'),
		ja: require('./ja'),
		ru: require('./ru'),
		es: require('./es'),
		de: require('./de')
	};

	return angular.module('trillek.i18n', ['pascalprecht.translate'])
		.config(['config', '$translateProvider', function (config, $translateProvider) {
			$translateProvider
				.preferredLanguage(config.i18n.preferredLanguage)
				.useMissingTranslationHandlerLog()
				.useLocalStorage();

			_.forEach(languages, function (keys, language) {
				$translateProvider.translations(language, keys);
			});
		}]);
});
