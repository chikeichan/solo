angular.module('waitly.owner',[])

.controller('OwnerController', function($scope, $window, $location, $http, Auth, Restaurant, Waitlist){
	angular.extend($scope, Auth, Restaurant, Waitlist);

	$scope.getData();
	$scope.getParties();
	$scope.filter = $window.localStorage['com.waitly.ownername'];

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
					$window.localStorage.setItem('com.waitly.ownername',name);
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
		scope: '=',
		templateUrl: './owner/owner.html',
		link: function(){
			
		}
	}
})

.directive('ownerPage', function(){
	return {
		retrict: 'EA',
		scope: "=",
		templateUrl: './owner/ownerpage.html',
		link: function(){
			
		}
	}
})