$(document).ready(
		function () {
			if($.browser.msie){
			var nav = $('.nav').eq(0).css('left','100px');
			var dock_item = $('.dock_container a');
            dock_item.each(function(){
            	this.className = 'dock';
            });
			}
			else
		    {
				$('.nav').Fisheye({
		        maxWidth: 35,
		        items: 'a',
		        itemsText: 'span',
		        container: '.dock_container',
		        itemWidth: 45,
		        proximity: 50,
		        alignment: 'center',
		        valign: 'bottom',
		        halign: 'center'
		      });
			}//else
			
		}
	);

