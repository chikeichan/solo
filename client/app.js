angular.module('waitly',[
	'waitly.header',
	'waitly.waitlist',
	'waitly.filter',
	'waitly.signin',
	'waitly.signup',
	'waitly.owner',
	'ngRoute'
])
.config(function($routeProvider,$httpProvider){
	$routeProvider
	.when('/signup',{
		template: "<sign-up></sign-up>",
		controller: "SignupController"
	})
	.when('/index', {
		template: "<filter-bar></filter-bar>",
		controller: "FilterController",
		authenticate: true
	})
	.when('/ownerpage', {
		template: "<owner-page></owner-page>",
		controller: "OwnerController",
		// authenticate: true,
		owner: true
	})
	.when('/signin', {
		template: "<sign-in></sign-in>",
		controller: "SigninController"
	})
	.when('/owner', {
		template: "<owner-signup></owner-signup>",
		controller: "OwnerController"
	})
	.when('/refresh', {
		redirectTo: "/ownerpage"
	})
	.when('/:id', {
		template: "<wait-list></wait-list><filter-bar></filter-bar>",
		controller: "WaitlistController",
		authenticate: true
	})
	.otherwise({
		redirectTo: '/signin'
	})
})

.factory('Waitlist',function($http){
	var waitlist = {};

	waitlist.filterName = '';

	waitlist.parties = [];
	waitlist.getParties = function(){
	$http.get('/api/waitlists')
		.success(function(data){
			waitlist.parties = data;
		})
	}
	waitlist.getParties();

	waitlist.getWaiting = function(cb){
		var waiting = {};
		this.parties.forEach(function(d){
			if(!waiting[d.restaurant]){
				waiting[d.restaurant] = 0;
			}
			if(d.status !== 'Seated'){
				waiting[d.restaurant]++;
			}
		})
		cb(waiting);
	}

	return waitlist;
})

.factory('Restaurant',function($http){
	var restaurant = {};

	restaurant.data = [];

	restaurant.getData = function(){
		$http.get('/api/restaurants')
			.success(function(data){
				restaurant.data = data;
			})
	};

	restaurant.getData();

	return restaurant;
})

.factory('Auth',function($http, $location, $window){
	var signup = function (user) {
		return $http({
			method: 'POST',
			url: '/api/users/signup',
			data: user
		})
		.then(function(resp){
			return resp.data.token;
		})
	}

	var signin = function (user) {
		return $http({
			method: 'POST',
			url: '/api/users/signin',
			data: user
		})
		.then(function(resp){
			return resp.data.token;
		})
	}

	var ownerSignin = function (restaurant) {
		return $http({
			method: 'POST',
			url: '/api/restaurants/signin',
			data: restaurant
		})
		.then(function(resp){
			return resp.data.token;
		})
	}

	var ownerSignup = function (restaurant) {
		return $http({
			method: 'POST',
			url: '/api/restaurants/signup',
			data: restaurant
		})
		.then(function(resp){
			return resp.data.token;
		})
	}

	return {
		signup: signup,
		signin: signin,
		ownerSignup: ownerSignup,
		ownerSignin: ownerSignin
	}
})

.run(function($rootScope, $location, $window,Auth) {
	$rootScope.$on('$routeChangeStart',function(evt,next,current){
		if(next.owner){
			if(!$window.localStorage['com.waitly.owner']){
				console.log('hi')
				return $location.path('/signin');
			}
		}
		if(next.authenticate){
			if($window.localStorage['com.waitly']==='undefined' || !$window.localStorage['com.waitly']){
				return $location.path('/signin');
			}
		}
	})
})
