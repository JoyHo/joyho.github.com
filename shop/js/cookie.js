// JavaScript Document

/*  将商品信息读入Cookie中 */
function SetCookie(No,Name,Price,Quantity){
	var ValueString = '/No='+No+'/Name='+Name+'/Price='+Price+'/Quantity='+Quantity+'/Total='+parseFloat(Price)*parseInt(Quantity);
	var NameString = No+"="+ValueString;
	var Expriyday = new Date();
	Expriyday.setTime(Expriyday.getTime()+3*60*60*1000);//三个小时后失效
	var num = parseInt(Quantity);
	var ExpriyString = "Expires="+Expriyday.toGMTString();
	if(!isNaN(num)){
		document.cookie = NameString+";"+ExpriyString+";path=/";
		}
	}
	
/*  删除cookie,即删除商品，同时刷新数据  */	
function DelRecorder(Cookie_Name){
	document.cookie = Cookie_Name+"=dispear;Expires=Saturday, 16 Sep 1990 09:10:00 GMT;path=/";
	 window.location.reload();
	 
	}
	
/*  存储商品信息的数组，是一个二维数组  */
function goods_array(){
	var c = document.cookie;
    c = c.split(';');
    var goods_list = c;
    for(var i=0;i<goods_list.length;i++){
	    goods_list[i] = goods_list[i].split('/');
	  }
	return goods_list;
	}
	

/*  购物车表格中商品行信息  goods_arr是一个商品的二维数组*/
function TrTemple(goods_arr){
	if(goods_arr){
		var tr = "";
		for(var i=0;i<goods_arr.length;i++){
			tr += "<tr class="+"goods_details"+"><td>"+goods_arr[i][1].substring(3)+"</td><td>"+goods_arr[i][2].substring(5)+"</td><td>"+goods_arr[i][3].substring(6)+"</td><td><button class='quantity_change' onclick='Quantity_Change(this)'>-</button>"+goods_arr[i][4].substring(9)+"<button class='quantity_change' onclick='Quantity_Change(this)'>+</button></td><td>"+goods_arr[i][5].substring(6)+"</td><td><a href='#' class='delete' onclick='DelRecorder(goods_id(this))'>删除</a></td></tr>";
			}
		return tr;
		}
	return;
	}
	
/*  统计购物车产品数量  */	
function Quantity_total(){
	var goods = goods_array();
	var quantity=0;
	for(var i=0;i<goods.length;i++){
		quantity+=parseInt(goods[i][4].substring(9));
		}
	return quantity;
	}
	
/*  购买金额总计  */
function Price_Total(){
	var goods = goods_array();
	var cash_total = 0;
	for(var i=0;i<goods.length;i++){
		cash_total+=parseFloat(goods[i][5].substring(6));
		}
	return cash_total;
	}
	
/*  获取当前行的商品编号  */
function goods_id(obj){
	var current_tr = obj.parentNode.parentNode;
	var id = current_tr.childNodes[0].innerHTML;
	return id;
	}
	
/*  清空购物车   */	
function clear_cart(){
    var goods = goods_array();
	for(var i=0;i<goods.length;i++){
		DelRecorder(goods[i][1].substring(3));
		}
	window.location.reload();
	}
	
/*  改变所购买的某个商品的数量  */
function Quantity_Change(obj){
	var goods = goods_array();
	var id = goods_id(obj);
	var quantity  = 0;
	var name = "";
	var price = 0;
	var action = obj.innerHTML;
	for(var i=0;i<goods.length;i++){//获取对应商品的数量
		if(goods[i][1].substring(3) == id){
			quantity = parseInt(goods[i][4].substring(9));
			name = goods[i][2].substring(5);
			price = goods[i][3].substring(6);
			break;
			}//if
		}//for
	if(action == "-"){
		if(quantity>0){
			quantity -=1;
			}
		}
	if(action == "+"){quantity+=1;}
	if(quantity>0)SetCookie(id,name,price,quantity);
	if(quantity<=0)DelRecorder(parseInt(id));//该商品数量为0时需要把该商品移出购物车
	window.location.reload();
	}
	
/*  把商品放进购物车  */
function Put_Into_Cart(goods_id,goods_name,goods_price){
	var flag = false;//判断该商品是否已经存在于购物车中
	var goods = goods_array();
	var quantity = 0;
	if(goods!=null&&goods!=""){
		for(var i=0;i<goods.length;i++){
			if(goods[i][1].substring(3) == goods_id){
				flag = true;
				quantity = parseInt(goods[i][4].substring(9));
				break;
				}//if
			}//for
		}//if
	if(flag == false){//该商品不存在于购物车中
			SetCookie(goods_id,goods_name,goods_price,1);//把商品放入购物车中
			alert('该商品已放入购物车中！');
			}
		else{//该商品已存在于购物车中，只需要把该商品的购买数量+1
			SetCookie(goods_id,goods_name,goods_price,quantity+1);
			alert('该商品已存在于购物车中，数量+1');
			}
	}
	
/*  设置商品编号  obj为当前购买按钮 */
function SetId(obj){
	var goods_div = document.getElementsByClassName('goods');
	var obj_goods_div = obj.parentNode.parentNode;
	var id=0;
	for(var i=0;i<goods_div.length;i++){
		if(goods_div[i] == obj_goods_div){
			id = i+1;
			break;
			}
		}
	return id;
	}

	
	
/* 购买商品的行为,即点击购买按钮时的行为   */
function buy(obj){
	var goods_id = SetId(obj);//商品的编号
	var goods_name = obj.parentNode.parentNode.childNodes[3].childNodes[0].innerHTML;
    var goods_price = obj.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML.substring(1);
	Put_Into_Cart(goods_id,goods_name,goods_price);
	}
	
