/*lottery*/
var race = document.getElementById("race");
if(race !== null){
var race_dt = race.getElementsByTagName("dt");
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
}

if(race !== null){
var race_a=race.getElementsByTagName("a");
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
}

/*invest details*/
var pass = document.getElementById("pass");
if(pass !== null){
var pass_li = pass.getElementsByTagName("li");
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
}

var edit = document.getElementById("edit");
if(edit !== null){
var edit_a=edit.getElementsByTagName("a");
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
}

/*加减数 add by xiesw*/
function minus(obj){
	var obj_value = document.getElementById(obj).value;
	if(obj_value != "" && obj_value > 1){
		obj_value = obj_value -1;
		document.getElementById(obj).value = obj_value;
	}else{
		document.getElementById(obj).value = 1;
	}
}

function plus(obj){
	var obj_value = document.getElementById(obj).value;
	obj_value = ++obj_value ;
	document.getElementById(obj).value = obj_value;
}

/*模拟单选项 add by xiesw*/
function fChoice(tagall,tagname,sel){
var oChoice = document.getElementById(tagall).getElementsByTagName(tagname);
for(var i=0;i<oChoice.length;i++){
	+function(i){
		oChoice[i].parentNode.onclick = function(){
			for(var j=0;j<oChoice.length;j++){
				oChoice[j].className="";
			}
				oChoice[i].className = sel;
		}
	}(i)
}
}

//add by heyz
function alertBox(){
	var showBox = document.getElementById('showbox');
	var alertBox = document.getElementById('alertbox');
	var alertAlist = alertBox.getElementsByTagName('a');
	var alertAlistLen = alertAlist.length;
	showBox.onclick = function(){
		alertBox.style.display = "block";
	}

	alertBox.addEventListener('click',function(e){
		var target = e.target;
		var flag = false;
		for(var i=0;i<alertAlistLen;i++){
			if(target == alertAlist[i]){flag = true;}
		}
		if(!flag){alertBox.style.display = "none";}
	},false);

}













