var mysql = require('mysql');
var crypto = require('crypto');
var c = require('../../../config/config')
	var m = eval("c.config." + c.config.config + ".mysql")
	var log = eval("c.config." + c.config.config + ".log")
	log.info(m);

var option = {
	host : m.db_host,
	port : m.db_port,
	user : m.username,
	password : m.password,
	database : m.db_name
}

exports.login = login;
exports.reg = reg;


function reg(){
	
}


/* 用户验证，用户信息 */
function login(obj, cb) {
	if(obj){
		if(obj.psw){
			obj.psw=md5(obj.psw+"")
		}
	}
	openConn(function(client){
		log.info(obj.psw);
		/* 这里增加一个sql语句，用于检查用户密码是否匹配 */
		
		client.query(
			'select * from wb_url_base where ? ,?', [obj.user,obj.psw],
			function(err, results) {
				if (err) {
					console.log(err);
					return;
				}
				if (results.length > 0) {
					cb(true);
					client.end();
				} else {
					cb(false);
					client.end();
				}
			}
		);
		//关闭数据库连接
		
		cb(true);
	})
	
}
/* md5 加盐 */
function md5(text) {   
    var one=one+crypto.createHash('md5').update(text).digest('hex');
	return crypto.createHash('md5').update(one).digest('hex');
};


/* 用来方便打开数据库 */
function openConn(cb) {
	var client = mysql.createConnection(option);
	cb(client);
}


