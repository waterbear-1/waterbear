var mouser = require('./mouser')
var fs = require('fs');
var cheerio = require('cheerio');
mouser.search("http://heiji10.duapp.com/flyServlet?url=http://www.mouser.cn/Search/Refine.aspx?Keyword=maz", function(data) {
 	console.log(data);
});
