var Log = require('log');
exports.config = {
	config:"develop", 
	develop:{
		mysql:{
			username:"r0d89875v0x60v3n",
			password:"r0d89875v0x60v3nr0d89875v0x60v3n",
			db_host:"rdsibnqfiuvf2az.mysql.rds.aliyuncs.com",
			db_port:3306,
			db_name:"r0d89875v0x60v3m"
		},
		log:new Log('debug')
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
