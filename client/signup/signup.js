angular.module('waitly.signup',[])

.controller('SignupController', function($scope, $window, $location, Auth){
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
				password: pw,
				averageWaitTime: 30
			}).then(function(token){
					$window.localStorage.setItem('com.waitly',token);
					$location.path('/owner');
				})
				.catch(function(error){
					console.log(error);
				})

		}
	}


})

.directive('signUp', function(){
	return {
		retrict: 'EA',
		scope: false,
		templateUrl: './signup/signup.html',
		link: function(){
			
		}
	}
})