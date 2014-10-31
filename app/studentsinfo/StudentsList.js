define(function(require) {
	require('ngFileUploadShim');
	require('ngFileUpload');
	require('ngRoute');
	require('bootstrapUI');

	require('modals/machine_number_entry/MachineNumber');

	angular.module('ngApp.studentsinfo', ['ngRoute', 'angularFileUpload', 'ui.bootstrap', 'ui.machine.number']).config(
		function($routeProvider, $locationProvider) {
			$locationProvider.html5Mode(true).hashPrefix('!');

			$routeProvider.when('/:id/add/student', {
				templateUrl: '/studentsinfo/studentdetail.tlp.html',
				controller: 'StudentAddCtrl',
			}).when('/class/:id', {
				templateUrl: '/studentsinfo/studentslist.tlp.html',
				controller: 'StudentsListCtrl',
			}).when('/student/detail/:id', {
				templateUrl: '/studentsinfo/studentdetail.tlp.html',
				controller: 'StudentDetail',
			}).otherwise({
				redirectTo: '/'
			});
		}).run(function($rootScope, $location) {
		var parsePath = function(path) {
			$rootScope.subPath = path;
			return path.replace(/^(\/\w+?)(\/\w*)?$/, '$1')
		};
		$rootScope.path = parsePath($location.path());
		$rootScope.$on('$routeChangeSuccess', function(newVal) {
			$rootScope.path = parsePath($location.path());
		});
	}).factory('gender', function(){
		return ['男', '女']
	}).controller('StudentsListCtrl',
		function($scope, $routeParams, $location, $http, $modal) {
			$scope.students = [];
			$scope.classId = $routeParams.id;

			$http({
				method: 'GET',
				params: {
					classId: $scope.classId
				},
				url: '/student/class'
			}).success(function(data, status, headers, config) {
				if (data.length > 0) {
					$scope.students = data;
				} else {
					$location.path('/' + $scope.classId + '/add/student');
				}
			}).error(function(data, status, headers, config) {
				console.log(data);
			});

			$scope.showDetail = function() {
				$location.path('/student/detail/' + this.student._id);
			};
			$scope.checkStu = function($event) {
				this.student.select = $event.currentTarget.checked;
				$event.stopPropagation();
			};
			$scope.delSelectStu = function() {
				var delStuCount = 0;
				angular.forEach($scope.students, function(student, index) {
					if (student.select) {
						$scope.students.splice(index, 1);
						$http({
							method: 'delete',
							params: {
								studentId: student._id
							},
							url: '/student'
						}).success(function(data, status, headers, config) {
							if (data) {
								console.log('delete success student: ' + data._id)
							}
						}).error(function(data, status, headers, config) {
							console.log(data);
						});
						delStuCount += 1;
					}
				});
				if (!delStuCount) {
					alert('你还没有选择需要删除的学生~！');
				}
			};
			$scope.showMachineNumberModal = function() {
				$modal.open({
					templateUrl: '/modals/machine_number_entry/machineNumber.tlp.html',
					controller: 'MachineNumberCtrl',
					resolve: {
						students: function() {
							return $scope.students;
						}
					}
				});
			};
		}).controller('StudentDetail',
		function($scope, $routeParams, $location, $http) {
			$scope.header = "学生详细信息";
			$scope.motion = "update";

			$scope.grades = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级'];

			var studentId = $routeParams.id;
			$http({
				method: 'GET',
				params: {
					studentId: studentId
				},
				url: '/student'
			}).success(function(data, status, headers, config) {
				if (data) {
					console.log(data);
					$scope.stu = data;
				} else {
					console.log(data);
				}
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
			$scope.formSubmit = function() {
				$http({
					method: 'put',
					url: '/student/update',
					data: this.stu
				}).success(function(data, status, headers, config) {
					if (data) {
						$location.path('/class/' + data.stu_class_id);
					} else {
						console.log(data);
					}
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			}
		}).controller('StudentAddCtrl',
		function($scope, $routeParams, $location, $http, gender) {
			$scope.header = "添加学生信息";
			$scope.motion = "submit";
			$scope.genders = gender;
			$scope.grades = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级'];
			$scope.stu = {};
			$scope.stu.stu_class_id = $routeParams.id;
			$scope.formSubmit = function() {
				$http({
					method: 'post',
					url: '/student/add',
					data: $scope.stu
				}).success(function(data, status, headers, config) {
					if (data) {
						$location.path('/class/' + data.stu_class_id);
					} else {
						console.log(data);
					}
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			}
		}).controller("importController",
		function($scope, $upload, $location) {
			$scope.onFileSelect = function($files) {
				$scope.files = $files;
			}
			$scope.importFile = function() {
				var classId = $scope.$parent.stu.stu_class_id;
				$upload.upload({
					url: '/student/xlsx',
					data: {
						classId: classId
					},
					file: $scope.files[0],
				}).progress(function(evt) {
					console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
				}).success(function(data, status, headers, config) {
					$location.path('/class/' + $scope.$parent.stu.stu_class_id);
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			}
			$scope.exportTemplate = function(path) {
				var a = document.createElement('a');
				a.href = path;
				a.click();
			}
		});
});