$(document).ready(
		function () {
			if(window.ActiveXObject){
			var nav = $('.nav').eq(0).css('left','100px');
			var dock = $('a.dock_item');
			var dock_container = $('.dock_container').eq(0);
			dock_container.removeClass('dock_container');
			dock.removeClass('dock_item');
			dock.addClass('dock');
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

