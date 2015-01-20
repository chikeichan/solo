angular.module('waitly.signin',[])

.controller('SigninController', function($scope,$window, $location,Auth){
	$scope.user = {};

	$scope.login = function(name, pw){
		Auth.signin({username: name, password: pw})
			.then(function(token){
				$window.localStorage.setItem('com.waitly',token);
				$location.path('/index');
			})
			.catch(function(error){
				$scope.loginName = '';
				$scope.loginPassword = '';
				$window.localStorage.setItem('com.waitly',undefined);
				$location.path('/signin');
			})
	}


})

.directive('signIn', function(){
	return {
		retrict: 'EA',
		scope: false,
		templateUrl: './signin/signin.html',
		link: function(){
			
		}
	}
})