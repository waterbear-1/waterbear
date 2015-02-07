var c = require('../../config/config');
var log = eval("c.config." + c.config.config + ".log");
var mouser = require('./mouser')

module.exports = function(app) {
	/**
	 * 提供实时取mouser数据信息
	 */
	app.get('/searchmouser', function(request, response) {
		var name = request.param("name");
		name = name.replace(/[ ]+/gm, "")
		var urlstring = "http://heiji10.duapp.com/flyServlet?url=http://www.mouser.cn/Search/Refine.aspx?Keyword=" + encodeURIComponent(name.toUpperCase())
		mouser.search(urlstring, function(argument) {
			try {
				if (argument.length > 5) {
					argument = argument.slice(0, 5)
				}
			} catch (e) {
				log.error(e);
			}
			response.json(argument)
		})
	});

}