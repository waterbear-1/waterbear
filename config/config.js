var Log = require('log');
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
		log:new Log('info')
	}, 
	product:{
		mysql:{
			username:"bae",
			password:"6Zb66bSSBXBBEYTeWqBjYwRHjboWa05I",
			db_host:"svrid0r041bke62.mysql.duapp.com",
			db_port:10242,
			db_name:"svrid0r041bke62"
		},
		log:new Log('error')
	}  
}