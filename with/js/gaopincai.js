function zhuitab(){
	var zhuiTabLi = document.getElementById('zhuitab').getElementsByTagName('li');
	var zhuiTabLiLen = zhuiTabLi.length;
	for(var i=0;i<zhuiTabLiLen;i++){
		+function(i){
			zhuiTabLi[i].onclick = function(){
				for(var j=0;j<zhuiTabLiLen;j++){
					zhuiTabLi[j].className = "";
					document.getElementById("cont"+j).style.display = "none";
				}
				zhuiTabLi[i].className = "redcurrent";
				document.getElementById("cont"+i).style.display = "block";
			}
			}(i)
	}

}
function scjh(){
	var scjh = document.getElementById('scjh');
	var scjhcont = document.getElementById('scjhcont');
	scjh.addEventListener('click',function(){
		if(scjhcont.style.display == "none"){scjhcont.style.display = "block";}
		else if(scjhcont.style.display == "block"){scjhcont.style.display = "none";}
		},true);
}
function hezhiMore(){
	var morehz = document.getElementById('morehz');
	var morehzSpan = morehz.getElementsByTagName('span');
	var length = morehzSpan.length;
	if(length > 5){
		for(var i=5;i<length;i++){
			+function(i){
				morehzSpan[i].className = "displaynone";
				}(i)
		}
		var opration = document.createElement('a');
		opration.href = "javascript:void(0)";
		opration.innerHTML = "更多+";
		opration.className = "displayblock bluelink";
		opration.onclick = function(){
			if(this.innerHTML == "更多+"){
				for(var i=5;i<length;i++){
					+function(i){
						morehzSpan[i].className = "displayblock";
					}(i)
			}//for
			this.innerHTML = "收起-";
		}//if
		else{
			for(var j=5;j<length;j++){
				+function(j){
					morehzSpan[j].className = "displaynone";
				}(j)
			}//for
			this.innerHTML = "更多+";
		}//else
		}
	    morehz.insertBefore(opration, morehzSpan[5]);
	}//if

}