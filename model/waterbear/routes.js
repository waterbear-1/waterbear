var c = require('../../config/config');
var log = eval("c.config." + c.config.config + ".log");
var parse = require('../parse/baseparse');
var mdb = require('../dao/baiduMysql')
module.exports = function(app) {
	/**
	 * 获取url的
	 */
	app.get('/s', function(request, response) {
		var obj = request.query;
		mdb.saveObj(request.query, function(d) {
			mdb.saveUrl({
				"spm": request.query.spm
			}, function(data) {
				response.end(request.query.callbackFunction + "(" + JSON.stringify(data) + ")")
			});
		})
	});
	/**
	 * 根据传入链接，开始时间，结束时间参数，查询此链接的页面在一定时间内数据记录
	 */
	app.get('/find', function(request, response) {
		var o = {
			"link": request.query.link,
			"start": request.query.start,
			"end": request.query.end
		}
		mdb.selectUrlCount(o, function(data) {
			response.json(data);
		})
	});


	/**
	 *	获取被统计页面的数量，作为展现页面分页处理总数返回 （paging.js调用）
	 */
	app.get('/getpages', function(request, response) {
		mdb.findUrlcount(function(data) {
			response.json(data);
		})
	});
	/**
	 *	selectcontrol.ejs中展现数据接口
	 */
	app.get('/index', function(request, response) {
		var testStr = "";

		mdb.findUrlcount(function(count) {
			mdb.findUrl({
				limit: 30,
				offset: 0
			}, function(data) {
				response.render('selectcontrol.ejs', {
					title: testStr,
					data: data,
					count: count
				});
			})
		})
	});
	/**
	 *	 给selectcontrol.ejs提供时间选中后参数放入URL（奇迹时刻按钮功能接口）
	 */
	app.get('/index1', function(request, response) {
		var link = request.query.link;
		var adds = ' <link href="http://cdn.bootcss.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet" type="text/css" /><script src="http://myic360.duapp.com/js/jquery.min.1.10.2.js" type="text/javascript" charset="utf-8"></script><script type="text/javascript" src="http://myic360.duapp.com/js/showiframe.js"></script><base href=' + link + '/> '

		// 时间需要处理
		adds = adds + "		<script type=\"text/javascript\"> \n" +
			"$(function() {\n" +
			"	$(document).ready(function() {\n" +
			"	getspm('" + request.query.id + "', '" + request.query.start + "', '" + request.query.end + "');\n" +
			"})\n" +
			"})\n" +
			"	</script>"
		parse.readmsg(link, function(html) {
			response.end(html.replace("<head>", " <head>" + adds))
		})
	});
	/**
	 *	 baseurlchar.ejs数据接口
	 *   提供URL以及对应页面总共点击数量
	 */
	app.get('/char', function(request, response) {
		mdb.char1(function(data) {
			response.render('baseurlchar.ejs', {
				data: data,
				keys: JSON.stringify(data.keys),
				values: JSON.stringify(data.values)
			});
		})

	});

}