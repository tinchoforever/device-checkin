

function makerController($scope, $http) {
	$scope.save = function() {
		$http.post('/api/v1/checkins/',$scope.checkin)
			.success(function(r) { 
				console.log(r);
				window.location = "/";
		});
	}
}
makerController.$inject = ['$scope', '$http'];

function feedController ($scope, $http) {

	$http.get('data/checkins.json').success(function(data) {
		$scope.checkins = data;
		$scope.orderProp = 'date';
	});

}

function checkinDetailController($scope, $routeParams) {
	$scope.checkinId = $routeParams.checkinId;
}
feedController.$inject = ['$scope', '$http'];

angular.module('checkinscat', []).
config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/checkins', {templateUrl: 'partials/checkin-list.html',   controller: feedController})
	.when('/checkins/create', {templateUrl: 'partials/checkin-maker.html', controller: makerController})
	.when('/checkins/:checkinId', {templateUrl: 'partials/checkin-detail.html', controller: checkinDetailController})
	.otherwise({redirectTo: '/checkins'});
}]);