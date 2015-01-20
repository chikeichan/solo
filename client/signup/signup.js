angular.module('waitly.signup',[])

.controller('SignupController', function($scope, $window, $location, Auth){
	angular.extend($scope,Auth);

	$scope.create = function(name, pw){
		Auth.signup({username: name, password: pw})
			.then(function(token){
				$window.localStorage.setItem('com.waitly',token);
				$location.path('/index');
			})
			.catch(function(error){
				console.log(error);
			})
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