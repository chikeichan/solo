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
	.when('/signin', {
		template: "<sign-in></sign-in>",
		controller: "SigninController"
	})
	.when('/owner', {
		template: "<owner-signup></owner-signup>",
		controller: "OwnerController"
	})
	.when('/ownerpage', {
		template: "<owner-page></owner-page>",
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
		template: '<sign-in></sign-in>',
		controller: "SigninController"
	})
})

.factory('Waitlist',function($http){
	var waitlist = {};

	waitlist.filterName = '';

	waitlist.parties = [];
	waitlist.getParties = function(){
	$http.get('/api/waitlists')
		.success(function(data){
			console.log(data);
			waitlist.parties = data;
		})
	}
	waitlist.getParties();
	
	return waitlist;
})

.factory('Restaurant',function($http){
	var restaurant = {};

	restaurant.data = [];

	restaurant.getData = function(){
		$http.get('/api/restaurants')
			.success(function(data){
				console.log(data);
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
		if(next.authenticate){
			if($window.localStorage['com.waitly']==='undefined'){
				return $location.path('/signin');
			}
		}
	})
})