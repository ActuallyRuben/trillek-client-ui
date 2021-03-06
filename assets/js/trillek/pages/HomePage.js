define([
	'lodash',
	'trillek/pages/AbstractPage',
	'trillek/controllers/HomePageController',
	'trillek/pages/GamePage',
	'trillek/services'
], function (_, AbstractPage, HomePageController, GamePage, services) {
	/**
	 * Initial page to load after the splash. This will act as the home or hub
	 * page where the user will branch out from.
	 *
	 * @class HomePage
	 * @augments AbstractPage
	 */
	var HomePage = AbstractPage.subclass(/** @lends HomePage.prototype */ {
		/**
		 * Initialises the controller for the home page.
		 */
		initialisePage: function () {
			this._controller = new HomePageController();
			this._controller.on('renderComplete', _.bind(this.setContainerElementHTML, this));
			this._controller.renderView();

			this._controller.on('playClicked', _.bind(this._onPlayClicked, this));
		},

		/**
		 * When play is clicked we should redirect to the in game page.
		 *
		 * @private
		 */
		_onPlayClicked: function () {
			services.pageRouter.setHashUsingPage(GamePage);
		}
	});

	HomePage.extend(/** @lends HomePage */ {
		/**
		 * When this route is matched, this page will be instantiated.
		 *
		 * @param {Object} crossroads The current crossroads object you should create from.
		 * @return {Object} JS-Signal route from crossroads.
		 */
		getRoute: function (crossroads) {
			this._route = this._route || crossroads.addRoute('home');
			return this._route;
		}
	});

	return HomePage;
});
