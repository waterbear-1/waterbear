/**
 * server层
 * 页面数据记录以及数据展现的接口
 */

//调用了哪些模块和文件
var express = require('express')
var app = express();
var path = require('path');
var mdb = require('./model/dao/baiduMysql')
var parseroutes = require('./model/parse/routes');
var userroutes = require('./model/admin/user/routes');
var waterBearroutes = require('./model/waterbear/routes');
var c = require('./config/config');
var log = eval("c.config." + c.config.config + ".log");
//初始化定义
app.configure(function() {
	app.set('port', 18080);
	app.set('views', __dirname + '/public/html');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('waterbear'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.errorHandler());
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'manager')));
app.use(express.cookieParser('waterbearcookie'));
app.use(express.session({
	cookie: {
		maxAge: 2 * 60 * 1000
	},
	secret: "waterbearsecretkey"
}));

try {
	userroutes(app);
} catch (e) {
	log.error(e);
}
try {
	parseroutes(app);
} catch (e) {
	log.error(e);
}
try {
	waterBearroutes(app);
} catch (e) {
	log.error(e);
}



app.listen(18080);