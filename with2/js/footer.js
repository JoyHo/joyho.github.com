//footer������ײ���ʾ	
function estop(e){
		 var e=arguments.callee.caller.arguments[0]||event;//�������ļ�����
		if (e && e.stopPropagation){
		   //�����֧��W3C��stopPropagation()����
		   e.stopPropagation();
		 }else{
		   //����������Ҫʹ��IE�ķ�ʽ��ȡ���¼�ð��
			window.event.cancelBubble = true;
			return false;
		 }
	}
	
function foot(){
	var h = document.documentElement.clientHeight;
	var w = document.documentElement.clientWidth;
	document.getElementById("footer").style.marginTop = 0;
	var iBodyHeight= document.body.offsetHeight;
	if(h>w){
		if(h>iBodyHeight){
			document.getElementById("footer").style.marginTop = h-iBodyHeight+"px";
		}
	}
}

onload = onresize = function(){ foot()}
