var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db_name = 'TlrwlnYIRHGPimpUnqWt'; // 数据库名，从云平台获取
var db_host = 'mongo.duapp.com'; // 数据库地址
var db_port = '8908'; // 数据库端口
var username = '6TmUe6zK7w7lpMBf1ythaCHU'; // 用户名（API KEY）
var password = '6Zb66bSSBXBBEYTeWqBjYwRHjboWa05I'; // 密码(Secret KEY)
var db = new Db(db_name, new Server(db_host, db_port, {}), {
	w: 1
});
exports.saveUrl = function(obj, cb) {
		db.open(function(err, db) {
			db.authenticate(username, password, function(err, result) {
				if (err) {
					db.close();
					cb("authenticateerr")
				}
				db.collection('waterbearLinks', function(err, collection) {
					//spm=
					var link = obj.spm
					if (link.indexOf("spm=") > 0) { //如果链接已经被标记，去掉标记符号之后再保存url
						obj.spm = link.substring(0, link.indexOf("spm=") - 1);
					}
					collection.find(obj).toArray(function(err, docs) {
						if (err) {
							console.log(err);
							cb("saveerr")
						}
						if (docs.length < 1) {
							collection.insert(obj, function(err, docs1) {
								if (err) {
									console.log(err);
								}
								cb(docs1);
								db.close();
							});
						} else {
							cb(docs);
							db.close();
						}
					})
				});

			});
		});

	}
	/**
	 * 保存数据内容。
	 *  @param {Object} obj
	 * @param {Object} cb
	 */
exports.saveObj = function(obj, cb) {
	db.open(function(err, db) {
		db.authenticate(username, password, function(err, result) {
			if (err) {
				db.close();
				cb("authenticateerr")
			}
			db.collection('waterbear', function(err, collection) {
				obj.addtime = new Date().Format("yyyy-MM-dd hh:mm:ss")
				obj.addDate = new Date().Format("yyyy-MM-dd")
				var link = obj.spm
					//obj 保存之前处理spm参数 ，
				if (link.indexOf("spm=") > 0) { //如果链接已经被标记，去掉标记符号之后再保存url
					obj.to = link.substring(0, link.indexOf("spm=") - 1);
					var t = link.substring(link.indexOf("spm=") + 3, link.length)
					if (t.split("_").length > 1) {
						obj.form = t.split("_")[0]
						obj.index = t.split("_")[1]
					}
					//解析form的id，转成url 
				}

				collection.insert(obj, function(err, docs) {
					if (err) {
						console.log(err);
						cb("saveerr")
					}
					db.close();
					cb("ok")
				});



			});
		});
	});
};





Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}