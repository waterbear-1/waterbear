var dao = require('./dao');
var c = require('../../../config/config');
var log = eval("c.config." + c.config.config + ".log");

exports.login = login;


function login(name, psw, cb) {
	dao.login({
		"name": name,
		"psw": psw
	}, function  (argument) {
		cb(argument)
	})
}