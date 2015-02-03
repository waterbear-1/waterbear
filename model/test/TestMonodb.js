//var Db = require('mongodb').Db;
//var Server = require('mongodb').Server;
//var db_name = 'TlrwlnYIRHGPimpUnqWt'; // 数据库名，从云平台获取
//var db_host = '192.168.3.140'; // 数据库地址
//var db_port = '27017'; // 数据库端口
//var username = ''; // 用户名（API KEY）
//var password = ''; // 密码(Secret KEY)
//var db = new Db(db_name, new Server(db_host, db_port, {}), {
//	w: 1
//});
//var cb = function(d) {
//	console.log(d)
//}
//var obj = {
//	"zuaa": 111
//}
//
//db.createCollection('waterbear', function(err, collection) {
//	collection.mapReduce(map, reduce, {
//		out: {
//			replace: 'tempCollection',
//			readPreference: 'secondary'
//		}
//	}, function(err, collection) {})
//})
//
//db.open(function(err, db) {
//
//	collection.mapReduce(map, reduce, {
//		out: {
//			replace: 'tempCollection',
//			readPreference: 'secondary'
//		}
//	}, function(err, collection) {})
//
//
//	db.collection("waterbear").group({
//		key: {
//			"zuaa": true
//		},
//		initial: {
//			sum: 0
//		},
//		reduce: function(doc, prev) {
//			prev.sum += 1
//		}
//	})
//
//
//	//	db.collection('waterbear', function(err, collection) {
//	//		collection.find(obj).toArray(function(err, docs) {
//	//			if (err) {
//	//				console.log(err);
//	//				cb("saveerr")
//	//			}
//	//			if (docs.length < 1) {
//	//				collection.insert(obj, function(err, docs1) {
//	//					if (err) {
//	//						console.log(err);
//	//					}
//	//					cb(docs1);
//	//					db.close();
//	//				});
//	//			} else {
//	//				cb(docs);
//	//				db.close();
//	//			}
//	//		})
//	//
//	//	});
//});