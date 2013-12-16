var pass_li = document.getElementById("pass").getElementsByTagName("li");
for(var i=0;i<pass_li.length;i++){
	+function(i){
		pass_li[i].onclick = function(){
			if(pass_li[i].className == ""){
			pass_li[i].className="choice";
		}
		else{
			pass_li[i].className="";
		}}
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
