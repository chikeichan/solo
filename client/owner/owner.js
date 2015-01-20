angular.module('waitly.owner',[])

.controller('OwnerController', function($scope, $window, $location, Auth){
	angular.extend($scope,Auth);

	$scope.create = function(name, pw, owner, type){
		if(!owner){
			Auth.signup({username: name, password: pw})
				.then(function(token){
					$window.localStorage.setItem('com.waitly',token);
					$location.path('/index');
				})
				.catch(function(error){
					console.log(error);
				})
		} else {
			Auth.ownerSignup({
				name: name,
				type: type,
				pw: pw,
				averageWaitTime: 30
			}).then(function(token){
					$window.localStorage.setItem('com.waitly.owner',token);
					$location.path('/ownerpage');
				})
				.catch(function(error){
					console.log(error);
				})

		}
	}


})

.directive('ownerSignup', function(){
	return {
		retrict: 'EA',
		scope: false,
		templateUrl: './owner/owner.html',
		link: function(){
			
		}
	}
})