var _student = require('./models/studentModel');
var xlsx = require('node-xlsx');

exports.classStudents = function(req, res) {
	var classId = req.query.classId;
	_student.stuModel.find({
		stu_class_id: classId
	}, function(result) {
		res.send(result);
	});
};
exports.studentDetail = function(req, res) {
	var studentId = req.query.studentId;
	_student.stuModel.findById(studentId, function(result) {
		res.send(result);
	});
};
exports.addStudents = function(req, res) {
	var data = req.body;
	var classId = data.classId;
	var path = req.files.file.path;
	var obj = xlsx.parse(path);
	var data = obj[0].data;
	for (i in data) {
		if (i < 2) {
			continue;
		}
		var stu = {};
		stu.stu_class_id = classId;
		
		stu.stu_school = data[i][0];
		stu.stu_grade = data[i][1];
		stu.stu_class = data[i][2];
		stu.stu_number = data[i][3];
		stu.stu_name = data[i][4];
		stu.stu_serial_number = data[i][5];
		if (!stu.stu_school) {
			continue;
		}
		_student.stuModel.add(stu, function(result){
			console.log("add student: " + result.stu_name);
		});
	}
	res.send("success");
};
exports.addStudent = function(req, res) {
	var data = req.body;
	_student.stuModel.add(data, function(result) {
		res.send(result);
	});
};
exports.deleteStudent = function(req, res){
	var studentId = req.query.studentId;
	_student.stuModel.remove(studentId, function(result){
		res.send(result);
	});
};
exports.updateStudent = function(req, res) {
	var data = req.body;
	var studentId = data._id;
	_student.stuModel.update(studentId, data, function(result) {
		res.send(result);
	});
};