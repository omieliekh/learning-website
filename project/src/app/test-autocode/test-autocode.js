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


	// $scope.captureEvent = function(e){
	// 	var value = String.fromCharCode(e.keyCode);
	// 	console.log('e: ', e, ' , value: ', value);
	// };

	$scope.aceLoaded = function(editor) {
		// _editor.setReadOnly(true);
		console.log('aceLoaded. editor: ', editor);

		window.myEditor = editor;

		// myEditor.commands.exec("selectall", myEditor)

		// editor.commands.addCommand({
		// 	name: "inserttext",
		// 	exec: function(editor, args, request) {
		// 	    var lang = require("ace/lib/lang");

		// 	    editor.insert(lang.stringRepeat(args.text || "", args.times || 1));

		// 	    if (autocompleting) {

		// 	        var command = editor.commands.commands['autocomplete'];

		// 	        command.exec(editor);
		// 	    }
		// 	}
		// });
		// editor.commands.addCommand({
		// 	name: "triggerAutocomplete",
		// 	bindKey: {
		// 	    win: "Ctrl-Space",
		// 	    mac: "Ctrl-Space",
		// 	    sender: "editor"
		// 	},
		// 	exec: function(editor, args, request) {
		// 	    setTimeout(function() {
		// 	        generateAdvice(AdviceOn.COMMAND);
		// 	    }, 0);
		// 	}
		// });
	};

	$scope.aceChanged = function(e) {
		console.log('aceChanged. e[0]: ', e[0]);
	};



}])

;

