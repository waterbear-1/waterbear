var mysql = require('mysql');
var crypto = require('crypto');
var c = require('../../../config/config')
	var m = eval("c.config." + c.config.config + ".mysql")
	var log = eval("c.config." + c.config.config + ".log")
	log.info(m);

var moption = {
	host : m.db_host,
	port : m.db_port,
	user : m.username,
	password : m.password,
	database : m.db_name
}

exports.login = login;

function login(obj, cb) {
	log.info(md5(obj))
}

function md5(text) {
	return crypto.createHash('md5').update(text).digest('hex');
};
