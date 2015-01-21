angular.module( 'ngBoilerplate.lesson', [
	'ui.router',
	'ui.ace'
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'lesson', {
		url: '/lesson/{lessonUrl}',
		views: {
			"main": {
				controller: 'LessonCtrl',
				templateUrl: 'lesson/lesson.tpl.html'
			}
		},
		data:{ pageTitle: 'Lesson' }
	});
})

.controller( 'LessonCtrl', function LessonCtrl( $scope, $state ) {
	console.log('$state.params.lessonUrl: ', $state.params.lessonUrl);

	$scope.aceLoaded = function(editor) {
		console.log('aceLoaded');
		console.log('editor: ', editor);

		window.myeditor = editor;

		
		editor.setOptions({
			fontSize: "16px"
		});
		
	};
	
})

;
