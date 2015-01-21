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
	$scope.aceLoaded = function(editor) {
		editor.setOptions({
			fontSize: "16px"
		});
	};

	$scope.tasks = [
		{
			preTitle: 'Level 1',
			title: 'Create some basic thing',
			status: 'inprogress' // inprogress | closed
		},
		{
			preTitle: 'Level 2',
			title: 'Now create something more complicated',
			status: 'open'
		},
		{
			preTitle: 'Level 3',
			title: 'Almost finished. Take few more minutes...',
			status: 'open'
		},
		{
			preTitle: 'Level 4',
			title: 'Final steps. Finish your job',
			status: 'open'
		},
		{
			preTitle: 'Level 5',
			title: 'Final steps. Finish your job',
			status: 'open'
		},
		{
			preTitle: 'Level 6',
			title: 'Final steps. Finish your job',
			status: 'open'
		}
	];

	/*$scope.resetAllTasks = function(){
		for (i=0; i<tasks.length; i++){
			tasks[i].status = 'open';
		}

		$scope.goToNextTask();
	}*/

	$scope.goToNextTask = function(){
		var 
			i,
			currentTaskIsFound = false,
			tasks = $scope.tasks
		;

		for (i=0; i<tasks.length; i++){
			console.log('tasks['+i+']: ', JSON.stringify(tasks[i]) );

			if (tasks[i].status == 'inprogress'){
				currentTaskIsFound = true;
				tasks[i].status = 'closed';
				
				if (tasks[i+1]){
					tasks[i+1].status = 'inprogress';
				}

				break;
			}
		}

		console.log(tasks);

		if (!currentTaskIsFound && tasks[0] && tasks[0].status == 'open'){
			tasks[0].status = 'inprogress';
		} else {
			console.warn('goToNextTask. No valid tasks found');
		}

		$scope.$apply();
	};


	setInterval(function(){
		$scope.goToNextTask();
	}, 1500);

	/*setTimeout(function(){
		$scope.goToNextTask();
	}, 4000);*/
})

;
