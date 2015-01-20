angular.module('waitly.signin',[])

.controller('SigninController', function($scope,$window, $location, Auth){
	$scope.user = {};

	$scope.login = function(name, pw, owner){
		if(!owner){
			Auth.signin({username: name, password: pw})
				.then(function(token){
					$window.localStorage.setItem('com.waitly',token);
					$location.path('/index');
				})
				.catch(function(error){
					$scope.loginName = '';
					$scope.loginPassword = '';
					$window.localStorage.removeItem('com.waitly');
					$location.path('/signin');
				})
		} else {
			Auth.ownerSignin({name: name, password: pw})
				.then(function(token){
					$window.localStorage.setItem('com.waitly.owner',token);
					$window.localStorage.setItem('com.waitly.ownername',name);
					$location.path('/ownerpage');
				})
				.catch(function(error){
					$scope.loginName = '';
					$scope.loginPassword = '';
					$window.localStorage.removeItem('com.waitly.owner');
					$window.localStorage.removeItem('com.waitly.ownername');
					$location.path('/signin');
				})
		}
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
