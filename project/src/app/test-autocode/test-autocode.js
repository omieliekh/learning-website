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
	var editor, trace;

	$scope.codeInside = "function hello() {\n\n}";

	$scope.recording = false;

	$scope.startRecord = function(){
		$scope.recording = true;
		trace = [];
		recordTrace( null, editor.getValue() );
		// TestAutocodeService.startRecord();
	};

	$scope.stopRecord = function(){
		$scope.recording = false;
		// TestAutocodeService.stopRecord();
	};

	var recordTrace = function(info, text){
		trace = trace || [];

		trace.push({
			info: info,
			text: text
		});
	};

	$scope.aceLoaded = function(_editor) {
		// _editor.setReadOnly(true);

		editor = _editor;
		recordTrace( null, editor.getValue() );

		window.myEditor = _editor;
	};

	$scope.aceChanged = function(e) {
		var 
			range = e[0].data.range,
			text = editor.session.getTextRange(e[0].data.range)
		;

		if ($scope.recording){
			recordTrace(e[0].data, text);
		}
	};

	$scope.showTrace = function() {
		console.log('trace: ', trace);
		window.myTrace = trace;
	}

	$scope.playTrace = function() {
		editor.setValue('');

		var i;

		for(i=0; i<trace.length; i++){
			setTimeout(function(){
				var info = trace[this.i].info || { action: 'insertText', range: {start: {row: 0, column: 0}} }

				if ( info.action == 'insertText'){
					// console.log(trace[this.i].info.range.start.row, trace[this.i].info.range.start.column);
					editor.navigateTo(info.range.start.row, info.range.start.column);
					editor.insert(trace[this.i].text);
				} else if (info && info.action == 'removeText') {
					editor.removeSelectionMarker(info.range);
				}
			}.bind({i: i}), i*70);
		}
	}



}])

;

