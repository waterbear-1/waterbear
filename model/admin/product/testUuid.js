
var c = require('../../../config/config') ;
var uuid = eval("c.config." + c.config.config + ".uuid");
var log = eval("c.config." + c.config.config + ".log");
	
	for(var i =0;i<100 ;i++){
		log.info(uuid.toString());
	}