var module = angular.module('dwarf', [ 'ngRoute', 'ngAnimate']);

module.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'view/home.html',
		controller: 'homeController'
	})
	.when('/service', {
		templateUrl: 'view/services.html',
		controller : 'serviceController'
	})
	.when('/backlog',{
		templateUrl: 'view/backlog.html',
		controller : 'backlogController'
	})
	.when('/backlog/:id', {
		templateUrl: 'view/backlog_new.html',
		controller : 'backlogController'
	});
});

module.controller('containerController', function($scope, $http) {
	$scope.trns='fwd';
	$scope.prv=function(){
		$scope.trns='prv';
	};
	$scope.fwd=function(){
		$scope.trns='fwd';
	};
});


module.controller('backlogController', function($window, $rootScope, $scope, $http, $routeParams) {
	$rootScope.title='Backlog';
	var id = $routeParams['id']; 
	if (id == 'new'){
		$rootScope.nav = {
			"new": '',
			"prv": "#backlog"
		};
	} else {
		$rootScope.nav = {
			"new": '#backlog/new',
			"prv": "#/"
		};
	}
	$scope.form = {
			"title": 'Title',
			"labels": 'bug, fix',
			"body": 'new issue'
	};
	
	$scope.postIssue = function(){
		var data = $scope.form;
		$http({
		  url: '/issues',
		  method: 'POST',
		  data: data
		}).success(function(data, status, headers, config) {
			$scope.issues = data;
		}).error(function(data, status, headers, config) {
			console.log('error.');
		});
		$window.location.href = "#/backlog";
	};
	
	$http({
		url : '/issues',
		method : 'GET'
	}).success(function(data, status, headers, config) {
		$scope.issues = data;
	}).error(function(data, status, headers, config) {
		console.log('error.');
	});
});
module.controller('homeController', function($rootScope, $scope, $http, $routeParams) {
	$rootScope.title='Menu';
});
module.controller('serviceController', function($scope, $http, $routeParams) {
});