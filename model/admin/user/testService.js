var s = require('./service'); 
var c = require('../../../config/config'); 
var log = eval("c.config." + c.config.config + ".log");
s.login("admin","admin",function(data){
	 if(data){
	 	log.debug("ok")
	 }
})

