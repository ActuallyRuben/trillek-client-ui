define(function () {
	'use strict';

	/**
	 * @class SelectLanguageController
	 * @param {Object} $scope
	 * @param {Object} config
	 * @param {Object} $translate
	 * @param {Object} $location
	 */
	function SelectLanguageController($scope, config, $translate, $location) {
		$scope.availableLanguages = config.i18n.availableLanguages;
		$scope.setLanguage = $translate.use;
		$scope.done = function () {
			$location.path(config.routes.mainMenu);
		};
	}

	SelectLanguageController.$inject = ['$scope', 'config', '$translate', '$location'];

	return SelectLanguageController;
});
