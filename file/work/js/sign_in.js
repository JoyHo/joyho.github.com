/*javascript document*/
function $(id){
	return document.getElementById(id);
	}
function nameAlert (){
	alertP='*请填写手机号码';
	if($('name_alert').innerHTML == ''){
	$('name_alert').innerHTML = alertP;
	}
	else {$('name_alert').innerHTML = '';}
	}
function namePassword (){
	if($('warn').style.display=='none'){
	$('warn').style.display='block';}
	else {$('warn').style.display='none';}
	}