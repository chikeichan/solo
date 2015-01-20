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
		var id = check.party._id;
		var newStatus;

		if(check.party.status === 'waiting'){
			newStatus = '9 minutes';
		}

		if(check.party.status === '15 minutes'){
			newStatus = '5 minutes';
		}

		if(check.party.status === '5 minutes'){
			newStatus = '1 minutes';
		}

		if(check.party.status === '1 minutes'){
			newStatus = 'Seated';
		}

		$http.put('/api/waitlists/'+id,{
			_id: id,
			status: newStatus
		}).success(function(){
			$location.path('/refresh')
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
