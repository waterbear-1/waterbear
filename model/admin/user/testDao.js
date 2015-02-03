var dao = require('./dao');
var Log =require('log');
var log =new Log('info');

dao.login({"obj":1,"psw":"2"},function(data){
	log.info(data)
})

