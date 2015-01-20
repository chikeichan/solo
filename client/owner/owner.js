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
				password: pw
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

	$scope.startTimer = function(check){
		if(check.party.timer === 'Sent Notification'){
			$scope.parties.forEach(function(party,i){
				if(check.party.waitlistID === party.waitlistID){
					$scope.parties.splice(i,1);
				}
			})
		}
		$scope.parties.forEach(function(party){
			if(check.party.waitlistID === party.waitlistID){
				party.timer = 'Sent Notification';
			}
		})
		
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
		link: function(scope, el, attr){
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