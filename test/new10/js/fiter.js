var sift = document.getElementById("sift");
var filtrate = document.getElementById("filtrate");
var close = document.getElementById("close");
		sift.onclick = function(){
			if(filtrate.style.display == "none"){
			  filtrate.style.display="block";
		}
		else{
			filtrate.style.display="none";
		 }
		}
close.onclick = function(){
			filtrate.style.display="none";
		}



