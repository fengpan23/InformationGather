define(function(require) {
	require('_');
	require('./SchoolManage');
	require('./GradeManage');
	var dirModule = angular.module('ngApp.dir', ['school.manage', 'grade.manage', 'ngRoute']);
	dirModule.config(function($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(true).hashPrefix('!');

		$routeProvider.when('/school/:id', {
			templateUrl: '/directory/schoolmanage.tlp.html',
			controller: 'SchoolManage'
		}).when('/grade/:id', {
			templateUrl: '/directory/grademanage.tlp.html',
			controller: 'GradeManage',
		});
	});

	dirModule.controller("schoolController", function($scope, $http) {
			$scope.schools = [];

			$http({
				method: 'GET',
				url: '/school/all'
			}).
			success(function(data, status, headers, config) {
				$scope.schools = data;
			}).
			error(function(data, status, headers, config) {
				console.log(data);
			});
			$scope.addSchool = function() {
				if (!$scope._schoolName) {
					return;
				}
				$http({
					method: 'post',
					data: {
						school_name: $scope._schoolName
					},
					url: '/school/add'
				}).
				success(function(data, status, headers, config) {
					$scope.schools.push(data);
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
			};
			$scope.editSchool = function() {
				console.log(this);
			};
			$scope.deleteSchool = function() {
				var schoolId = this.$parent.school._id;
				$http({
					method: 'delete',
					params: {
						schoolId: schoolId
					},
					url: '/school/del'
				}).
				success(function(data, status, headers, config) {
					$scope.schools = _.filter($scope.schools, function(school) {
						return school._id !== schoolId;
					});
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			};
		}
	);

	dirModule.controller("gradeController", function($scope, $http) {
			$scope.grades = [];
			$scope.list = "hide";
			$scope.getGrade = function() {
				if ($scope.list === 'show') {
					$scope.list = 'hide';
					return;
				}
				$http({
					method: 'GET',
					params: {
						schoolId: this.school._id
					},
					url: '/grade/all'
				}).
				success(function(data, status, headers, config) {
					$scope.grades = data;
					$scope.list = "show";
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			};
			$scope.addGrade = function() {
				if (!$scope._gradeName) {
					return;
				}
				$http({
					method: 'post',
					data: {
						grade_name: $scope._gradeName,
						school_id: this.$parent.school._id
					},
					url: '/grade/add'
				}).
				success(function(data, status, headers, config) {
					$scope.grades.push(data);
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
			};
			$scope.editGrade = function() {
				console.log(this);
			};
			$scope.deleteGrade = function() {
				var gradeId = this.$parent.grade._id;
				$http({
					method: 'delete',
					params: {
						gradeId: gradeId
					},
					url: '/grade/del'
				}).
				success(function(data, status, headers, config) {
					$scope.grades = _.filter($scope.grades, function(grade) {
						return grade._id !== gradeId;
					});
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			};
		}
	);

	dirModule.controller("classController", ["$scope", "$http",
		function($scope, $http) {
			$scope.classs = [];
			$scope.clist = 'hide';
			$scope.getClass = function() {
				if ($scope.clist === 'show') {
					$scope.clist = "hide";
					return;
				}
				$http({
					method: 'GET',
					params: {
						gradeId: this.$parent.grade._id
					},
					url: '/class/all/'
				}).
				success(function(data, status, headers, config) {
					$scope.clist = "show"
					$scope.classs = data;
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			};
			$scope.addClass = function() {
				if (!$scope._className) {
					return;
				}
				$http({
					method: 'post',
					data: {
						class_name: $scope._className,
						grade_id: this.$parent.grade._id
					},
					url: '/class/add'
				}).
				success(function(data, status, headers, config) {
					$scope.classs.push(data);
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
			};
			$scope.editClass = function() {
				console.log(this);
			};
			$scope.deleteClass = function($event) {
				$event.stopPropagation();
				$event.preventDefault();
				var classId = this._class._id;
				$http({
					method: 'delete',
					params: {
						classId: classId
					},
					url: '/class/del'
				}).
				success(function(data, status, headers, config) {
					$scope.classs = _.filter($scope.classs, function(_class) {
						return _class._id !== classId;
					});
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
				return false;
			};
		}
	]);
});