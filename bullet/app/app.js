'use strict';

// Declare app level module which depends on views, and components
angular.module('d3Test', ['d3-bullet-module']);

angular.module('d3Test')

.controller('BulletCtrl', ['$scope', function($scope) {

	$scope.data = {};

	$scope.data.title = "Revenue";
	$scope.data.ranges = [.25,.5,.75];
	$scope.data.measures = [.35,.81];
	$scope.data.markers = [.6];

}]);