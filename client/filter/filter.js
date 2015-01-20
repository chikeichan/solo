angular.module('waitly.filter',[])

.controller('FilterController', function($scope,$location,$http,Restaurant){
	angular.extend($scope,Restaurant);
	$scope.goFilter = function(id){
		$location.path(id);
	};

	$scope.getData();

})

.directive('filterBar', function(){
	return {
		retrict: 'EA',
		scope: '=',
		templateUrl: './filter/filter.html',
		link: function(scope,el,attr){
			$(el)
			.on('mouseenter','#restaurants',function(){
				$(this).addClass('click');
			})
			.on('mouseleave','#restaurants',function(){
				$(this).removeClass('click');
			})
		}
	}
})