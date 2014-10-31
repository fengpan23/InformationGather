define(function(require) {
	angular.module('ui.machine.number', []).controller('MachineNumberCtrl', function($scope, $modalInstance, students) {
		$scope.mark = 0;
		$scope.$watch('mark', function(newValue, oldValue, $scope){
			$scope.student = students[newValue];
		});

		$scope.studentLoad = function($event){
			if($event.keyCode === 13){
				console.log($scope.stu_machine_number);
				$scope.mark += 1;
			}
		};
		$scope.ok = function(tag) {
			$scope.mark += tag;
			if($scope.mark < 0){
				alert('已经是最前面一个了');
				$scope.mark = 0;
				return;
			}
			if($scope.mark > students.length - 1){
				alert('已是最后一个');
				$scope.mark = students.length - 1;
			}
		};
		$scope.cancel = function() {
			// $modalInstance.dismiss('cancel');
			$modalInstance.close();
		};
	});

});