/**
 *	此js主要用于被监测页面的调用，页面打开会自行扫描统计页面url并计入数据库，数据返回记录此url对应生成
 * 	的id，然后根据id以及此url在该页面url的排位生成一个可识别的新url，新url点击都被统计入库
 */

$(function() {
	$(document).ready(function() {


		recordinfo();

	});
});

/* 处理链接，加上唯一标识符   */
function doLink(link, index, res) {
	//判断链接是否为空
	if (link == "" || link.length == 0) {
		return link;
	}
	//判断链接是否是javascript的函数 startwith
	if (link.indexOf("javascript:") == 0) {
		return link;
	}
	//判断链接是否包含?,如果没有则在后面加上?
	if (link.indexOf("?") > 0) {
		link = link + "&";
	} else {
		link = link + "?";
	}
	link = link + "spm=" + res;
	link = link + "_" + index;
	return link;
}

/* 取当前页面的title值作为页面识别标签  */
//TODO 此方法可能要做加密操作
function getTitle() {
	var title = $("title").text();
	return title;
}

/* 将当前页面url记录到数据库 */
function insertstore() {
	var link = window.location.href;
	link = link.replace(/\//g, "|");
	var src_ = "http://myic360.duapp.com/s?spm=" + link;
	var img = "<img src=" + src_ + " style='display: none;' id = 'aaa'>"
	$('body').after(img);
}

//记录url及页面信息
function recordinfo() {
	var link = window.location.href;
	link = link.replace(/\//g, "|");
	var src_ = "http://myic360.duapp.com/s?spm=" + link + "&callbackFunction=jsonpCallbackrecordinfo";
	$.ajax({
		type: 'GET',
		url: src_,
		async: true,
		dataType: "jsonp",
		jsonp: "jsonpCallbackrecordinfo", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
		success: function(data) {
			var id = data;
			alert(data);
			return id;
		}
	});
}

function jsonpCallbackrecordinfo(data) {
	var res = data[0].id;
	$('a').each(function(index, item) {
		var link = $(item).attr("href");
		link = doLink(link, index, res);
		$(item).attr("href", link);
	});
	//所以form表达
	$('form').each(function(index, item) {
		var link = $(item).attr("action");
		var count = $('a').length;
		index = index + count;
		link = doLink(link, index, res);
		//TODO 处理链接中的参数是在js里面增加的
		$(item).attr("action", link);
	});
}