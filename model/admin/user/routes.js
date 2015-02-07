var s = require('./service');
var c = require('../../../config/config');
var log = eval("c.config." + c.config.config + ".log");

module.exports = function(app) {
	app.post('/user/login', function(request, response) {
		var name = request.param("name");
		var psw = request.param("psw");
		name = name.replace(/[ ]+/gm, "")
		s.login(name, psw, function(data) {
			if (data) { 
				request.session.admin=name;
				log.debug(name,"login in   session is ok",request.session.admin);
				response.redirect("welcome");
				//response.json({"result":"ok"});
			}else{
				log.debug(name,psw,"login error    session is not set  ");
				//response.json({"result":"error"})
				response.redirect("login.html");
			}
		})
	});
};