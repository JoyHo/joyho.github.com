var ball_red_li=document.getElementById("ball_red").getElementsByTagName("li");
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

var ball_blue_li=document.getElementById("ball_blue").getElementsByTagName("li");
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