/** 
 * android-beta 
 * @version: 1.0.0 
 * @date: 2013-09-12 07:52:12 
 */
function renderSpecial(a){function b(){var a='<div class="loading">正在努力加载中，请稍后...</div>';f.$dialogContent.empty().append(a)}function c(){var a=config.xrhRequest_error.replace("{local}","dialog");$.ajax({type:"GET",url:a,timeout:SQ.XHRTime}),f.$dialogContent.empty();var c='<div class="reload"><p>抱歉，加载失败，请重试</p><div class="sq-btn f-grey J_reload">重新加载</div> </div>';f.$dialogContent.append(c),$(".J_reload").on("click",function(){b(),e()})}function d(a){f.$dialogContent.empty();var b="string"==typeof a?$.parseJSON(a):a,c='<div class="specialPanel"><h2>'+b.data.specialName+"</h2>"+'<div class="sq-touch sq-list vertical rock-app-list J_dialogSpecial">'+"<ul>"+b.data.appList+"</ul>"+"</div>";f.$dialogContent.append(c),setTimeout(function(){var a=$(".J_dialogSpecial"),b=a.find("ul"),c=b.find("li").length,d=window.innerHeight-40-36,e=71*c;a.height(d),b.height(e),SQ.specialSlider=SQ.TouchSlip({MODE:"px",DOM_TRIGGER_TARGET:".J_dialogSpecial ul",SHOW_SCROLL_BAR:!0})},200)}function e(){$.ajax({type:"POST",url:g,timeout:SQ.XHRTime,success:function(a){a?d(a):c()},error:function(){c()}})}var f=this,g=$(a.target).attr("data-api");g&&function(){b(),e()}()}if(SQ.preformance&&(SQ.preformance.mainScriptRunStart=new Date),SQ.defaultIcon="../asset/apkz/images/default.png",SQ.spDefaultIcon="../asset/apkz/images/sp-default.png",SQ.thDefaultIcon="../asset/apkz/images/th-default.png",SQ.DEV&&(SQ.defaultIcon="dist/images/default.png",SQ.spDefaultIcon="dist/images/sp-default.png",SQ.thDefaultIcon="dist/images/th-default.png"),SQ.XHRTime=5e3,SQ.util.simpleTip={tipsClear:void 0,init:function(){var a=this;a.$simpleTip=$(".simpleTip"),0===a.$simpleTip.length&&(a.$simpleTip=$("<div class='simpleTip'></div>"),a.$simpleTip.appendTo("body"))},show:function(a){var b=this;b.init(),b.$simpleTip.html(a),b.$simpleTip.width(),b.$simpleTip.height();var c=window.innerWidth,d=window.innerHeight,e=SQ.dom.$el.$body.scrollTop();b.$simpleTip.css({left:(c-220)/2,top:(d-36)/2+e}),b.$simpleTip.show(),b.autoClear()},autoClear:function(){var a=this;a.tipsClear||(a.tipsClear=setTimeout(function(){a.$simpleTip.hide(),a.tipsClear=void 0},2e3))}},function(){var a=$(".J_randomPic").find("li"),b=$("<img width='100%'>"),c=SQ.util.generate.randomInt(0,a.length-1),d=a.eq(c);b.attr("src",d.attr("data-img")),d.append(b).show()}(),function(){new SQ.Tabs({EVE_EVENT_TYPE:"click",DOM_TRIGGER_TARGET:".J_tabs",DOM_TABS:".tabs>li",DOM_PANELS:".tab-panels",NUM_ACTIVE:0,trigger:function(a,b,c){var d=b.eq(c);if(d.hasClass("J_iconLazyLoad")&&!d.hasClass("imgLoaded")){var e=d.find("img");e.addClass("J_lazyload"),imglazyload.refresh(),d.addClass("imgLoaded")}}})}(),function(){function a(a){function b(){e.hide(),f.show(),g.focus()}function c(){e.show(),f.hide()}var d=$(".J_dplSearchBar"),e=d.find(".fake"),f=d.find(".real"),g=a.$input,h=e.find(".search-input"),i=d.find(".cancel");h.on("click",function(){b()}),i.on("click",function(){c(),a.clear()})}function b(a,b){SQ.TEMP=SQ.TEMP||{};var c=config.search_URI+"&keyword=",d="<ul>",e="";b.context.sign;var f,g;if(e=b.data,g=e.length,0!==g){for(f=0;g>f;f++){var h=e[f];d+=h.appName?'<li class="sq-list vertical"><ul><li><div class="icon"><i><img src="'+h.icon+'"/></i></div>'+'<dl class="description">'+'<dt class="row">'+h.appName+"</dt>"+'<dd class="row">版本:'+h.version+"<em>"+h.size+"</em></dd>"+"</dl>"+'<div class="extend v-middle ucweb-anchor"><div class="sq-btn f-grey small"><a href="'+h.packageURL+'"></a>下载</div></div>'+'<a href="'+h.detailURL+'" class="trigger-area"></a>'+"</li>"+"</ul>"+"</li>":'<li class="keyword"><a href="'+c+h.keyword+'">'+h.keyword+"</a></li>"}d+="</ul>",a.$suggestPanel.append(d).show()}}var c=$(".cancel"),d=$(".submit-btn");new SQ.Suggest({DOM_INPUT:".J_searchInput",DOM_CLEAR_BTN:".J_clearInput",DOM_SUGGEST_PANEL:".suggest-panel",API_URL:config.search_API,beforeStart:function(){var b=this;a(b)},start:function(){c.hide(),d.show()},show:function(a){var c=this;b(c,a)},clear:function(){c.show(),d.hide()}})}(),$(".J_lazyload").length>0)var imglazyload=new SQ.LazyLoad({DOM_LAZY_ITEMS:".J_lazyload",DOM_LAZY_PARENT:".sq-list .icon",CSS_PLACEHOLDER:".default-icon",IMG_PLACEHOLDER:SQ.defaultIcon,NUM_THRESHOLD:250});if($(".J_lazyloadSp").length>0)var imglazyloadSp=new SQ.LazyLoad({DOM_LAZY_ITEMS:".J_lazyloadSp",DOM_LAZY_PARENT:".sq-list .icon",CSS_PLACEHOLDER:".default-icon",IMG_PLACEHOLDER:SQ.spDefaultIcon,NUM_THRESHOLD:250});if($(".J_lazyloadTh").length>0)var imglazyloadTh=new SQ.LazyLoad({DOM_LAZY_ITEMS:".J_lazyloadTh",DOM_LAZY_PARENT:".sq-list .icon",CSS_PLACEHOLDER:".default-icon",IMG_PLACEHOLDER:SQ.thDefaultIcon,NUM_THRESHOLD:250});var appList=new SQ.LoadMore({EVE_EVENT_TYPE:"scroll",DOM_TRIGGER_TARGET:window,DOM_AJAX_BOX:".J_ajaxWrap",DOM_STATE_BOX:".J_scrollLoadMore",CSS_INIT_STYLE:"sq-loadMore-btn",NUM_START_PAGE_INDEX:2,NUM_SCROLL_MAX_PAGE:3,DATA_TYPE:"html",TXT_LOADING_TIP:"正在努力加载中，请稍后...",TXT_LOADED_ERROR:"加载失败，点击重新加载",loaded:function(){imglazyload&&imglazyload.refresh(),imglazyloadSp&&imglazyloadSp.refresh(),imglazyloadTh&&imglazyloadTh.refresh()},scrollEnd:function(){var a=this;a.$stateBox.addClass("sq-loadMore-clickState"),imglazyload&&imglazyload.refresh(),imglazyloadSp&&imglazyloadSp.refresh(),imglazyloadTh&&imglazyloadTh.refresh()},loadError:function(){var a=config.xrhRequest_error.replace("{local}","loadmore");$.ajax({type:"GET",url:a,timeout:SQ.XHRTime})}}),specialDialog=new SQ.Dialog({EVE_EVENT_TYPE:"click",DOM_TRIGGER_TARGET:".J_showSpecial",TXT_CLOSE_VAL:"×",CSS_STYLE:"special-dialog",FULLSCREEN_OFFSET:[20,10],ANIMATE:"bounceIn",MASK:!0,LOCK:!0,show:function(a){renderSpecial.call(this,a)},resize:function(){if(SQ.specialSlider){var a=$(".rock-app-list"),b=window.innerHeight-40-36;a.height(b),SQ.specialSlider.refresh()}}});!function(){function a(a){var b=a,c=b.RESULT;if(100===c){var d=new Date,e=d.getHours(),f=b.items.upcount;if(f>0){var g=f>99?"99+":f;l.text(g).show(),"isVisited"!==k&&(n.text(g),m.show(),setTimeout(function(){m.hide()},2e3),SQ.store.cookie.set("WeekVisited","isVisited","week","/"))}SQ.store.cookie.set("updateTipTime",e,"day","/"),SQ.store.cookie.set("updateNum",f,"day","/")}}var b=config,c=parseFloat(b.ucweb),d=b.sn||SQ.store.cookie.get("sn"),e=b.ei||SQ.store.cookie.get("imei"),f=b.update_API,g=b.updateReport_API;if(c&&d&&e&&!(8.4>c)){var h,i=parseInt(SQ.store.cookie.get("updateTipTime"),10),j=parseInt(SQ.store.cookie.get("updateNum"),10),k=SQ.store.cookie.get("WeekVisited"),l=$(".update-reminder").find(".num"),m=$(".reminder"),n=m.find("em");if(0!==l.length&&0!==m.length){if(i){var o=new Date,p=o.getHours();if(p===i){if(j&&j>0){var q=j>99?"99+":j;l.text(q).show()}return}}try{h=ucweb.startRequest("shell.appsInfo.all")}catch(r){}if(h){var s={uid:e,sn:d,version:"1.0",itemcount:0,items:h};$.ajax({type:"POST",url:f,dataType:"json",data:s,timeout:SQ.XHRTime,success:function(b){a(b)},error:function(){$.get(g,{imei:e,sn:d})}})}if(SQ.DEV){var t={RESULT:100,items:{upcount:7}};a(t)}}}}(),function(){var a=$(".J_detail").length>0?!0:!1;a&&(function(){var a=$("#scroller");if(0!==a.length){var b,c,d,e=a.find("li"),f=e.length,g=a.find("img"),h=!1;g.each(function(){var a=this;a.onload=function(){var a=this;b=a.width,c=a.height,h=!0}}),d=setInterval(function(){var i=g.get(0);if(i.width>0&&(b=i.width,c=i.height,h=!0),h){var j,k;b>c?j=244:(j=164,e.addClass("portrait")),k=f*(j+10)+10,a.width(k),SQ.TouchSlip({MODE:"px",DOM_TRIGGER_TARGET:"#scroller",DIRECTION:"x",SHOW_SCROLL_BAR:!0}),clearInterval(d)}},200)}}(),function(){function a(a,b){a.css({"max-height":1e4}),b.removeClass("rotateHalfReturn").addClass("rotateHalf")}function b(a,b){var c=parseInt(a.attr("data-original"),10);a.css({"max-height":c}),b.removeClass("rotateHalf").addClass("rotateHalfReturn")}var c=$(".J_folder");0!==c.length&&c.each(function(){var c=$(this),d=c.find(".J_toggle"),e=c.find(".context"),f=c.find(".J_context"),g=c.find(".fold-toggle"),h=e.height(),i=f.height();i>h&&(g.show(),e.attr("data-original",h),d.on("click",function(){h=e.height(),g.addClass("animated"),i>h?a(e,g):b(e,g)}))})}(),function(){function a(){var a=d.text();return"暂无推荐"===a?!1:!0}function b(b){switch(e.removeClass("connectting"),b){case"1":var c=a();if(c){var f=d.find("em"),g=parseInt(f.text(),10)+1;f.text(g)}else d.html('<i class="sq-icon good"></i>已有<em class="light-orange">1</em>人推荐');SQ.util.simpleTip.show("推荐成功！");break;case"2":SQ.util.simpleTip.show("您已经推荐过了！");break;case"3":SQ.util.simpleTip.show("推荐失败！")}}function c(){e.hasClass("connectting")||(e.addClass("connectting"),$.ajax({type:"POST",url:f,dataType:"json",timeout:SQ.XHRTime,success:function(a){var c=a.data.toString();b(c)},error:function(){SQ.util.simpleTip.show("抱歉！推荐失败，请重试！"),e.removeClass("connectting")}}))}var d=$(".J_rate"),e=$(".J_rateBtn"),f=config.API_Ding;e.on("click",c)}(),function(){var a=config.API_Report;$(".J_report").on("click",function(){$.ajax({type:"GET",url:a,timeout:SQ.XHRTime,success:function(a){"200"===a&&SQ.util.simpleTip.show("已成功举报到12321！"),"301"===a&&SQ.util.simpleTip.show("您已经举报过了！")},error:function(){}})})}())}(),function(){function a(){i.show(),f.each(function(a){a>7&&$(this).hide()}),d.css({"max-height":h})}function b(){i.hide(),f.each(function(a){a>7&&$(this).show()}),d.css({"max-height":9999})}function c(){var a,b,c=[],d=i.length?g-1:g,e=f.find("a"),h=e.length;for(b=0;d>b;b++){var j=b+1,k=$("#t"+j),l=k.offset()?k.offset().top:0;c.push(l)}for(a=0;h>a;a++)e.eq(a).attr("data-pos",c[a]);e.off("click").on("click",function(a){a.preventDefault();var b=$(this),c=b.attr("data-pos"),d=b.attr("data-necid"),e=config.xrhRequest_error.replace("{local}",d);$.get(e),window.scrollTo(0,c)})}var d=$(".J_navFolder"),e=d.length>0?!0:!1;if(e){var f=d.find("li"),g=f.length,h=f.find("ul").height(),i=$(".J_navShowMore"),j=$("<li class='J_hideMore no-tap-color'><span>收起<i class='sq-icon arrow turn'></span></li>");!function(){i.length&&(d.append(j),j=$(".J_hideMore"),i.on("click",function(a){a.preventDefault(),b(),c()}),j.on("click",function(b){b.preventDefault(),a(),c()})),c()}()}}(),function(){function a(a){var b=setTimeout(function(){h.text(""),clearTimeout(b)},a)}function b(){var b=f.val().replace(/\s+/g,""),c=g.val().replace(/\s+/g,"");return i.each(function(){j+=$(this).is(":checked")}),-1===j.indexOf("true")?(h.text("您的反馈类型还未选择！"),a(1500),void 0):(f.on("focus",function(){a(500)}),0===b.length?(h.text("您的意见还未填写！"),void 0):($.ajax({type:"POST",url:e,dataType:"json",data:{sug:b,contact:c,feedbackType:d},timeout:SQ.XHRTime,success:function(a){var b=parseInt(a.data,10);switch(b){case 1:f.val(""),g.val(""),h.text("提交成功！");break;case 2:h.text("您说话太快了，请稍后再提交！")}},error:function(){h.text("抱歉！提交失败，请重试。")}}),void 0))}var c=$(".J_feedBack").length>0?!0:!1;if(c){var d,e=config.API_feedback,f=$(".sug"),g=$(".contact"),h=$(".verifyTips"),i=$("input[name=feedback]"),j="";$(".J_submitFeedbackForm").on("click",function(a){a.preventDefault(),b()}),i.on("click",function(){var a=$(this),b=a.attr("data-tip");d=a.attr("value"),f.attr("placeholder",b)})}}(),$(".J_goTop").on("click",function(a){SQ.util.goTop(a)}),$(".J_goBack").on("click",function(a){SQ.util.goBack(a)}),SQ.preformance&&(SQ.preformance.f2e_msrt=new Date-SQ.preformance.mainScriptRunStart,delete SQ.preformance.mainScriptRunStart,window.onload=function(){SQ.preformance.f2e_wolt=new Date-SQ.preformance.startDate,delete SQ.preformance.startDate,$.get(config.f2eReport,SQ.preformance)}),function(){function a(){imglazyloadTh&&imglazyloadTh.refresh()}function b(a){var b=this,c=$.parseJSON($(a.target).parents(".pic").find("img").attr("data-detail")),d=config.imgPath;if(c){$("#theme-gallery"),$("<div class='temp'></div>");var e,f=c.screenshot.length,g=$(a.target).parents(".thumbnail").find(".sq-btn").find("a").attr("href"),h="",i="",j=g.slice(g.indexOf("f="),g.lastIndexOf("_1")+2),k=j.slice(0,j.lastIndexOf("_")+1)+"0",l=g.slice(g.indexOf("brandId="));l=l.slice(0,l.indexOf("&"));var m=g.replace(j,k),n=config.themeStatistics_API.replace("{f_param}",k).replace("{brand_id}",l),o=c.size.length>0?'<dl><dt>大小：</dt><dd class="size">'+c.size+"</dd></dl>":"",p=c.author.length>0?'<dl><dt>开发者：</dt><dd class="author">'+c.author+"</dd></dl>":"",q=c.update.length>0?'<dl><dt>更新时间：</dt><dd class="update">'+c.update+"</dd></dl>":"",r=c.version.length>0?'<dl><dt>版本：</dt><dd class="version">'+c.version+"</dd></dl>":"";for(e=0;f>e;e++)i+='<li class="touch-item"><img src="'+d+c.screenshot[e]+'" /></li>';h='<div class="theme-detail"><h2>'+c.title+"</h2>"+'<div class="sq-touch theme-gallery">'+"<ul>"+i+"</ul>"+"</div>"+'<div class="info">'+o+p+q+r+"</div>"+'<div class="sq-btn block m-grass-green ucweb-anchor"><a href="'+m+'"></a><i class="sq-icon download-w"></i>免费下载</div>'+"</div>",$.get(n),b.$dialogContent.append(h),setTimeout(function(){var a=$(".theme-gallery").find("ul"),b=a.find(".touch-item").length,c=127*b+5;a.width(c),SQ.TouchSlip({MODE:"px",DIRECTION:"x",DOM_TRIGGER_TARGET:".theme-gallery>ul",SHOW_SCROLL_BAR:!0})},500)}}function c(b){var c,d=this,e="string"==typeof b?$.parseJSON(b):b,f=parseInt(e.code,10),g=e.data.length,h="",i=config.imgPath;if(f===d.config.NUM_SUCCESS_CODE||f===d.config.NUM_NO_MORE_CODE){for(c=0;g>c;c++){var j=e.data[c],k="";parseInt(j.star,10)>0&&(k='<div class="rank"><i class="sq-icon star"></i><em>'+j.star+"</em></div>"),h+='<li><div class="thumbnail"><div class="pic J_showDetail"><a href="#;"><img class="J_lazyloadTh" src="'+SQ.thDefaultIcon+'" data-img="'+i+j.cover+"\" data-detail='"+JSON.stringify(j.detail)+'\'/></a><div class="caption"><h3 class="title">'+j.detail.title+'</h3></div></div><div class="extend">'+k+'<div class="sq-btn small f-grey ucweb-anchor"><a href="'+j.themeURL+'"></a>免费下载</div></div></div></li>'}d.$ajaxBox.append(h),d._changeState("loaded"),d._reset(),a(),f===d.config.NUM_NO_MORE_CODE&&d._changeState("noMore")}}function d(b){var c,d,e=this,f="string"==typeof b?$.parseJSON(b):b,g=parseInt(f.code,10),h=f.data.length,i="",j=config.imgPath;if(g===e.config.NUM_SUCCESS_CODE||g===e.config.NUM_NO_MORE_CODE){for(c=0;h>c;c++){var k="",l=f.data[c],m=l.themes.length;for(k+='<div class="hd">'+l.category+'</div><div class="sq-list col3 thumbnails theme-list"><ul>',d=0;m>d;d++){var n=l.themes[d],o="";parseInt(n.star,10)>0&&(o='<div class="rank"><i class="sq-icon star"></i><em>'+n.star+"</em></div>"),k+='<li><div class="thumbnail"><div class="pic J_showDetail"><a href="#;"><img class="J_lazyloadTh" src="'+SQ.thDefaultIcon+'" data-img="'+j+n.cover+"\" data-detail='"+JSON.stringify(n.detail)+'\'/></a><div class="caption"><h3 class="title">'+n.detail.title+'</h3></div></div><div class="extend">'+o+'<div class="sq-btn small f-grey ucweb-anchor"><a href="'+n.themeURL+'"></a>免费下载</div></div></div></li>'}k+="</ul></div>",i+=k}e.$ajaxBox.append(i),e._changeState("loaded"),e._reset(),a(),g===e.config.NUM_NO_MORE_CODE&&e._changeState("noMore")}}new SQ.Dialog({EVE_EVENT_TYPE:"click",DOM_TRIGGER_TARGET:".J_showDetail",TXT_CLOSE_VAL:"×",CSS_STYLE:"theme-dialog",CSS_MIN_HEIGHT:320,FULLSCREEN_OFFSET:["auto",10],ANIMATE:"bounceIn",LOCK:!0,MASK:!0,show:function(a){var c=this;b.call(c,a)}}),new SQ.LoadMore({EVE_EVENT_TYPE:"scroll",DOM_TRIGGER_TARGET:window,DOM_AJAX_BOX:".J_ajaxWrap",DOM_STATE_BOX:".J_themeListLoadMore",CSS_INIT_STYLE:"sq-loadMore-btn",NUM_START_PAGE_INDEX:1,NUM_SCROLL_MAX_PAGE:3,DATA_TYPE:"json",render:function(a){c.call(this,a)},scrollEnd:function(){var b=this;b.$stateBox.addClass("sq-loadMore-clickState"),a()}}),new SQ.LoadMore({EVE_EVENT_TYPE:"scroll",DOM_TRIGGER_TARGET:window,DOM_AJAX_BOX:".J_ajaxWrapCategory",DOM_STATE_BOX:".J_themeListLoadMore",CSS_INIT_STYLE:"sq-loadMore-btn",NUM_START_PAGE_INDEX:1,NUM_SCROLL_MAX_PAGE:3,DATA_TYPE:"json",render:function(a){d.call(this,a)},scrollEnd:function(){var b=this;b.$stateBox.addClass("sq-loadMore-clickState"),a()}})}(),function(){function a(){var a=$(".J_toggleRender"),b='<div class="update-setting">我的导航应用更新提醒设置<div class="toggle-wrap active J_updateToggle J_toggleDialog"><span class="state">已开启</span><em class="toggle"><i class="cap"></i></em></div></div>';a.append(b);var c=$(".J_updateToggle"),d=c.find(".state");try{var e=ucweb.startRequest("shell.appUpdateNotice.myNavi",["getValue"]);"1"===e?(c.addClass("active"),d.text("已开启")):"0"===e&&(c.removeClass("active"),d.text("已关闭"))}catch(f){c.removeClass("active"),d.text("已关闭")}new SQ.Dialog({EVE_EVENT_TYPE:"me_click",DOM_TRIGGER_TARGET:".J_toggleDialog",TXT_CLOSE_VAL:"×",CSS_STYLE:"changeState",CSS_WIDTH:240,CSS_HEIGHT:120,MASK:!0,VERTICAL:"middle",HORIZONTAL:"center",LOCK:!0,show:function(){var a=this;a.$dialogContent.append("<p class='tip-text'>我的导航装机必备<br/>将不再提示可更新应用<br/>确定关闭？</p>")},ok:function(){try{ucweb.startRequest("shell.appUpdateNotice.myNavi",["setValue","false"]),c.removeClass("active"),d.text("已关闭"),o+=0,$.get(o)}catch(a){}}}),c.on("click",function(){var a=$(this);if(a.hasClass("active"))$(".J_toggleDialog").trigger("me_click");else try{ucweb.startRequest("shell.appUpdateNotice.myNavi",["setValue","true"]),a.addClass("active"),d.text("已开启"),o+=1,$.get(o)}catch(b){}})}function b(){var a=u>99?"99+":u,b=v>99?"99+":v;r.text(a),s.text(b),r.attr("data-update",u),s.attr("data-ignore",v)}function c(){if(u>0){var a=u>99?"99+":u;t.text(a).show()}else t.hide();SQ.store.cookie.set("updateNum",u,"day","/")}function d(){var a=$(".J_ignoreBtn");a.on("click",function(){function a(a){var e=a,f=parseInt(e.RESULT,10);100===f&&("1"===g?(u-=1,v+=1,d.parents("li").remove(),b(),c(),0===u&&q.html(x)):"0"===g&&(u+=1,v-=1,d.parents("li").remove(),b(),c(),0===v&&q.html(y)))}var d=$(this),e=d.attr("data-idx"),f=d.attr("data-name"),g=d.attr("data-state"),i=h.ignore_API;if(!d.hasClass("connectting")&&k&&l)if(d.addClass("connectting"),SQ.DEV){var j={RESULT:100};a(j)}else $.ajax({type:"POST",url:i,dataType:"json",data:{idx:e,packagename:f,state:g,imei:l,sn:k},timeout:SQ.XHRTime,success:function(b){a(b)},error:function(){d.removeClass("connectting")}})})}function e(){imglazyload&&imglazyload.refresh()}function f(a){var f=a,g=f.code;if(100!==g)return q.html(x),void 0;var h=f.data.apps,i=h.length,j="",m="",n=!1,o=0;if(u=i,v=f.context.ignore||0,0===i)return q.html(x),b(),void 0;for(l&&k&&(n=!0),o=0;i>o;o++){var r=h[o];n&&(m='<div class="sq-btn f-grey ucweb-anchor block small"><a href="#btn" class="J_ignoreBtn" data-idx="'+h[o].idx+'" data-name="'+h[o].packageName+'" data-state="1"></a>忽略</div>'),j+='<li><div class="icon"><i class="'+r.mark+'"><img class="J_lazyload" src="'+SQ.defaultIcon+'" data-img="'+r.icon+'"/></i></div>'+'<dl class="description">'+'<dt class="row">'+r.title+"</dt>"+'<dd class="row">'+r.versionold+"更新到"+r.versionname+"</dd>"+'<dd class="row">大小 '+r.size+"</dd>"+"</dl>"+'<div class="extend">'+'<div class="sq-btn f-green ucweb-anchor block small"><a href="'+r.packageURL+w+'"></a>更新</div>'+m+"</div>"+'<a href="'+r.detailsURL+w+'" class="trigger-area"></a>'+"</li>"}q.empty(),p.empty().append(j),e(),b(),c(),d()}var g,h=config,i=config.failBack,j=parseFloat(h.ucweb),k=h.sn||SQ.store.cookie.get("sn"),l=h.ei||SQ.store.cookie.get("imei"),m=h.updateListRender_API,n=h.updateReport_API,o=h.toggleStat_API,p=$(".J_ajaxWrap"),q=$(".J_UpdateTip"),r=$(".J_updateNum"),s=$(".J_ignoreNum"),t=$(".update").find(".num"),u=parseInt(SQ.store.cookie.get("updateNum"),10)||parseInt(r.attr("data-update"),10),v=parseInt(s.attr("data-ignore"),10),w="&app="+h.app,x='<div class="update-tips"><p class="light-orange">^_^ 您的手机上暂时没有可更新的应用哦!<br/>看看最近大家都在更新哪些热门应用吧!</p></div>',y='<div class="update-tips"><p class="light-orange">已经没有可取消的应用</p></div>',z='<div class="update-tips"><p>正在获取升级应用列表...</p></div>';if(j>=9&&a(),!i)return d(),void 0;try{q.html(z),g=ucweb.startRequest("shell.appsInfo.all")}catch(A){q.html(x)}if(SQ.DEV&&(g="dev_test"),g){var B={uid:l,sn:k,version:"1.0",itemcount:0,items:g};$.ajax({type:"POST",url:m,dataType:"json",data:B,timeout:SQ.XHRTime,success:function(a){f(a)},error:function(){q.html(x),$.get(n,{imei:l,sn:k})}})}}();