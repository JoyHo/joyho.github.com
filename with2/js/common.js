//删除所有输入框的错误提示
function clearAllError(){
	(typeof $("#dLoginNameError").val() == 'undefined')?"":$("#dLoginNameError").html("");
	(typeof $("#dPasswordError").val() == 'undefined')?"":$("#dPasswordError").html("");
	(typeof $("#dCaptchaValError").val() == 'undefined')?"":$("#dCaptchaValError").html("");
	(typeof $("#dMessageError").val() == 'undefined')?"":$("#dMessageError").html("");
	(typeof $("#dEmailError").val() == 'undefined')?"":$("#dPaaswordError").html("");
	(typeof $("#dMobileError").val() == 'undefined')?"":$("#dPaaswordError").html("");
}

//删除指定的输入框的错误提示
function clearError(id){
	var destStr = firstIndexToUpperCase(id);
	$("#d"+destStr+"Error").html("");
}

//登录中
function loading(){
	$("#submit_btn").attr("disabled", "disabled");
	$("#submit_btn").val(error.loginbutton.loading);
}

//登录
function unloading(){
	$("#submit_btn").removeAttr("disabled");
	$("#submit_btn").val(error.loginbutton.unloading);
}

//将字符串首字母变为大写
function firstIndexToUpperCase(srcStr) {
	var destStr = srcStr.substring(0,1).toUpperCase() + srcStr.substring(1);
	return destStr;
}

//刷新验证码
function refreshCatcha(){
	var url = "images/captcha.png";
	var url2 = "images/captcha2.png";
	var srcUrl = $("#captchaImg").find("img").attr("src");
	var destUrl = (url == srcUrl)?url2:url;
	$("#captchaImg").find("img").attr("src", destUrl);
}
