angular.module('waitly.header',[])

.controller('HeaderController', function($scope){

})

.directive('headerBar', function(){
	return {
		retrict: 'EA',
		scope: false,
		templateUrl: './header/header.html',
		link: function(){

		}
	}
})