require.config({
	baseUrl: './src/assets/js',
	paths: {
		almond: '../../../bower_components/almond/almond',
		angular: '../../../bower_components/angular/angular'
	},
	shim: {
		angular: {
			exports: 'angular'
		}
	}
});
