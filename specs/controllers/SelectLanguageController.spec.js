define(function (require) {
	'use strict';

	var SelectLanguageController = require('trillek/controllers/SelectLanguageController');

	describe('trillek/controllers/SelectLanguageController', function () {
		var controller;
		var scope;
		var config;
		var translate;
		var location;
		var availableLanguages;

		beforeEach(function () {
			scope = {};
			translate = {
				use: jasmine.createSpy('uses')
			};
			location = {
				path: jasmine.createSpy('path')
			};
			availableLanguages = {};
			config = {
				i18n: {
					availableLanguages: availableLanguages
				},
				routes: {
					mainMenu: 'MAIN_MENU_ROUTE'
				}
			};
			controller = new SelectLanguageController(scope, config, translate, location);
		});

		it('adds a list of languages to the scope', function () {
			expect(scope.availableLanguages).toEqual(availableLanguages);
		});

		it('attepts to set the language to the provided language code', function () {
			scope.setLanguage('en');
			expect(translate.use).toHaveBeenCalledWith('en');
		});

		it('should have a done method that redirects to the main menu', function () {
			scope.done();
			expect(location.path).toHaveBeenCalledWith(config.routes.mainMenu);
		});
	});
});
