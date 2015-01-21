angular.module( 'ngBoilerplate.skills', [
	'ui.router'
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'skills', {
		url: '/skills',
		views: {
			"main": {
				controller: 'SkillsCtrl',
				templateUrl: 'skills/skills.tpl.html'
			}
		},
		data:{ pageTitle: 'Skills' }
	});
})

.controller( 'SkillsCtrl', function SkillsController( $scope ) {
	$scope.goToLesson = function(url){
		location.hash = '/lesson/'+(url || '');
	};

	$scope.skills = [
		[
			{
				url: 'programmingLanguagesBasics',
				text: 'Programming Languages Basics',
				cls: 'col-lg-4'
			},
			{
				url: 'htmlBasics',
				text: 'HTML Basics',
				cls: 'col-lg-4'
			},
			{
				text: 'Algorithm Basics',
				cls: 'col-lg-4'
			}
		],
		[
			{
				text: 'Web-design Basics',
				cls: 'col-lg-6'
			},
			{
				text: 'CSS Basics',
				cls: 'col-lg-6'
			}
		],
		[
			{
				text: 'JavaScript Basics',
				cls: 'col-lg-4'
			},
			{
				text: 'Usability',
				cls: 'col-lg-4'
			},
			{
				text: 'OOP principles',
				cls: 'col-lg-4'
			}
		],
		[
			{
				text: 'Calculator',
				cls: 'col-lg-3'
			},
			{
				text: 'Bubble Sorting',
				cls: 'col-lg-3'
			},
			{
				text: 'Landing Page',
				cls: 'col-lg-3'
			},
			{
				text: 'Textual Quest',
				cls: 'col-lg-3'
			}
		]
	];

})

;

