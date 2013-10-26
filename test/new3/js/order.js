function order()
  {
  element=document.getElementById('order_image')
    if (element.src.match("drop"))
    {
    element.src="images/ico_rise.png";
    }
    else
    {
    element.src="images/ico_drop.png";
    }
   }
