module.exports = {
	'appName'	: 'student information management',
	'host'		: 'localhost',
	// 'db'		: { uri : 'mongodb://172.17.0.30:27017/deckdb'},
	'db'		: { uri : 'mongodb://n01.lxpt.cn:49175/studb'},
	// 'db'		: { uri : 'mongodb://localhost:27017/studb'},		
	'header'	: { 'Content-Type' : 'application/json', 
					'X-Requested-With' : true,
					'Access-Control-Allow-Origin' : '*',
					},
	'loadedOn'	: new Date(),
	'locals'	: {} 
};