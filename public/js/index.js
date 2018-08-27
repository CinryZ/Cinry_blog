/*
* @Author: admin
* @Date:   2018-07-30 16:06:08
* @Last Modified by:   admin
* @Last Modified time: 2018-07-30 16:24:01
*/
$(window).resize(function(){
	var width = $(this).width();
	var fontSize = width/100;
	console.log(fontSize)
	$('html').css('font-size',fontSize+'px');;
})