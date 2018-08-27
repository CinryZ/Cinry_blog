/*
* @Author: admin
* @Date:   2018-08-23 14:42:30
* @Last Modified by:   admin
* @Last Modified time: 2018-08-23 15:55:26
*/
var tipUser = document.getElementById('tipUser');
		var inputUser = document.myform.username;
		var tipPass = document.getElementById('tipPass');
		var inputPass = document.myform.pass;
		var tipRePass = document.getElementById('tipRepass');
		var inputRePass = document.myform.repass;

			function checkUser(){
				// 提交表单时所有都验证一次，只有当所有验证通过时才提交
				var check = blurUser() && blurPass() && blurRePass();
				return check;
			}
			// 用户名：获取焦点
			function focusUser(){			
				tipUser.innerHTML="请设置您的用户名";
				tipUser.style.color="#666";
				inputUser.style.borderColor='#ccc';
			}
			// 失去焦点
			function blurUser(){
				var check;
				if(inputUser.value==''){
					tipUser.innerHTML='对不起，用户名不能为空';
					tipUser.style.color='red';
					inputUser.style.border='1px solid red';
					check = false;
				}else if(inputUser.value.length>5||inputUser.value.length>20){
					tipUser.innerHTML='对不起，用户名只能介于5到20个字符之间';
					tipUser.style.color='red';
					check = false;
				}else{
					tipUser.innerHTML='ok';
					check = true;
				}
				return check;
			}

			// 密码验证
			function focusPass(){
				tipPass.innerHTML='密码请设置为不小于6个字符';
				tipPass.style.color="#666";
			}
			function blurPass(){
				var check;
				if(inputPass.value.length<6){
					tipPass.innerHTML='密码不能为空且不小于6个字符';
					tipPass.style.color="red";
					inputPass.style.border='1px solid red';
					check = false;
				}else{
					tipPass.innerHTML='ok';
					inputPass.style.borderColor='#ccc';
					check = true;
				}
				return check;
			}
			// 密码确认
			function blurRePass(){
				var check;
				if(inputPass.value==''){
					tipRePass.innerHTML='';
					inputPass.style.borderColor='#ccc';
					inputRePass.style.border='1px solid red';
				}
				else if(inputRePass.value!=inputPass.value){
					tipRePass.innerHTML='确认密码与设置的密码不一致';
					tipRePass.style.color="red";
					inputRePass.style.border='1px solid red';
					check = false;							
				}
				else{
					tipRePass.innerHTML='ok';
					tipRePass.style.color="#666";
					tipPass.style.color="#666";
					inputRePass.style.border='1px solid #ccc';
					check = true;
				}
				return check;
			}