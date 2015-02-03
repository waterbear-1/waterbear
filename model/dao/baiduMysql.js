var mysql = require('mysql');

var c = require('../../config/config')
var m=eval("c.config."+c.config.config+".mysql")
console.log(m) 
//填写数据库连接信息，可查询数据库详情页  
var moption = {
		host: m.mysql.db_host,
		port: m.mysql.db_port,
		user: m.mysql.username,
		password: m.mysql.password,
		database: m.mysql.db_name
	}
	//连接数据库
exports.saveUrl = selectUrl;

/**
 * 保存
 */
function saveUrl(obj, cb) {
	var client = mysql.createConnection(option);
	client.query(
		'INSERT INTO  wb_url_base SET source_url = ? ', [obj.spm],
		function(err, results) {
			if (err) {
				console.log(err);
			}
			selectUrl(obj, cb)
		}
	);
}

/**
 *	记录最初始页面url 
 */
function selectUrl(obj, cb) {
		var client = mysql.createConnection(option);
		var link = obj.spm
		if (link.indexOf("spm=") > 0) { //如果链接已经被标记，去掉标记符号之后再保存url
			obj.spm = link.substring(0, link.indexOf("spm=") - 1);
		}
		client.query(
			'select * from wb_url_base where source_url  = ?', [obj.spm],
			function(err, results) {
				if (err) {
					console.log(err);
					return;
				}
				if (results.length > 0) {
					cb(results);
					client.end();
				} else {
					saveUrl(obj, cb);
				}
			}
		);
	}

/**
 * 保存数据
 * @param {Object} obj
 * @param {Object} cb
 */
exports.saveObj = function(obj, cb) {
	var client = mysql.createConnection(option);
	var link = obj.spm
		//obj 保存之前处理spm参数 ，
	if (link.indexOf("spm=") > 0) { //如果链接已经被标记，去掉标记符号之后再保存url
		obj.to = link.substring(0, link.indexOf("spm=") - 1);
		var t = link.substring(link.indexOf("spm=") + 4, link.length)
		if (t.split("_").length > 1) {
			obj.form = t.split("_")[0]
			obj.index = t.split("_")[1]
		}
		//解析form的id，转成url 
	}
	console.log("======", obj);
	if (obj.index) {
		client.query(
			'INSERT INTO  wb_url_record SET target_url = ?, source_url = ?,index_num=?', [obj.to, obj.form, obj.index],
			function(err, results) {
				if (err) {
					console.log(err);
					return;
				}
				cb("ok")
				client.end();
			}
		);
	} else {
		cb("error")
	}
}
/**
 *	 查询一定时间内url统计数据信息
 */
exports.selectUrlCount = function(obj, cb) {
	var client = mysql.createConnection(option);
	client.query(
		"SELECT index_num , count(1)  as c FROM  wb_url_record   where   source_url = ? " +
		" and  created_time  >=str_to_date(?,'%Y-%m-%d') " +
		"and  created_time <=str_to_date(?,'%Y-%m-%d')   group by  index_num  ", [obj.link, obj.start, obj.end],
		function(err, results) {
			if (err) {
				console.log(err);
				return;
			}
			var re = {}
			results.forEach(function(item, index) {
				re[item.index_num] = item.c
			})
			cb(re);
			client.end();
		}
	);
}
/**
 * 报表数据接口，提供对应页面url以及总点击数量
 * @param {Object} cb
 */
exports.char1 = function(cb) {
	var client = mysql.createConnection(option);
	client.query(
		"SELECT a.source_url as url,x.num  as num FROM wb_url_base a, " + "(SELECT source_url as id,count(source_url) " +
		"as num  FROM wb_url_record GROUP BY source_url) x  WHERE x.id = a.id ", [],
		function(err, results) {
			if (err) {
				console.log(err);
				return;
			}
			var re = {}
			var ks=[]
			var vs=[]
			results.forEach(function(item, index) {
				ks.push(item.url)
				vs.push(item.num)
			})
			re.keys=ks
			re.values=vs
			cb(re);
			client.end();
		}
	);


}


/**
 *	分页总页数接口，统计页面url的数量 
 * @param {Object} cb
 */
exports.findUrlcount = function(cb) {
	var client = mysql.createConnection(option);
	client.query(
		"SELECT count(1) as count FROM   wb_url_base ",
		function(err, results) {
			if (err) {
				console.log(err);
			}
			cb(results);
			client.end();
		}
	);
}

/**
 *	单个url在一定时间的统计数据接口 
 * @param {Object} obj
 * @param {Object} cb
 */
exports.findUrl = function(obj, cb) {
	var client = mysql.createConnection(option);
	client.query(
		"SELECT *  FROM   wb_url_base  LIMIT ? , ?  ", [obj.offset, obj.limit],
		function(err, results) {
			if (err) {
				console.log(err);
				return;
			}
			cb(results);
			client.end();
		}
	);
}
exports.gettotalcount = function(obj, cb) {
	var client = mysql.createConnection(option);
}