define(function(require) {
	angular.module("school.manage", [])
		.controller("SchoolManage", function($scope, $http, $routeParams) {

			var schoolId = $routeParams.id;
			$http({
				method: 'GET',
				params: {
					schoolId: schoolId
				},
				url: '/school'
			}).
			success(function(data, status, headers, config) {
				$scope.school = data;
			}).error(function(data, status, headers, config) {
				console.log(data);
			});

			$scope.deleteSchool = function() {

			};
		});
});