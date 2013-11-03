/*javascript document*/
$("#navigator li>a")
	.mouseover(function(){			
		$(this).prev().fadeIn(600);
	})
	.mouseout(function(){
		$(this).prev().fadeOut(50);;
	});/*鼠标在a上面的时候，上移div，移除时，下移div*/


var $nowImg ,$nextImg,$nowButton;
changeImg = function(){
	$getImg = $("#img_box >img");
	$nowImg = $getImg[0];/*当前图片*/
	$nextImg = $($getImg[0]).next();/*下一张图片*/
	$nowButton = $("#change_img button")[0];
	$($nowButton).addClass("change_img_on");/*当前的图片标识*/
	setInterval(function(){
	showImg($nowImg,$nextImg);
	$nowImg = $nextImg;
	if($($nowButton).next()[0]==null){
		$nowButton = $("#change_img button")[0];
	}
	else{$nowButton = $($nowButton).next();}
	$($nowButton).addClass("change_img_on");/*改变图片标识*/
	if($($nextImg).next()[0]==null){
		$nextImg = $getImg[0];
	}
	else {
	$nextImg = $($nextImg).next();
	}/*改变当前图片与下一张图片*/
	},4000);
}()
function showImg($nowImg,$nextImg){
			$($nowImg).fadeOut(100);
			$($nextImg).fadeIn(900);
			$($nowButton).removeClass("change_img_on");
}/*转换图片的函数*/
$("#change_img button").bind("click",function(){
	$($nowButton).removeClass("change_img_on");
	$nowButton = $(this)[0];
	$($nowButton).addClass("change_img_on");
	y = $(this)[0].value;
	$($nowImg).hide();
	$($getImg[y]).fadeIn();
	$nowImg = $getImg[y];
	if(y==4)
	{$nextImg = $getImg[0];}
	else{$nextImg = $($getImg[y]).next();}
	return false;
	})

$(".ranking_head li:eq(0)").bind("click",function(){
	$(".ranking_head li").removeClass("on_select");
	$(this).addClass("on_select");
	$(".ranking").hide();
	$(".ranking:eq(0)").show();
})
$(".ranking_head li:eq(1)").bind("click",function(){
	$(".ranking_head li").removeClass("on_select");
	$(this).addClass("on_select");
	$(".ranking").hide();
	$(".ranking:eq(1)").show();
})
$(".ranking_head li:eq(2)").bind("click",function(){
	$(".ranking_head li").removeClass("on_select");
	$(this).addClass("on_select");
	$(".ranking").hide();
	$(".ranking:eq(2)").show();
})

