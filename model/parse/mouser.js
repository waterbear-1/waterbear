var cheerio = require('cheerio');
var parse = require('./baseparse');
exports.search = function(url, cb) {
	parse.readmsgGbk(url, function(html) {
		var $ = cheerio.load(html);
		var re = [];
		re = listpage($);
		if (re.length < 1) {
			re = page($)
		}
		cb(re)
	});
}
exports.searchpage = function(url, cb) {
	parse.readmsgGbk(url, function(html) {
		var $ = cheerio.load(html);
		if (page($) != null) {
			cb(page($))
		}
	});
}

function page($) {
	if ($("#divMouserPartNum").text().replace(/[\r\n\s\f\t\v ]+/gm, "") == "") {
		return null;
	}
	var re = [];

	var link = $("meta[itemprop='url']").attr("content")
	re.push({
		"spn": $("#divMouserPartNum").text().replace(/[\r\n\s\f\t\v ]+/gm, ""),
		"pn": $("#divManufacturerPartNum").text().replace(/[\r\n\s\f\t\v ]+/gm, ""),
		"link": link + "&source=qegoo_weixin",
		"mfs": $("#ctl00_ContentMain_hlnk10").text().replace(/[\r\n\s\f\t\v ]+/gm, ""),
		"availability": $("#ctl00_ContentMain_availability_tbl1").text().replace(/[\r\n\s\f\t\v ]+/gm, "").replace("有库存", "").replace("可立即发货", ""),
		"min": $(".PriceBreaks").eq(0).find(".PriceBreakQuantity").eq(0).text().replace(":", "").replace(/[\r\n\s\f\t\v ]+/gm, ""),
		"price": $(".PriceBreaks").eq(0).find(".PriceBreakPrice").eq(0).text().replace(/[\r\n\s\f\t\v ]+/gm, ""),
		"supplier": "Mouser"
	})
	return re;
}


function listpage($) {
	var re = []
	$("a[id*='lnkMouserPartNumber']").each(function(index, item) {
		var id = $(item).attr("id")
		id = id.replace("1_lnkMouserPartNumber", "")
		var links = $(item).attr("href")
		var availability = $("#" + id + "6_lnkAvailability").text()
		availability = availability.replace("有库存", "").replace("可立即发货", "")
		re.push({
			"spn": $(item).text(),
			"link": "http://www.mouser.cn/" + links + "&source=qegoo_weixin",
			"pn": $("#" + id + "2_MfrPartNumberLink").text(),
			"mfs": $("#" + id + "3_lnkSupplier").text(),
			"availability": availability,
			"min": $("#" + id + "2_MfrPartNumberLink").parent().parent().parent().find(".PriceBreaks").eq(0).find(".PriceBreakQuantity").eq(0).text().replace(":", "").replace(/[\r\n\s\f\t\v ]+/gm, ""),
			"price": $("#" + id + "2_MfrPartNumberLink").parent().parent().parent().find(".PriceBreaks").eq(0).find(".PriceBreakPrice").eq(0).text().replace(/[\r\n\s\f\t\v ]+/gm, ""),
			"supplier": "Mouser"
		})
	})
	return re
}