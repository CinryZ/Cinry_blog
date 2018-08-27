/*
* @Author: Cinry
* @Date:   2018-08-05 19:54:55
* @Last Modified by:   Cinry
* @Last Modified time: 2018-08-05 19:55:04
*/
$(window).resize(function(){
	var deviceWidth = document.documentElement.clientWidth;
	console.log(deviceWidth)   //1326
	if(deviceWidth > 1024) deviceWidth = 1024;
	document.documentElement.style.fontSize = deviceWidth / 70 + 'px';
	console.log(document.documentElement.style.fontSize)
})