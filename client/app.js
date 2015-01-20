angular.module('waitly',[
	'waitly.header',
	'waitly.waitlist',
	'waitly.filter',
	'ngRoute'
])
.config(function(){

})

.factory('Waitlist',function(){
	var waitlist = {};
	waitlist.parties = [
		{
			name: 'Tony',
			size: 2,
			time: new Date()
		},
		{
			name: 'Marcus',
			size: 5,
			time: new Date()
		},
		{
			name: 'Fred',
			size: 4,
			time: new Date()
		},
		{
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
			name: 'Spruce Cafe',
			type: 'Fine Dining',
			averageWaitTime: 90
		},
		{
			name: 'Cafe Des Amis',
			type: 'Casual Dining',
			averageWaitTime: 15
		},
		{
			name: 'Anchor Oyster Bar',
			type: 'Casual Dining',
			averageWaitTime: 75
		},
		{
			name: 'Gary Danko',
			type: 'Fine Dining',
			averageWaitTime: 120
		},
	];
	return restaurant;
})