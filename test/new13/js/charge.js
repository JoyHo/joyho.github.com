var tab_li = document.getElementById("tab").getElementsByTagName("li");
var choose=document.getElementById("choose");
var other=document.getElementById("other");
var tips_btn=document.getElementById("tips_btn");
var ad=document.getElementById("ad");
for(var i=0;i<tab_li.length;i++){
	+function(i){
		tab_li[i].onclick = function(){
			for(var j=0;j<tab_li.length;j++){
				tab_li[j].className="";
				document.getElementById("cont_"+j).style.display = "none";
			}
			tab_li[i].className = "current";
			document.getElementById("cont_"+i).style.display = "block";
		}
	}(i)
}

     choose.onclick = function(){
			if(other.style.display == "none"){
			   other.style.display="block";
			  this.className = "";
		}
		else{
			other.style.display="none";
			this.className = "";
		 }
		}

 
     tips_btn.onclick = function(){
			if(ad.style.display == "none"){
			   ad.style.display="block";
			  this.className = "upload";
		}
		else{
			ad.style.display="none";
			this.className = "";
		 }
		}
 
 
 
 //点击状态
var aLi = document.getElementById("coins").getElementsByTagName("li");
var bLi = document.getElementById("coins1").getElementsByTagName("li");
var cLi = document.getElementById("coins2").getElementsByTagName("li");
var dLi = document.getElementById("coins3").getElementsByTagName("li");
var eLi = document.getElementById("coins4").getElementsByTagName("li");
var fLi = document.getElementById("coins5").getElementsByTagName("li");
var gLi = document.getElementById("coins6").getElementsByTagName("li");
var hLi = document.getElementById("coins7").getElementsByTagName("li");
var iLi = document.getElementById("coins8").getElementsByTagName("li");
function add(obj){
	for(var i=0;i<obj.length;i++){
	obj[i].onclick = function(){
		for(var j=0;j<obj.length;j++){
			obj[j].className = "";
		}
		this.className = "current";
		
	   }
  }
}
add(aLi);
add(bLi);
add(cLi);
add(dLi);
add(eLi);
add(fLi);
add(gLi);
add(hLi);
add(iLi);
   