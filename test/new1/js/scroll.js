~function(){
		
		
		slide = function(){
			var oList = document.querySelector('#msg ul');
			var aListLi = oList.querySelectorAll('li');
			var iListLen = aListLi.length;
			var oTimer = null;
			var iIndex = 0;
			var aArr = [];
			for(var i =0;i<iListLen;i++)
			{
				aArr[i] = aListLi[i].innerHTML;
			};
			oTimer = setInterval(function(){
				oList.style.webkitTransitionDuration='500ms';
				oList.style.top= '-34px';
				oList.addEventListener('webkitTransitionEnd',fnEnd,false);
			},2000);
			function fnEnd(){
				oList.style.webkitTransitionDuration='0';
				oList.style.top= '0px';
				iIndex++;
				for(var i =0;i<aListLi.length;i++)
				{
					aListLi[i].innerHTML = aArr[remainder(i+iIndex)];			
				}
				oList.removeEventListener('webkitTransitionEnd',fnEnd,false);
			}
			function remainder(iNum){
				return iNum % iListLen;
			}
		}
		//函数调用
		window.onload = function(){
			slide();
		}
	}()