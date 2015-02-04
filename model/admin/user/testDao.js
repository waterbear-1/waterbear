var dao = require('./dao');
var Log =require('log');
var log =new Log('info');

dao.login({"obj":111,"psw":"1112"},function(data){
	log.info(data)
})

