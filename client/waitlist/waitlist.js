angular.module('waitly.waitlist',[])

.controller('WaitlistController', function($scope, Waitlist){
	angular.extend($scope,Waitlist)

	$scope.createParty = function(name,size){
		if(!name || !size){
			return;
		}
		$scope.parties.push({
			name: name,
			size: size,
			time: new Date()
		})
	}
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