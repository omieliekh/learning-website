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
	$scope.methods = {
		aceLoaded: function(editor) {
			editor.setOptions({
				fontSize: "14px"
			});
		},

		aceChanged: function(){
			if(!$scope.$$phase) {
				$scope.$apply();
			}
		},

		resetAllTasks: function(){
			for (i=0; i<tasks.length; i++){
				tasks[i].status = 'open';
			}

			$scope.goToNextTask();
		},

		goToNextTask: function(){
			var 
				i,
				currentTaskIsFound = false,
				tasks = $scope.tasks
			;

			for (i=0; i<tasks.length; i++){
				// console.log('tasks['+i+']: ', JSON.stringify(tasks[i]) );

				if (tasks[i].status == 'inprogress'){
					currentTaskIsFound = true;
					tasks[i].status = 'closed';
					
					if (tasks[i+1]){
						tasks[i+1].status = 'inprogress';
					}

					break;
				}
			}

			if (!currentTaskIsFound && tasks[0] && tasks[0].status == 'open'){
				tasks[0].status = 'inprogress';
			} else {
				//console.warn('goToNextTask. No valid tasks found');
			}

			if(!$scope.$$phase) {
				$scope.$apply();
			}
		},

		activateFile: function(fileObj){
			var i;

			for (i=0; i<$scope.files.length; i++){
				if (fileObj == $scope.files[i]){
					$scope.activeFile = i;
				} else {
					
				}				
			}
		},

		addFile: function(){
			var 
				filename = 'file'+( parseInt(Math.random()*100) ),
				rand = Math.random(),

				fileExt = (rand < 0.33) ? 'html' : ( (rand > 0.66) ? 'js' : 'css' ),

				fullFilename = filename+'.'+fileExt
			;

			$scope.files.push({
				name: fullFilename,
				code: '// '+fullFilename+' content'
			});
		},

		deleteFile: function(fileObj){
			var i;

			if ($scope.files.length <= 1){
				return;
			}

			for (i=0; i<$scope.files.length; i++){
				if (fileObj == $scope.files[i]){
					/*if (i < $scope.activeFile) {
						$scope.activeFile++;
					}*/

					$scope.files.splice(i, 1);

					$scope.activeFile = Math.min($scope.activeFile, $scope.files.length-1);

					break;
				}				
			}

			// if(!$scope.$$phase) {
			// 	$scope.$apply();
			// }

			console.log('deleteFile. $scope.files: ', $scope.files);
		}
	};

	$scope.activeFile = 0;

	$scope.$applyAsync = function(callback){
		callback();
	};

	$scope.files = [
		{
			name: 'index.html',
			code: '//test'
		},
		{
			name: 'script.js',
			code: '//hello world'
		}
	];

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

	var myIntervalCounter = 0;
	var myInterval = setInterval(function(){
		$scope.methods.goToNextTask();

		// console.log('activeFile: ', $scope.activeFile);
		// console.log( JSON.stringify($scope.files, null, "\t") );

		myIntervalCounter++;

		if (myIntervalCounter >= 7){
			clearInterval(myInterval);
		}
	}, 200);

	
})

;
