<<<<<<< HEAD
var Log = require('log');
=======
var Log = require('log'); 
>>>>>>> bcee28986ed3f2fd9f1266e69751faf2a61155a1
exports.config = {
	config:"develop", 
	develop:{
		mysql:{
			username:"root",
			password:"123456",
			db_host:"192.168.3.242",
			db_port:3306,
			db_name:"zuaa"
		},
<<<<<<< HEAD
		log:new Log('info')
=======
		log: new Log('info')
>>>>>>> bcee28986ed3f2fd9f1266e69751faf2a61155a1
	}, 
	product:{
		mysql:{
			username:"bae",
			password:"6Zb66bSSBXBBEYTeWqBjYwRHjboWa05I",
			db_host:"svrid0r041bke62.mysql.duapp.com",
			db_port:10242,
			db_name:"svrid0r041bke62"
		},
<<<<<<< HEAD
		log:new Log('error')
	}  
=======
		log: new Log('error')
	}
	
>>>>>>> bcee28986ed3f2fd9f1266e69751faf2a61155a1
}