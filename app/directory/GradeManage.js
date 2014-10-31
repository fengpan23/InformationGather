define(function(require) {
	angular.module("grade.manage", [])
		.controller("GradeManage", function($scope, $http, $routeParams) {

			var gradeId = $routeParams.id;
			$scope.deleteSchool = function() {
				
			};
		});
});