var db = require('./db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//控制数据写入
var stuSchema = new Schema({
    stu_number: String,
    stu_idCard: String,
    stu_serial_number: String,
    stu_machine_number: String,

    stu_name: String,
    stu_gender: String,
    stu_birthday: {type: Date},

    stu_school: String,
    stu_grade: String,
    stu_class: String,

    stu_class_id: ObjectId,

    stu_guardian1_name: String,
    stu_guardian1_gender: String,
    stu_guardian1_tel: String,

    stu_guardian2_name: String,
    stu_guardian2_gender: String,
    stu_guardian2_tel: String,

    uploadTime: {type: Date, default: Date.now},
});

stuSchema.index({filename: -1});

var model = db.model('studentdb', stuSchema);

exports.stuModel = {
	findById: function(id, callback) {
        model.findById(id, function(err, item) {
            if(err){
                console.log("find By User Id fail: " );
                console.log(err);
                return callback(false);
            }
            callback(item);
        });
    },
    find: function(tag, callback){
        model.find(tag, function(err, result){
            if(err){
                return callback(false);
            }
            callback(result);
        });
    },
    add: function(data, callback) {
        var entity = new model(data);
        entity.save(function(err, result){
            if(err){
                console.log('add folder error: ' + err);
                return callback(false);
            }
            callback(result);
        });
    },
    remove: function(id, callback){
        model.findByIdAndRemove(id, function(err, result){
            if(err){
                console.log('remove folder error: ' + err);
                return callback(false);
            }
            callback(result);
        });
    },
    update: function(id, data, callback){
        model.findByIdAndUpdate(id, data, function(err, result){
            if(err){
                console.log('findByIdAndUpdate student error: ' + err);
                return callback(false);
            }
            callback(result);
        });
    }
};