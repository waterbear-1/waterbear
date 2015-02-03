/**
 *	对应selectcontrol.ejs页面，提供url拼接跳转，数据调用等
 */

$(function() {
//	$(document).ready(function() {
//		getspm('http://www.qegoo.cn/', 0, 0);
//	})
})


//TODO js动态控制iframe的对应的页面信息

function search() {
	var start = $('#start').val();
	var end = $('#end').val();
	var j=1;
	var num = $('table').find("a").size();
	$('table a').each(function(index,item){
		var link = $(item).attr("href");
		if(link.indexOf("&start=")!=-1){
			j++;
		}else{
		link = link+"&start="+start+"&end="+end;
		$(item).attr("href",link);
		}
	})
	if(j=num){
		alert("时间已记录，可以直接点击链接查询相关");
	}
}


/* 根据前端传入值查询数据信息 */
function getspm(link, start, end) {
	//var link = $('#slink').val();
	var url = "http://myic360.duapp.com/find?link=" + link + "&start=" + start + "&end=" + end;
	$.ajax({
		type: "GET",
		url: url,
		async: true,
		success: function(data) {
			jsonpCallbackgetspm(data);
		}
	})
}

/* 取指定页面的url数据信息,将数据after到所有a链接后面，添加标签 */
function jsonpCallbackgetspm(data) {
	var res = data;
	var change = $('a');
	change.each(function(index, item) {
		if (res[index]) {			
			var mark = "<div style='position:absolute;'><span class='badge' style ='background: greenyellow;color: black;position:relative;' >" + res[index] + "</span></div>"
			$(item).after(mark);
		}else{
			var mark = "<div style='position:absolute;'><span class='badge' style ='background: red;color: black;z-index:3333;position:relative' >" + 0 + "</span></div>"
			$(item).after(mark);
		}
	});



}