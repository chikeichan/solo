angular.module('waitly.filter',[])

.controller('FilterController', function($scope,Restaurant){
	angular.extend($scope,Restaurant);
	console.log($scope.data);
})

.directive('filterBar', function(){
	return {
		retrict: 'EA',
		scope: false,
		templateUrl: './filter/filter.html',
		link: function(scope,el){

		}
	}
})