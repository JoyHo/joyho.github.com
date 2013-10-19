//footer保持最底部显示	
function estop(e){
		 var e=arguments.callee.caller.arguments[0]||event;//解决火狐的兼容性
		if (e && e.stopPropagation){
		   //因此它支持W3C的stopPropagation()方法
		   e.stopPropagation();
		 }else{
		   //否则，我们需要使用IE的方式来取消事件冒泡
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
