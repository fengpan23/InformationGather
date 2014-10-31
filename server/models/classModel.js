var db = require('./db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//控制数据写入
var classSchema = new Schema({
    class_name: String,
    grade_id: ObjectId,
});
var model = db.model('classdb', classSchema);

exports.classModel = {
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
    findAll: function(callback){
        model.find(function(err, result){
            if(err){
                return callback(false);
            }
            callback(result);
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
};