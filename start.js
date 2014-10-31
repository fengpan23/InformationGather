var express = require('express'),
    path = require('path'),
    http = require('http');
var app = express(); 

app.set("jsonp callback", true);

app.use(express.cookieParser('sctalk admin manager'));
app.use(express.session({key: 'cloudSlide', cookie: {maxAge: 12*60*60*1000}, secret: 'keyboard cat'}));

app.use(express.logger('dev'));                      /* 'default', 'short', 'tiny', 'dev' */
app.use(express.bodyParser({uploadDir: "./temp", limit: '50mb'}));// parses request body and populates req.body Request Entity limit 5mb
// app.use(express.bodyParser({limit: '50mb'}));
app.use(express.methodOverride());          // checks req.body for HTTP method overrides
app.use(app.router);                       // perform route lookup based on url and HTTP method
app.set('view engine', 'ejs');               // set up ejs for templates
app.set('views', __dirname + '/views');
app.use(express.errorHandler({ dumpExceptions:true, showStack:true })); // Show all errors
app.set('port', process.env.PORT || 2324);
app.use(express.static(path.join(__dirname, 'app')));
    
var stu_handle = require('./server/student_handle');
app.get('/student', stu_handle.studentDetail);
app.get('/student/class', stu_handle.classStudents);
app.post('/student/add', stu_handle.addStudent);
app.post('/student/xlsx', stu_handle.addStudents);
app.put('/student/update', stu_handle.updateStudent);
app.delete('/student', stu_handle.deleteStudent);

var dir_handle = require('./server/directory_handle');
app.get('/school', dir_handle.school);
app.get('/school/all', dir_handle.schoolDir);
app.post('/school/add', dir_handle.addSchoolDir);
app.delete('/school/del', dir_handle.deleteSchoolDir);

app.get('/grade/all', dir_handle.gradeDir);
app.post('/grade/add', dir_handle.addGradeDir);
app.delete('/grade/del', dir_handle.deleteGradeDir);

app.get('/class/all', dir_handle.classDir);
app.post('/class/add', dir_handle.addClassDir);
app.delete('/class/del', dir_handle.deleteClassDir);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
