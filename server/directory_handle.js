var _school = require('./models/schoolModel');
var _grade = require('./models/gradeModel');
var _class = require('./models/classModel');

exports.schoolDir = function(req, res){
	_school.schoolModel.findAll(function(result){
		res.send(result);
	});
};
exports.school = function(req, res){
	var schoolId = req.query.schoolId;
	_school.schoolModel.findById(schoolId, function(result){
		res.send(result);
	});
};
exports.addSchoolDir = function(req, res){
	var data = req.body;
	_school.schoolModel.add(data, function(result){
		res.send(result);
	});
};
exports.deleteSchoolDir = function(req, res){
	//if dir has subdirectories delete all subdirectories ???
	var schoolId = req.query.schoolId;
	_school.schoolModel.remove(schoolId, function(result){
		res.send(result);
	});
};
exports.gradeDir = function(req, res){
	var schoolId = req.query.schoolId;
	_grade.gradeModel.find({school_id: schoolId}, function(result){
		res.send(result);
	});
};
exports.addGradeDir = function(req, res){
	var data = req.body;
	_grade.gradeModel.add(data, function(result){
		res.send(result);
	});
};
exports.deleteGradeDir = function(req, res){
	//if dir has subdirectories delete all subdirectories ???
	var gradeId = req.query.gradeId;
	_grade.gradeModel.remove(gradeId, function(result){
		res.send(result);
	});
};
exports.classDir = function(req, res){
	var gradeId = req.query.gradeId;
	_class.classModel.find({grade_id: gradeId}, function(result){
		res.send(result);
	});
};
exports.addClassDir = function(req, res){
	var data = req.body;
	_class.classModel.add(data, function(result){
		res.send(result);
	});
};
exports.deleteClassDir = function(req, res){
	//if dir has subdirectories delete all subdirectories ???
	var classId = req.query.classId;
	_class.classModel.remove(classId, function(result){
		res.send(result);
	});
};
