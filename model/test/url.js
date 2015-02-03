var http = require('http');
var url = require('url'); 
var cheerio = require('cheerio');
var parse = require('../parse/baseparse');
var fs = require('fs');
var mouser =require('../parse/mouser')
var urlstring = "http://heiji10.duapp.com/flyServlet?url=http://www.mouser.cn/Search/Refine.aspx?Keyword="+encodeURIComponent("926-LM3658SDX-B/NOPB")
//var re = []
	//parse.readmsgGbk(urlstring, function(data) {
// var fs = require('fs');
//var data = fs.readFileSync('/home/xuping/文档/N-45lx1.htm', "utf8");
//// var $ = cheerio.load(data); 
//
//// console.log(1);
//var data2 = fs.readFileSync('/home/xuping/文档/N-45lx2.htm', "utf8");
//var $ = cheerio.load(data2); 
//
//
//if(page($)!=null){
//	console.log(page($));	
//}
//function page($) {
//	if ($("#divMouserPartNum").text().replace(/[\r\n\s\f\t\v\o ]+/gm, "") == "") { 
//		return null;
//	}
//	var re=[];
//	re.push({
//		"spn": $("#divMouserPartNum").text().replace(/[\r\n\s\f\t\v\o ]+/gm, ""),
//		"pn": $("#divManufacturerPartNum").text().replace(/[\r\n\s\f\t\v\o ]+/gm, ""),
//		"mfs": $("#ctl00_ContentMain_hlnk10").text().replace(/[\r\n\s\f\t\v\o ]+/gm, ""),
//		"availability": $("#ctl00_ContentMain_availability_tbl1").text().replace(/[\r\n\s\f\t\v\o ]+/gm, ""),
//		"min": $(".PriceBreaks").eq(0).find(".PriceBreakQuantity").eq(0).text().replace(":", "").replace(/[\r\n\s\f\t\v\o ]+/gm, ""),
//		"price": $(".PriceBreaks").eq(0).find(".PriceBreakPrice").eq(0).text().replace(/[\r\n\s\f\t\v\o ]+/gm, "")
//	}) 
//	return re;
//}


// $("a[id*='lnkMouserPartNumber']").each(function(index, item) {
// 		var id = $(item).attr("id") //ctl00_ContentMain_SearchResultsGrid_grid_ctl03_ctl01_lnkMouserPartNumber
// 		id = id.replace("1_lnkMouserPartNumber", "") 
// 		re.push({
// 			"pn": $(item).text(),
// 			"spn": $("#" + id + "2_MfrPartNumberLink").text(),
// 			"mfs": $("#" + id + "3_lnkSupplier").text(),
// 			"availability": $("#" + id + "6_lnkAvailability").text(),
// 			"min":$(".PriceBreaks").eq(index).find(".PriceBreakQuantity").eq(0).text().replace(":", "").replace(/[\r\n\s\f\t\v\o ]+/gm, ""),
// 			"price":$(".PriceBreaks").eq(index).find(".PriceBreakPrice").eq(0).text().replace(/[\r\n\s\f\t\v\o ]+/gm, "")
// 		} )
// 	})
// 	// })

// console.log(re) 
   mouser.searchpage(urlstring,function (argument) {
   	 console.log(argument)
   })
