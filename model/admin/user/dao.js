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


/* �û���֤���û���Ϣ */
function login(obj, cb) {
	if(obj){
		if(obj.psw){
			obj.psw=md5(obj.psw+"")
		}
	}
	openConn(function(client){
		log.info(obj.psw);
		/* ��������һ��sql��䣬���ڼ���û������Ƿ�ƥ�� */
		
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
		//�ر����ݿ�����
		
		cb(true);
	})
	
}
/* md5 ���� */
function md5(text) {   
    var one=one+crypto.createHash('md5').update(text).digest('hex');
	return crypto.createHash('md5').update(one).digest('hex');
};


/* ������������ݿ� */
function openConn(cb) {
	var client = mysql.createConnection(option);
	cb(client);
}


