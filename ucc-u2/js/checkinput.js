// JavaScript Document
function of(obj,text){
	if(obj.value == text){obj.value = '';}
	}
function ob(obj,text){
	if(obj.value == ''){obj.value = text;}
	}
function codefocus(){
	var codeInput = document.getElementById('code');
	of(codeInput,'账号密码');
	codeInput.type = 'password';
	}
function codeblur(){
	var codeInput = document.getElementById('code');
	if(codeInput.value !='账号密码'){codeInput.type = 'password';}
	if(codeInput.value ==''){codeInput.type='text';codeInput.value = '账号密码';}
	}