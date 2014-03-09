var navOper = {
	navInit:function(){
		var that = this;
		that.curClick();
		that.overDisplay();
	},
	curClick:function(){
		$("#nav li").each(function(){
			$(this).on("tap",function(){
				$("#nav li").each(function(){
					$(this).removeClass("current");
				});//清楚项的选中状态
				$(this).addClass("current");

				if($(this).attr("id") == "more"){//点击了more
					$("#subnav").show();
					$("#piece").removeClass("down").addClass("fold");
					$("#overdiv").addClass("over");
				}//more
				else{
					$("#subnav").hide();
					$("#piece").removeClass("fold").addClass("down");
					$("#overdiv").removeClass("over");
				}
			});//on
		});
	},
	overDisplay:function(){
		$("#overdiv").on("tap",function(e){
			if($(e.target).attr("id") == "overdiv"){
				$("#more").removeClass("current");
				$("#subnav").hide();
				$("#piece").removeClass("fold").addClass("down");
				$(this).removeClass("over");
			}
		});
	}
}//navOper
var phoneCheck = {
	inputInit:function(){
		var that = this;
		that.changeInputbtn();
		that.deleteInput();
	},
	changeInputbtn:function(){
		$("#input").on("focus",function(){
			$("#inputbtn").attr("class","delete");
		});
	},
	deleteInput:function(){
		$("#inputbtn").on("tap",function(){
			if($(this).attr("class") == "delete"){
				$("#input").attr("value","");
				$(this).attr("class","check");
			}//delete
		});
	}
}

var amountSelect = {
	select:function(){
		$("#money li").each(function(){
			$(this).on("tap",function(){
				$("#money li").each(function(){
					$(this).removeClass("selected");
				});//清除其他项的选中状态
				$(this).addClass("selected");
			});
		});
	}//select
}

var adDel = {
	delAd:function(){
		$("#adbtn").on("tap",function(){
			$("#AD").hide();
		});
	}//delAd
}

window.onload = function(){
	navOper.navInit();
	phoneCheck.inputInit();
	amountSelect.select();
}