var dao = require('./dao');
var Log =require('log');
var log =new Log('info');

dao.login({"name":"admin","psw":"admin"},function(data){
	log.info("test  :"+data)
})

