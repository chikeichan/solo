angular.module('waitly.header',[])

.controller('HeaderController', function($scope, $window, $location){
  $scope.logout = function(){
    $window.localStorage.removeItem('com.waitly.owner');
    $window.localStorage.removeItem('com.waitly.ownername');
    $window.localStorage.removeItem('com.waitly');
    $location.path('/signin');
  }

})

.directive('headerBar', function(){
	return {
		retrict: 'EA',
		scope: false,
		templateUrl: './header/header.html',
		link: function(scope,el,attr){
      $(el).on('keydown','input',function(e){
        if(e.keyCode === 13){

        }
      })
		}
	}
})
