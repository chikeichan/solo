angular.module('waitly.waitlist',[])

.controller('WaitlistController', function($scope, $routeParams, $http, Waitlist, Restaurant){
	angular.extend($scope,Waitlist);

	if($routeParams.id){
		Restaurant.data.forEach(function(d){
			if(d.id == $routeParams.id){
				$scope.filterName = d.name;
			}
		})
	} else {
		$scope.filterName = '';
	}
	$scope.getParties();

	$scope.createParty = function(name,size){
		if(!name || !size){
			return;
		}

		var waitlist = {
			restaurantName: $scope.filterName,
			name: name,
			size: size,
			time: new Date()
		}

		$http({
			method: 'POST',
			url: '/api/waitlists',
			data: waitlist
		})
	};
})

.directive('waitList', function(){
	return {
		retrict: 'EA',
		scope: '=',
		templateUrl: './waitlist/waitlist.html',
		link: function(scope, el, attrs){
			$(el)
			.on('mouseenter','#party',function(){
				$(this).addClass('click')
			})
			.on('mouseleave','#party',function(){
				$(this).removeClass('click')
			})
		}
	}
})