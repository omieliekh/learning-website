angular.module( 'testAutocode', [
	'ui.router'
])

.config(['$stateProvider', function ( $stateProvider ) {
	var 
		moduleName = 'test-autocode',
		moduleCtrl = 'TestAutocodeCtrl',
		moduleTitle = 'Test Autocode'
	;

	$stateProvider.state( moduleName, {
		url: '/'+moduleName,
		views: {
			"main": {
				controller: moduleCtrl,
				templateUrl: moduleName+'/'+moduleName+'.tpl.html'
			}
		},
		data:{ pageTitle: moduleTitle }
	});
}])

.service('TestAutocodeService', function () {
	this.startRecord = function(){

	};

	this.stopRecord = function(){

	};


})

.controller( 'TestAutocodeCtrl', ['$scope', 'TestAutocodeService', function ( $scope, TestAutocodeService ) {
	$scope.codeInside = "function hello() {\n\n}";

	$scope.startRecord = function(){
		TestAutocodeService.startRecord();


	};

	$scope.stopRecord = function(){
		TestAutocodeService.stopRecord();


	};


	$scope.captureEvent = function(e){
		

		var value = String.fromCharCode(e.keyCode);

		console.log('e: ', e, ' , value: ', value);
	};


}])

;

