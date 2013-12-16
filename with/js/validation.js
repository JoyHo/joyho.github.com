
/***************************************公共检验部分begin*********************************/
//帐号检验成功与否的标记
var loginNameFlag = false;
//检验通过是否显示成功图标
function isShowOk(id,staticResourceBaseUrl) {
	if(typeof staticResourceBaseUrl != 'undefined' && staticResourceBaseUrl != "") {
		var checkOkStr = "<span><img src=" + staticResourceBaseUrl + "public/images/next/zh/pc/ico_ok.jpg></span>";
		var destStr = firstIndexToUpperCase(id);
		$("#d" + destStr + "Error").append(checkOkStr);
	}
}

//检验通过是否显示错误图标
function isShowFail(id,staticResourceBaseUrl,message) {
	var checkFailStr = "";
	if(typeof staticResourceBaseUrl != 'undefined' && staticResourceBaseUrl != "") {
		checkFailStr = "<span><img src=" + staticResourceBaseUrl + "public/images/next/zh/pc/ico_error.jpg>" + message + "</span>";
	} else {
		checkFailStr = message;
	}
	var destStr = firstIndexToUpperCase(id);
	$("#d" + destStr + "Error").append(checkFailStr);
}

//刷新验证码
function refreshCatcha(baseUrl,type){
//	var t = new Date().getTime();
//	var display = (typeof $("#display").val() == 'undefined')?"mobile":$("#display").val();
//	$.ajax({
//		  type: 'GET',
//		  dataType: "text",
//		  //url:  baseUrl + "captcha/refresh?t="+t,
//		  url:  baseUrl + type + "refreshCaptcha",
//		  data: {t:t,display:display},
//		  success: function(data){
//			  var url= baseUrl + type + "captcha?captchaId=" + data + "&t=" + t + "&display=" + display;
//			  $("#captchaId").val(data);
//			  $("#captchaImg").find("img").attr("src", url);
//		  }
//	});

	var url = "images/captcha.png";
	var url2 = "images/captcha2.png";
	var srcUrl = $("#captchaImg").find("img").attr("src");
	var destUrl = (url == srcUrl)?url2:url;
	$("#captchaImg").find("img").attr("src", destUrl);	
}

//检验特殊字符
function validSpecialChars(id,errorInfo,staticResourceBaseUrl) {
	var destlist = "~!@#$%^&*()_+|`-=\{}[]:\";\'<>?,./";
	var srcStr = $("#" + id).val();
	for (var i = 0; i<srcStr.length; i++) {
      var c = srcStr.charAt(i);
      if (destlist.indexOf(c)==-1 && !/\w/i.test(c)) {
  		  isShowFail(id,staticResourceBaseUrl,errorInfo);
  		  //$("#" + id).val("");
    	  return false;
      }
    }
	return true;
}

//校验输入验证码是否为数字
function validIsNumber(id,errorInfo,staticResourceBaseUrl) {
	var reg = new RegExp("^[0-9]*$");
	var str = $.trim($("#" + id).val());
	if(!reg.test(str)){
		isShowFail(id,staticResourceBaseUrl,errorInfo);
		//$("#" + id).val("");
		return false;
  }
	return true;
}

//校验输入框是否为空
function validEmpty(id,errorInfo,staticResourceBaseUrl){
	var inputVal = $.trim($("#" + id).val());
	var srcVal = $("input[id ='" + id + "']").attr("placeholder");
	if(inputVal == "" || inputVal == srcVal){
		isShowFail(id,staticResourceBaseUrl,errorInfo);
		return false;
	}
	return true;
}

//校验输入值的长度
function validLength(id,startLen,endLen,errorInfo,staticResourceBaseUrl){
	var len = $("#" + id).val().length;
	if(len < startLen || len > endLen){
		isShowFail(id,staticResourceBaseUrl,errorInfo);
		return false;
	}
	return true;
}

//校验密码规则
function validPwd(staticResourceBaseUrl){
	//if(loginNameFlag) {
		clearError("password");
		clearError("message");
		var isRigth = validEmpty("password",error.password.empty,staticResourceBaseUrl);
		if(!isRigth){
			return false;
		}
		
		var isRigth = validLength("password",6,20,error.password.length,staticResourceBaseUrl);
		if(!isRigth){
			return false;
		}
		
		var isRigth = validSpecialChars("password",error.password.character,staticResourceBaseUrl);
		if(!isRigth){
			return false;
		}
		
		//检验通过是否显示成功图标
		isShowOk("password",staticResourceBaseUrl);
		return true;
	//} else {
	//	return false;
	//}
}

//核验验证码
function validCaptcha(baseUrl,type,staticResourceBaseUrl){
	clearError("captchaVal");
	clearError("message");
	var isRigth = true;
	if(typeof $("#captchaId").val() != 'undefined') {
		if($("#captchaId").val() != ""){
			if(!validEmpty("captchaVal",error.captcha.empty,staticResourceBaseUrl)){
				return false;
			}
			if(!validIsNumber("captchaVal",error.captcha.character,staticResourceBaseUrl)) {
				return false;
			}
			//自动校验验证是否正确 验证成功后不会删除缓存
			//isRigth = checkCapther(baseUrl,type,staticResourceBaseUrl);
		}
	}
	
	//检验通过是否显示成功图标
	//isShowOk("captchaVal",staticResourceBaseUrl);
	return isRigth;
	
}

//记录验证码验证出错次数
var countCaptchaError = 0;
//自动校验验证是否正确
function checkCapther(baseUrl,type,staticResourceBaseUrl) {
	var captchaId = $.trim($("#captchaId").val());
    var captchaVal = $.trim($("#captchaVal").val());
    var display = (typeof $("#display").val() == 'undefined')?"mobile":$("#display").val();
    var isRigth = false;
    
	$.ajax({
        type: "GET",
        url:  baseUrl + type + "checkCaptcha",
        dataType: "json",
        data: {captchaId:captchaId,uc_param_str:'nieisivefrpfbimilaprligiwiut',captchaVal:captchaVal,display:display},
        async: false,
        success: function(data) {
            var status = data.status;
            if (status == "2000000"){
            	//检验通过是否显示成功图标
				isShowOk("captchaVal",staticResourceBaseUrl);
				countCaptchaError = 0;
				isRigth = true;
            } else {
            	isShowFail("captchaVal",staticResourceBaseUrl,data.message);
				//$("#captchaVal").val("");
				countCaptchaError++;
				if(countCaptchaError > 4) {
					countCaptchaError = 0;
					refreshCatcha(baseUrl,type);
				}
            	isRigth = false;
            }
        }
    });		
	return isRigth;
}

/***************************************公共检验部分end*********************************/

/***************************************登录专用begin***********************************/
//校验登录名
function validLoginName(baseUrl,staticResourceBaseUrl){
	clearError("loginName");
	clearError("password");
	clearError("message");
	var isRigth = true;
	isRigth = validEmpty("loginName",error.login.empty,staticResourceBaseUrl);
	if(!isRigth){
		isRigth = false;
		return false;
	}

	//自动校验帐号是否存在
	//isRigth = checkAccount(baseUrl,staticResourceBaseUrl);
	//用于判断是否对密码进行检验
	loginNameFlag = isRigth;
	return isRigth;
}

//校验登录名是否为空（主要针对九游登录）
function validLoginNameIsEmpty(){
	clearError("loginName");
	clearError("message");
	var isRigth = validEmpty("loginName",error.login.empty,staticResourceBaseUrl);
	if(!isRigth){
		return false;
	}
	return true;
}

//自动校验帐号是否存在
function checkAccount(baseUrl,staticResourceBaseUrl) {
	var loginName = $.trim($("#loginName").val());
    var display = (typeof $("#display").val() == 'undefined')?"mobile":$("#display").val();
    var isRigth = false;
    
	$.ajax({
        type: "POST",
        url: baseUrl+"login/validateAccount",
        dataType: "json",
        data: {loginName:loginName,uc_param_str:'nieisivefrpfbimilaprligiwiut',display:display},
        async: false,
        success: function(data) {
		 	var status=data.status;
            if (status == "2000000"){
            	//检验通过是否显示成功图标
				isShowOk("loginName",staticResourceBaseUrl);
				isRigth = true;
            } else {//服务器异常
            	isShowFail("loginName",staticResourceBaseUrl,data.message);
				$("#captchaVal").val("");
				$("#password").val("");
            	isRigth = false;
            }
        }
    });	
	return isRigth;
}

//核验表单提交
function validLogin(baseUrl,staticResourceBaseUrl){
	var allRight = true;
	if(!validLoginName(baseUrl,staticResourceBaseUrl)){
		allRight = false;
		return allRight;
	}
	if(!validPwd(staticResourceBaseUrl)){
		allRight = false;
		return allRight;
	}
	if(!validCaptcha(baseUrl,'login/',staticResourceBaseUrl)){
		allRight = false;
		return allRight;
	}
	return allRight;
}

// 表单提交
function submitForm(requestUrl,staticResourceBaseUrl) {
	var loginFormObj = $('#dLoginForm');
	if (!validLogin(requestUrl,staticResourceBaseUrl)) {
		unloading()
		return false;
	}
	loading()
	loginFormObj.submit();
	clearAllError();
}

/******************************登录专用end***********************************/

/************************************注册专用begin***********************************************/
//检验手机
function validMobile(baseUrl,staticResourceBaseUrl) {
	clearError("mobile");
	clearError("message");
	var isRight = true;
	isRight=validEmpty("mobile",error.mobile.empty,staticResourceBaseUrl);
	if(!isRight){
		isRight = false;
		return false;
	}
	isRigth = validIsMobile("mobile",error.mobile.character,staticResourceBaseUrl);
	if(!isRigth){
		isRight = false;
		return false;
	}
	
	//自动检验手机号是否被占用
	//isRight = checkMobile(baseUrl,staticResourceBaseUrl);
	return isRight;
}

//自动检验手机号是否被占用
function checkMobile(baseUrl,staticResourceBaseUrl) {
	var nickname = $("#mobile").val();
	var t = new Date().getTime();
	var display = (typeof $("#display").val() == 'undefined')?"":$("#display").val();
	var isRigth = false;
  
	$.ajax({
		  type: 'POST',
		  url: baseUrl + "register/jsonCheckMobi",
	      dataType: "json",
	      data: {mobile:mobile,uc_param_str:'nieisivefrpfbimilaprligiwiut',display:display,t:t},
	      async: false,
		  success: function(data){
			  var status=data.status;
			  if(status=="20180000"){
				  //检验通过是否显示成功图标
				  isShowOk("mobile",staticResourceBaseUrl);
				  isRigth = true;
			  }else {
				  isShowFail("mobile",staticResourceBaseUrl,data.message);
				  $("#captchaVal").val("");
				  $("#password").val("");
				  if($("#passwordRepeat").val() != 'undefined') $("#passwordRepeat").val("");
				  isRigth = false;
			  }
		  }
	});
	return isRigth;
}

//检验是否勾选协议
function validAgreement(staticResourceBaseUrl){
	clearError("agreement");
	if($("input[name='agreement']:checked").val() == 'undefined'){
		isShowFail("agreement",staticResourceBaseUrl,error.agreement.isChecked);
		return false;
	}
	return true;
}

//校验输入是否为手机号码
function validIsMobile(id,errorInfo,staticResourceBaseUrl) {
	var reg = new RegExp("^1[0-9]{10}$");
	var str = $("#" + id).val();
	if(!reg.test(str)){
		isShowFail(id,staticResourceBaseUrl,errorInfo);
		return false;
}
	return true;
}

//检验邮箱格式
function validEmailFormat(id,errorInfo,staticResourceBaseUrl){
	var email = $("#" + id).val();
	var emailRegExp = /^([\w]+([\w-\.+]*[\w-]+)?)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
	if (!emailRegExp.test(email)||email.indexOf('.')==-1){
		isShowFail(id,staticResourceBaseUrl,errorInfo);
		return false;
	}
	return true;
}

//检验邮箱
function validEmail(staticResourceBaseUrl){
	clearError("email");
	clearError("message");
	var isRight = true;
	isRight=validEmpty("email",error.email.empty,staticResourceBaseUrl);
	if(!isRight){
		isRight = false;
		return false;
	}
	//检验邮箱格式
	isRight = validEmailFormat("email",error.email.wrongformat,staticResourceBaseUrl);
	if(!isRigth){
		isRight = false;
		return false;
	}
	//自动检验邮箱是否被占用
	//isRight = checkEmail();
	return isRight;
}

//自动检验邮箱是否被占用
function checkEmail(baseUrl,staticResourceBaseUrl) {
	var email = $("#email").val();
	var t = new Date().getTime();
  var display = (typeof $("#display").val() == 'undefined')?"":$("#display").val();
  var isRigth = false;
  
	$.ajax({
		  type: 'POST',
		  url: baseUrl + "register/checkEmailExist",
	      dataType: "json",
	      data: {email:email,uc_param_str:'nieisivefrpfbimilaprligiwiut',display:display,t:t},
	      async: false,
		  success: function(data){
			  var status=data.status;
	          if (status == "2000000"){
				  //检验通过是否显示成功图标
				  isShowOk("email",staticResourceBaseUrl);
				  isRigth = true;
			  }else {
				  isShowFail("email",staticResourceBaseUrl,data.message);
				  $("#captchaVal").val("");
				  $("#password").val("");
				  if($("#passwordRepeat").val() != 'undefined') $("#passwordRepeat").val("");
				  isRigth = false;
			  }
		  }
	});
	return isRigth;
}

//密码强度选择
function passStrong(){
	window.setInterval(function(){
		var pass=$("#password").val();
		var num=getPassStrong(pass);
		$("#pass_low").removeClass("selected");
		$("#pass_mid").removeClass("selected");
		$("#pass_high").removeClass("selected");
		if(num==1){
			$("#pass_low").addClass("selected");
		}else if(num==2){
			$("#pass_mid").addClass("selected");
		}else if(num==3){
			$("#pass_high").addClass("selected");
		}
	},500);
}

//密码强度诸
function getPassStrong(value){
	var strong=0;
	if(value.length<6){
		return 0;
	}
	var reg=/[0-9]/ ;
	if(reg.test(value)){
		strong=strong+1;
	}
	var reg=/[a-z]/i ;
	if(reg.test(value)){
		strong=strong+1;
	}
	var reg=/^[a-z0-9]*$/i;
	if(!reg.test(value)){
		strong=strong+1;
	}
	return strong;
}

//核验表单提交
function vaildRegister(baseUrl,staticResourceBaseUrl){
	var allRight = true;
	if(!validEmail(baseUrl,staticResourceBaseUrl)){
		allRight = false;
		return allRight;
	}
	if(!validMobile(baseUrl,staticResourceBaseUrl)){
		allRight = false;
		return allRight;
	}
	if(!validAgreement(staticResourceBaseUrl)){
		allRight = false;
		return allRight;
	}
	//此段检验在common.js
	if(!validPwd(staticResourceBaseUrl)){
		allRight = false;
		return allRight;
	}
	//此段检验在common.js
	if(!validCaptcha(baseUrl,'register/',staticResourceBaseUrl)){
		allRight = false;
		return allRight;
	}
	return allRight;
}

//表单提交
function submitRegForm(requestUrl,staticResourceBaseUrl) {
	var registerFormObj = $('#dRegisterForm');
	if (!vaildRegister(requestUrl,staticResourceBaseUrl)) {
		return false;
	}
	clearAllError();
	registerFormObj.submit();
}

/************************************注册专用end***********************************************/

/************************************昵称检验暂时没有用到***********************************************/
//检验昵称
function validNickname(baseUrl,staticResourceBaseUrl){
	clearError("nickname");
	clearError("message");
	var isRight = true;
	isRight=validEmpty("nickname","请填写昵称",staticResourceBaseUrl);
	if(!isRight){
		isRight = false;
		return false;
	}
	isRigth = validLength("nickname",6,20,"昵称要求2~20位之间");
	if(!isRigth){
		isRight = false;
		return false;
	}
	
	//自动检验昵称是否被占用
	isRight = checkNickname(baseUrl,staticResourceBaseUrl);
	return isRight;
}

//自动检验昵称是否被占用
function checkNickname(baseUrl,staticResourceBaseUrl) {
	var nickname = $("#nickname").val();
	var t = new Date().getTime();
  var display = (typeof $("#display").val() == 'undefined')?"":$("#display").val();
  var isRigth = false;
  
	$.ajax({
		  type: 'POST',
		  url: baseUrl + "register/validNickname",
	      dataType: "json",
	      data: {nickname:nickname,uc_param_str:'nieisivefrpfbimilaprligiwiut',display:display,t:t},
	      async: false,
		  success: function(data){
			  var status=data.status;
			  if(status=="20180000"){
				  //检验通过是否显示成功图标
				  isShowOk("nickname",staticResourceBaseUrl);
				  isRigth = true;
			  }else {
				  isShowFail("nickname",staticResourceBaseUrl,data.message);
				  $("#captchaVal").val("");
				  $("#password").val("");
				  if($("#passwordRepeat").val() != 'undefined') $("#passwordRepeat").val("");
				  isRigth = false;
			  }
		  }
	});
	return isRigth;
}
/********************************************昵称检验结束******************************************************/

/*************密码区分大小写的显示*************/
function pwdTips(obj){
	if(obj.innerHTML != null){
		obj.attr('type','password');
		}
	else{
		obj.attr('type','text');
		}
	}
