﻿var show_pic = {
	display_pic:function(){
		var list = $('.work_list').eq(0);
		var big_pic = $('.big_pic').eq(0);
		list.delegate('li','mousemove',function(e){
			var this_src = $(this).find('img').eq(0).attr('src');
			var x =parseInt(10+ e.pageX);
			var y =parseInt(10+ e.pageY);
			big_pic.html("<img src='"+this_src+"'style='width:500px;height:500px;' />");
			big_pic.css({"display":"block","left":x+"px","top":y+"px"});
			})
			  .delegate('li','mouseout',function(){
        	        big_pic.css("display","none");
				      });
		}
	}
$(show_pic.display_pic())