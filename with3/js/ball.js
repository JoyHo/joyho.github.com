var ball_red = document.getElementById("ball_red");
if(ball_red !== null){
var ball_red_li=ball_red.getElementsByTagName("li");

	for(var i=0;i<ball_red_li.length;i++){
		+function(i){
			ball_red_li[i].onclick = function(){
			if(ball_red_li[i].className == ""){
				ball_red_li[i].className="s";
			}
			else{
				ball_red_li[i].className="";
			}}
		}(i)
		
	}
};


var ball_blue = document.getElementById("ball_blue");
if(ball_blue !== null){
	var ball_blue_li=ball_blue.getElementsByTagName("li");
	for(var i=0;i<ball_blue_li.length;i++){
		+function(i){
			ball_blue_li[i].onclick = function(){
			if(ball_blue_li[i].className == ""){
				ball_blue_li[i].className ="s";
				}
				else{
					ball_blue_li[i].className ="";
				}
			}
		}(i)
		
	}
}

//ÀäÈÈÒÅÂ©(add by xiesw)
function fHotsel(a,b,c){
var oBs = document.getElementById(a).getElementsByTagName(b);
for(var i=0;i<oBs.length;i++){
	+function(i){
		oBs[i].onclick = function(){
		if(oBs[i].className == ""){
				oBs[i].className = c;
			}
			else{
				oBs[i].className = "";
			}
		}
	}(i)
}
}

