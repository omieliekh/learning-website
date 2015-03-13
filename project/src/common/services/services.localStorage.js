angular.module('ngBoilerplate.services')

.factory('localStorage', function(){
	return {
		load: function(id){
			return JSON.parse( localStorage.getItem(id) ) || [];
		},
		save: function(id, obj){
			localStorage.setItem( id, JSON.stringify(obj) );
		}
	};

});