//footer保持最底部显示	
	
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