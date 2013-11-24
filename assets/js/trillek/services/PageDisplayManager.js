// source
define([
	'stapes'
], function (Stapes) {
	/**
	 * Listens to events from the provided PageRouter instance. Where
	 * appropriate, it will hide and show pages in a manner it sees fit.
	 *
	 * It will also handle the creation of container elements for the page to
	 * render to. It should do this by listening to a controller which will
	 * send it's newly rendered content in an event.
	 *
	 * @class
	 */
	var PageDisplayManager = Stapes.subclass(/** @lends PageDisplayManager.prototype */ {
		/**
		 * Stores the passed in router and attaches the required events. It
		 * also defines the container element which will be used to render
		 * pages into.
		 *
		 * @param {Object} pageRouter Instance of the router you wish this to listen to.
		 * @constructs
		 */
		constructor: function (pageRouter) {
			this._pageRouter = pageRouter;
			pageRouter.on('pageSet', function (payload) {
				this.setCurrentPage(payload.to);
			}.bind(this));

			this._containerElement = document.createElement('div');
			document.body.appendChild(this._containerElement);
		},

		/**
		 * Gives the page a container element and displays it within the body.
		 *
		 * @param {Object} page
		 */
		setCurrentPage: function (page) {
			page.setContainerElement(this._containerElement);
		}
	});

	return PageDisplayManager;
});