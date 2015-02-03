var mysql = require('mysql');
var crypto = require('crypto');
var c = require('../../../config/config')
var m=eval("c.config."+c.config.config+".mysql")
console.log(m) 
//填写数据库连接信息，可查询数据库详情页  
var moption = {
		host: m.db_host,
		port: m.db_port,
		user: m.username,
		password: m.password,
		database: m.db_name
	}
	 
exports.saveUrl = login;
 
 
function login(obj, cb) {
 console.log(md5(obj))
}


function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};