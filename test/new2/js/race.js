/*lottery*/
var race_dt = document.getElementById("race").getElementsByTagName("dt");
for(var i=0;i<race_dt.length;i++){
	+function(i){
		race_dt[i].onclick = function(){
			if(race_dt[i].className == ""){
				race_dt[i].className = "folding";
			    document.getElementById("score_"+i).style.display = "block";
				}
			else{
				race_dt[i].className = "";
			    document.getElementById("score_"+i).style.display = "";
				
				}
		}
	}(i)
}

var race_a=document.getElementById("race").getElementsByTagName("a");
for(var i=0;i<race_a.length;i++){
	+function(i){
		race_a[i].onclick = function(){
		if(race_a[i].className == ""){
			race_a[i].className="sred";
		}
		else{
			race_a[i].className="";
		}}
	}(i)
	
}

/*invest details*/
var pass_li = document.getElementById("pass").getElementsByTagName("li");
for(var i=0;i<pass_li.length;i++){
	+function(i){
		pass_li[i].onclick = function(){
			for(var j=0;j<pass_li.length;j++){
				pass_li[j].className="";
			}
			pass_li[i].className = "choice";
		}
	}(i)
}

var edit_a=document.getElementById("edit").getElementsByTagName("a");
for(var i=0;i<edit_a.length;i++){
	+function(i){
		edit_a[i].onclick = function(){
		if(edit_a[i].className == ""){
			edit_a[i].className="s_red";
		}
		else{
			edit_a[i].className="";
		}}
	}(i)
	
}