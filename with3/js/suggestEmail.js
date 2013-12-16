window.onload=function(){
    //邮箱输入提示
    emailAutomatic("email",maillist,"maillist");
}

var maillist= ['163.com','126.com','139.com','foxmail.com','gmail.com','hotmail.com','sina.com','sina.cn','sohu.com','qq.com','vip.163.com','vip.126.com','vip.qq.com','vip.sina.com','wo.com.cn','yahoo.cn','yahoo.com.cn'];
var default_maillist= ['qq.com','163.com','gmail.com','126.com'];

function emailAutomatic(emailInputId,data,ulId) {
     var input = document.getElementById(emailInputId);
     var data = data;
     var mail_list = document.getElementById(ulId);
     var mail_list_parent = mail_list.parentElement;
     hide(mail_list,mail_list_parent);
    
     mail_list.addEventListener('click',function(e){
        var target = e.target || e.srcElement;
        input.value = target.innerHTML;
        hide(mail_list,mail_list_parent);
        validEmail();
     },false);

     mail_list.addEventListener('fucus',function(e){
         display(mail_list,mail_list_parent);
     },false);

     //为了兼容chrome浏览器所做的body监听事件
     document.body.addEventListener('click',function(e){
        var target = e.target || e.srcElement;
        if (target.id != input.id && target.localName!='li'){
             hide(mail_list,mail_list_parent);              
        }
     },false);

    
     input.onfocus = function(){
          display(mail_list,mail_list_parent);
     };
     
    var lastValue = "";    
    window.setInterval(function(){
    var emailValue = input.value;
    // 当邮箱长度等于0大于35时不联想
    if (emailValue.length > 0 &&  emailValue.length <= 35){
        //输入的值改变了才触发
    if (emailValue != lastValue){
        lastValue = emailValue;
        hide(mail_list,mail_list_parent);
        mail_list.innerHTML = "";
        // 没有@
        if (emailValue.indexOf('@')==-1){     
            for (var i = 0, len = default_maillist.length;i<len;i++){
                var item = document.createElement('li');
                item.innerHTML = input.value + '@' + default_maillist[i];
                mail_list.appendChild(item);
            }
        }else {
            var index = emailValue.indexOf('@');
            var subString = emailValue.substr(index + 1, emailValue.length);
            var otherSubStr = emailValue.substr(0,index);
            var flag = false;
            if(subString.length == 0) {
                for (var i = 0, len = default_maillist.length;i<len;i++){
                    var item = document.createElement('li');
                    item.innerHTML = otherSubStr + '@' + default_maillist[i];
                    mail_list.appendChild(item);
                }
            } else {
                for (var i = 0, len = data.length;i<len;i++){
                    if (data[i].indexOf(subString) == 0){
                        flag = true;
                        if (subString == data[i]){
                            mail_list.style.display = 'none';
                            break;
                        }
                        var item = document.createElement('li');
                        item.innerHTML = otherSubStr +  '@' + data[i];
                        mail_list.appendChild(item);
                    }
                }
            }
          }
         display(mail_list,mail_list_parent);
        } 
    } else {
        lastValue = "";
        hide(mail_list);
    }
},300);
}


function emailAutomaticSome(emailInputId,data,ulId) {
       
    var input = document.getElementById(emailInputId);
    var data = data;
    var mail_list = document.getElementById(ulId);
    var mail_list_parent = mail_list.parentElement;
    
    mail_list.addEventListener('click',function(e){
        var target = e.target || e.srcElement;
        input.value = target.innerHTML;
        hide(mail_list,mail_list_parent);
     },false);

    mail_list.addEventListener('fucus',function(e){
       display(mail_list,mail_list_parent);
    },false);

     //为了兼容chrome浏览器所做的body监听事件
    document.body.addEventListener('click',function(e){
        var target = e.target || e.srcElement;
        if (target.id != input.id && target.localName!='li'){
            hide(mail_list,mail_list_parent);                   
        }
     },false);

    
     input.onfocus = function(){
        display(mail_list,mail_list_parent);
     };
     
     var lastValue = "";    
     window.setInterval(function(){
     var emailValue = input.value;
     if (emailValue.length != 0 ){
        //输入的值改变了才触发
         if (emailValue != lastValue){
             lastValue = emailValue;
             hide(mail_list,mail_list_parent);
             mail_list.innerHTML = "";
             var items = null;
             if (emailValue.indexOf('@')!=-1){
                var index = emailValue.indexOf('@');
                var subString = emailValue.substr(index + 1, emailValue.length);
                var otherSubStr = emailValue.substr(0,index);               
                var flag = false;
                if(subString.length == 0) {
                    for (var i = 0, len = default_maillist.length;i<len;i++){
                        var item = document.createElement('li');
                        item.innerHTML = otherSubStr + '@' + default_maillist[i];
                        mail_list.appendChild(item);
                    }
                } else {
                    for (var i = 0, len = data.length;i<len;i++){   
                        if (data[i].indexOf(subString) == 0){
                            flag = true;
                            if (subString == data[i]){
                                break;
                            }
                            var item = document.createElement('li');
                            item.innerHTML = otherSubStr +  '@' + data[i];
                            mail_list.appendChild(item);
                        }
                    }
                }
               display(mail_list,mail_list_parent);
          }
          display(mail_list,mail_list_parent);
       }
    }else {
      mail_list.innerHTML = '';
    }
},300);
}

function hide(element,parentElement){
    if (element != null){
        element.style.display = 'none';
    }
    if (parentElement != null){
        parentElement.style.display = 'none';
    }
}
/**
 适合如下
<div class="module_input">
      <input type="text" name="textfield" id="email" />
      <span class="xing">*</span>
      <div class="mail_win" id="mail_win" style="display:block;text-align:left;">
        <ul class="maillist" id="mail_win_list">
        </ul>
      </div>
</div>  
*/
function display(element,parentElement){

    if (element != null){
        element.style.display = 'block';
    }
    if (parentElement != null){
        if(element.innerHTML.length !=0 && element.childElementCount > 0){
            parentElement.style.display = 'block';
        }
    }
}
