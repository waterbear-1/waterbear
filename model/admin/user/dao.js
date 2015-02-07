var mysql = require('mysql');
var crypto = require('crypto');
var c = require('../../../config/config');
var m = eval("c.config." + c.config.config + ".mysql");
var log = eval("c.config." + c.config.config + ".log");
log.debug("i am user dao",m);

var option = {
	host: m.db_host,
	port: m.db_port,
	user: m.username,
	password: m.password,
	database: m.db_name
}

exports.login = login;
exports.reg = reg;


function reg(obj, cb) {
	openConn(function(client) {
		//TODO 
		log.info("reg:" + obj.user);
	})
}


function login(obj, cb) {
	if (obj) {
		if (obj.psw) {
			obj.psw = md5(obj.psw + "")
		}
	}
	openConn(function(client) {
		log.debug(obj);
		client.query(
			'select  *  from   user_base   where     login_name= ? and login_psw=?', [obj.name, obj.psw],
			function(err, results) {
				log.debug("i get the db message is ", results)
				if (err) {
					log.error(err);
					return;
				}
				if (results.length > 0) {
					cb(true);
				} else {
					cb(false);
				}
				client.end();
			}
		);
	})

}

function md5(text) {
	var one = one + crypto.createHash('md5').update(text).digest('hex');
	return crypto.createHash('md5').update(one).digest('hex');
};


function openConn(cb) {
	var client = mysql.createConnection(option);
	cb(client);
}