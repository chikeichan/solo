angular.module('waitly',[
	'waitly.header',
	'waitly.waitlist',
	'waitly.filter',
	'ngRoute'
])
.config(function($routeProvider){
	$routeProvider
	.when('/:id', {
		template: "<wait-list></wait-list>",
		controller: "WaitlistController"
	})
})

.factory('Waitlist',function(){
	var waitlist = {};

	waitlist.filterName = '';

	waitlist.parties = [
		{
			restaurantName: 'Spruce Cafe',
			name: 'Tony',
			size: 2,
			time: new Date()
		},
		{
			restaurantName: 'Cafe Des Amis',
			name: 'Marcus',
			size: 5,
			time: new Date()
		},
		{
			restaurantName: 'Anchor Oyster Bar',
			name: 'Fred',
			size: 4,
			time: new Date()
		},
		{
			restaurantName: 'Gary Danko',
			name: 'Shawn',
			size: 7,
			time: new Date()
		},
	];
	return waitlist;
})

.factory('Restaurant',function(){
	var restaurant = {};
	restaurant.data = [
		{
			id: 1,
			name: 'Spruce Cafe',
			type: 'Fine Dining',
			averageWaitTime: 90
		},
		{
			id:2,
			name: 'Cafe Des Amis',
			type: 'Casual Dining',
			averageWaitTime: 15
		},
		{
			id:3,
			name: 'Anchor Oyster Bar',
			type: 'Casual Dining',
			averageWaitTime: 75
		},
		{
			id:4,
			name: 'Gary Danko',
			type: 'Fine Dining',
			averageWaitTime: 120
		},
	];
	return restaurant;
})