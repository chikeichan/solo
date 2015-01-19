angular.module('waitly.waitlist',[])

.controller('WaitlistController', function($scope){
	$scope.parties = [
		{
			name: 'Jacky',
			size: 2,
			time: new Date()
		},
		{
			name: 'Chan',
			size: 5,
			time: new Date()
		}
	];
})

.directive('waitList', function(){
	return {
		retrict: 'EA',
		scope: false,
		templateUrl: './waitlist/waitlist.html',
		link: function(scope, el, attrs){
			$('#party').on('click',function(){
				$(this).css('backgorund-color', 'rgb(210,210,210)')
			})
		}
	}
})