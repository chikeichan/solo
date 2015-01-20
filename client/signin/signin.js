angular.module('waitly.signin',[])

.controller('SigninController', function($scope){
	$scope.user = {};

	$scope.create = function(name, password){
		
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