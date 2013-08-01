$(document).ready(
		function () {
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
		    })
		}
	);