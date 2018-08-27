/*
* @Author: Cinry
* @Date:   2018-08-05 11:16:26
* @Last Modified by:   admin
* @Last Modified time: 2018-08-23 16:05:27
*/
$(window).resize(function(){
	var deviceWidth = document.documentElement.clientWidth;
	console.log(deviceWidth)   //1326
	if(deviceWidth > 1024) deviceWidth = 1024;
	document.documentElement.style.fontSize = deviceWidth / 70 + 'px';
	console.log(document.documentElement.style.fontSize)
})
 
// //动态设置viewport的scale
// var scale = 1 / devicePixelRatio;
// // document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

// // 动态计算html的字体大小
// document.documentElement.style.fontSize = document.documentElement.clientWidth / 12 + 'px';
// console.log(document.documentElement.style.fontSize)

// 数据传输部分
$('.loadmore').click(function(){
	$.ajax({
		url: '/loadmore',
		dataType: 'json',
		data: {flag: 1},
		success:function(res){
			console.log(res)
		}
	})	
})