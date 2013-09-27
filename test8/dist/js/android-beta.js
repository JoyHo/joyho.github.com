/**
 * @file Android Beta core
 * @version 1.0.0
 */

/*global
 window: false,
 document: false,
 setTimeout : false,
 setInterval: false,
 clearInterval: false,
 config: false,
 Image : false,
 clearTimeout: false,
 location : false,
 ucweb : false,
 history: false,
 $: false,
 SQ: false,
 Zepto: false,
 continue: false
 */

//var SQ = SQ || {};
//SQ.DEV = false;
//SQ.lib = Zepto;
if (SQ.preformance) {
    SQ.preformance.mainScriptRunStart = new Date();
}
SQ.defaultIcon = "../asset/apkz/images/default.png";
SQ.spDefaultIcon = "../asset/apkz/images/sp-default.png";
SQ.thDefaultIcon = "../asset/apkz/images/th-default.png";
if (SQ.DEV) {
    SQ.defaultIcon = "dist/images/default.png";
    SQ.spDefaultIcon = "dist/images/sp-default.png";
    SQ.thDefaultIcon = "dist/images/th-default.png";
}
SQ.XHRTime = 5000;
SQ.util.simpleTip = {
    tipsClear : undefined,
    init : function () {
        var me = this;
        me.$simpleTip = $(".simpleTip");

        if (me.$simpleTip.length === 0) {
            me.$simpleTip = $("<div class='simpleTip'></div>");
            me.$simpleTip.appendTo("body");
        }
    },
    show : function (context) {
        var me = this;

        me.init();
        me.$simpleTip.html(context);

        var boxW = me.$simpleTip.width();
        var boxH = me.$simpleTip.height();
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;
        var scroll = SQ.dom.$el.$body.scrollTop();

        me.$simpleTip.css({
            left: (winWidth - 220) / 2,
            top: (winHeight - 36) / 2 + scroll
        });
        me.$simpleTip.show();
        me.autoClear();
    },
    autoClear : function () {
        var me = this;
        if (!me.tipsClear) {
            me.tipsClear = setTimeout(function () {
                me.$simpleTip.hide();
                me.tipsClear = undefined;
            }, 2000);
        }
    }
};

// -----------------------------------------------------------------
// 首页 index
// -----------------------------------------------------------------
(function randomPic() {
    var $pics = $(".J_randomPic").find("li");
    var $img = $("<img width='100%'>");
    var index = SQ.util.generate.randomInt(0, $pics.length - 1);
    var $currentPic = $pics.eq(index);
    $img.attr("src", $currentPic.attr("data-img"));
    $currentPic.append($img).show();
}());

(function tabsInt() {
    /*function lazyloadImgs($currentPanel) {
        if (!$currentPanel.hasClass("J_iconLazyLoad") && $currentPanel.hasClass("imgLoaded")) {
            return;
        }
        var $appIcon = $currentPanel.find("img");
        $appIcon.each(function () {
            var $me = $(this);
            var src = $me.attr("data-img");
            $me.on("error", function () {
                $(this).attr("src", SQ.defaultIcon);
            });
            if (src) {
                $me.attr("src", src);
            }
        });
        $currentPanel.addClass("imgLoaded");
    }*/
    var tabs = new SQ.Tabs({
        EVE_EVENT_TYPE : "click",
        DOM_TRIGGER_TARGET : ".J_tabs",
        DOM_TABS : ".tabs>li",
        DOM_PANELS : ".tab-panels",
        NUM_ACTIVE : 0,
        trigger : function ($tabs, $panels, tabIndex) {
            var $currentPanel = $panels.eq(tabIndex);
            if ($currentPanel.hasClass("J_iconLazyLoad") && !$currentPanel.hasClass("imgLoaded")) {
                var $appIcon = $currentPanel.find("img");
                $appIcon.addClass("J_lazyload");
                imglazyload.refresh();
                $currentPanel.addClass("imgLoaded");
            }
        }
    });
}());
// -----------------------------------------------------------------
// 首页 index End
// -----------------------------------------------------------------

/**
 * searchToggle
 * 搜索栏交互
 */
(function searchBar() {
    var $cancel = $(".cancel");
    var $submit = $(".submit-btn");

    function searchbarToggle(obj) {
        var $dplSearchBar = $(".J_dplSearchBar");
        var $fake = $dplSearchBar.find(".fake");
        var $real = $dplSearchBar.find(".real");
        var $realSearch = obj.$input;
        var $fakeSearch = $fake.find(".search-input");
        var $cancel = $dplSearchBar.find(".cancel");
        // 显示真实搜索框
        function showReal() {
            $fake.hide();
            $real.show();
            $realSearch.focus();
        }
        // 显示伪装搜索框
        function showFake() {
            $fake.show();
            $real.hide();
        }
        $fakeSearch.on("click", function () {
            showReal();
        });
        $cancel.on("click", function () {
            showFake();
            obj.clear();
        });
    }

    function renderSuggestPanel(me, ds) {
        SQ.TEMP = SQ.TEMP || {};
        var searchURI = config.search_URI + "&keyword=";
        var suggestList = "<ul>";
        var keywordList = "";
        var sign = ds.context.sign;
        var i, len;
        keywordList = ds.data;
        len = keywordList.length;

        if (len === 0) {
            return;
        }

        /*console.log(ds.code);
        if (SQ.TEMP.sign === sign || len === 0) {
            console.log(len === 0)
            return;
        }
        console.log(SQ.TEMP.sign, sign)
        SQ.TEMP.sign = sign;*/

        for (i = 0; i < len; i++) {
            var item = keywordList[i];
            if (item.appName) {
                suggestList += '<li class="sq-list vertical">'
                    + '<ul>'
                        + '<li>'
                        + '<div class="icon"><i><img src="' + item.icon + '"/></i></div>'
                            + '<dl class="description">'
                            + '<dt class="row">' + item.appName + '</dt>'
                            + '<dd class="row">版本:' + item.version + '<em>' + item.size + '</em></dd>'
                        + '</dl>'
                        + '<div class="extend v-middle ucweb-anchor"><div class="sq-btn f-grey small"><a href="' + item.packageURL + '"></a>下载</div></div>'
                        + '<a href="' + item.detailURL + '" class="trigger-area"></a>'
                        + '</li>'
                    + '</ul>'
                    + '</li>';
            } else {
                suggestList += '<li class="keyword"><a href="' + searchURI + item.keyword + '">' + item.keyword + '</a></li>';
            }
        }
        suggestList += "</ul>";
        me.$suggestPanel.append(suggestList).show();
    }

    var searchbar = new SQ.Suggest({
        DOM_INPUT : ".J_searchInput",
        DOM_CLEAR_BTN : ".J_clearInput",
        DOM_SUGGEST_PANEL : ".suggest-panel",
        API_URL : config.search_API,
        beforeStart : function () {
            var me = this;
            searchbarToggle(me);
        },
        start : function () {
            var me = this;
            $cancel.hide();
            $submit.show();
        },
        show : function (ds) {
            var me = this;
            renderSuggestPanel(me, ds);
        },
        clear : function () {
            $cancel.show();
            $submit.hide();
        }
    });
}());

if ($(".J_lazyload").length > 0) {
    var imglazyload = new SQ.LazyLoad({
        DOM_LAZY_ITEMS : ".J_lazyload",
        DOM_LAZY_PARENT : ".sq-list .icon",
        CSS_PLACEHOLDER : ".default-icon",
        IMG_PLACEHOLDER : SQ.defaultIcon,
        NUM_THRESHOLD : 250
    });
}
// 专题页面延迟加载
if ($(".J_lazyloadSp").length > 0) {
    var imglazyloadSp = new SQ.LazyLoad({
        DOM_LAZY_ITEMS : ".J_lazyloadSp",
        DOM_LAZY_PARENT : ".sq-list .icon",
        CSS_PLACEHOLDER : ".default-icon",
        IMG_PLACEHOLDER : SQ.spDefaultIcon,
        NUM_THRESHOLD : 250
    });
}
// 主题页面延迟加载
if ($(".J_lazyloadTh").length > 0) {
    var imglazyloadTh = new SQ.LazyLoad({
        DOM_LAZY_ITEMS : ".J_lazyloadTh",
        DOM_LAZY_PARENT : ".sq-list .icon",
        CSS_PLACEHOLDER : ".default-icon",
        IMG_PLACEHOLDER : SQ.thDefaultIcon,
        NUM_THRESHOLD : 250
    });
}

var appList = new SQ.LoadMore({
    EVE_EVENT_TYPE : "scroll",
    DOM_TRIGGER_TARGET : window,
    DOM_AJAX_BOX : ".J_ajaxWrap",
    DOM_STATE_BOX : ".J_scrollLoadMore",
    CSS_INIT_STYLE : "sq-loadMore-btn",
    NUM_START_PAGE_INDEX : 2,
    NUM_SCROLL_MAX_PAGE : 3,
    DATA_TYPE : "html",
    TXT_LOADING_TIP : "正在努力加载中，请稍后...",
    TXT_LOADED_ERROR : "加载失败，点击重新加载",
    loaded : function () {
        if (imglazyload) {
            imglazyload.refresh();
        }
        if (imglazyloadSp) {
            imglazyloadSp.refresh();
        }
        if (imglazyloadTh) {
            imglazyloadTh.refresh();
        }
    },
    scrollEnd : function () {
        var me = this;
        me.$stateBox.addClass("sq-loadMore-clickState");
        if (imglazyload) {
            imglazyload.refresh();
        }
        if (imglazyloadSp) {
            imglazyloadSp.refresh();
        }
        if (imglazyloadTh) {
            imglazyloadTh.refresh();
        }
    },
    loadError : function () {
        // 记录失败日志
        var api = config.xrhRequest_error.replace("{local}", "loadmore");
        $.ajax({
            type: "GET",
            url: api,
            timeout: SQ.XHRTime
        });
    }
});

function renderSpecial(e) {
    var me = this;
    var api = $(e.target).attr("data-api");

    if (!api) {
        return;
    }

    function loading() {
        var loadingHTML = '<div class="loading">正在努力加载中，请稍后...</div>';
        me.$dialogContent.empty().append(loadingHTML);
    }

    function reload() {
        // 记录失败日志
        var api = config.xrhRequest_error.replace("{local}", "dialog");
        $.ajax({
            type: "GET",
            url: api,
            timeout: SQ.XHRTime
        });
        me.$dialogContent.empty();
        var reloadHTML = '<div class="reload">'
            +       '<p>抱歉，加载失败，请重试</p>'
            +       '<div class="sq-btn f-grey J_reload">重新加载</div> '
            +   '</div>';
        me.$dialogContent.append(reloadHTML);
        $(".J_reload").on("click", function () {
            loading();
            loaded();
        });
    }

    function render(data) {
        me.$dialogContent.empty();
        var ds = typeof data === "string" ? $.parseJSON(data) : data;

        var specialPanel = '<div class="specialPanel">'
            +       '<h2>' + ds.data.specialName + '</h2>'
            +       '<div class="sq-touch sq-list vertical rock-app-list J_dialogSpecial">'
            +           '<ul>' + ds.data.appList + '</ul>'
            +       '</div>';
        me.$dialogContent.append(specialPanel);

        setTimeout(function () {
            var $wrap = $(".J_dialogSpecial");
            var $list = $wrap.find("ul");
            var len = $list.find("li").length;
            var wrapH = window.innerHeight - 40 - 36;
            var listH = len * 71;

            $wrap.height(wrapH);
            $list.height(listH);

            SQ.specialSlider = SQ.TouchSlip({
                MODE : "px",
                DOM_TRIGGER_TARGET : ".J_dialogSpecial ul",
                SHOW_SCROLL_BAR : true
            });
        }, 200);
    }

    function loaded() {
        var XHR = $.ajax({
            type: "POST",
            url: api,
            timeout: SQ.XHRTime,
            success: function (data) {
                if (data) {
                    render(data);
                } else {
                    reload();
                }
            },
            error: function () {
                reload();
            }
        });
    }

    // 初始化函数
    (function initialize() {
        loading();
        loaded();
    }());
}

/**
 * 对话框式专题列表展示交互
 */
var specialDialog = new SQ.Dialog({
    EVE_EVENT_TYPE : "click",
    DOM_TRIGGER_TARGET : ".J_showSpecial",
    TXT_CLOSE_VAL : "×",
    CSS_STYLE : "special-dialog",
    FULLSCREEN_OFFSET : [20, 10],
    ANIMATE : "bounceIn",
    MASK : true,
    LOCK : true,
    show : function (e) {
        renderSpecial.call(this, e);
    },
    resize : function () {
        if (SQ.specialSlider) {
            var $wrap = $(".rock-app-list");
            var wrapH = window.innerHeight - 40 - 36;
            $wrap.height(wrapH);
            SQ.specialSlider.refresh();
        }
    }
});

/**
 * 更新提醒，显示更新数，弹出气泡
 */
(function showUpdateTips() {
    var updateConfig = config;
    var UC_VERSION = parseFloat(updateConfig.ucweb);
    var UC_SN = updateConfig.sn || SQ.store.cookie.get("sn");
    var UC_EI = updateConfig.ei || SQ.store.cookie.get("imei");
    var api = updateConfig.update_API;
    var reportAPI = updateConfig.updateReport_API;

    if (!UC_VERSION || !UC_SN || !UC_EI || UC_VERSION < 8.4) {
        // 未获取必要的参数
        return;
    }

    var updateTipTime = parseInt(SQ.store.cookie.get("updateTipTime"), 10);
    var updateNum = parseInt(SQ.store.cookie.get("updateNum"), 10);
    var isWeekVisited = SQ.store.cookie.get("WeekVisited");
    var $updateNum = $(".update-reminder").find(".num");
    var $reminder = $(".reminder");
    var $reminderNum = $reminder.find("em");
    var localAppsInfo;

    // 如果找不到相应的 Dom，则退出流程
    if ($updateNum.length === 0 || $reminder.length === 0) {
        return;
    }

    if (!!updateTipTime) {
        // 获取到上次访问的时间记录。
        var now = new Date();
        var H = now.getHours();
        if (H === updateTipTime) {
            // 访问时间在整点范围内。
            if (!!updateNum && updateNum > 0) {
                // 获取到已存储的应用更新个数，显示数字徽章。
                var displayUpdateCount = updateNum > 99 ? "99+" : updateNum;
                $updateNum.text(displayUpdateCount).show();
            }
            return;
        }
    }

    try {
        localAppsInfo = ucweb.startRequest("shell.appsInfo.all");
    } catch (e) {

    }

    function updateUI(data) {
        var ds = data;
        var code = ds.RESULT;

        if (code !== 100) {
            return;
        }
        var now = new Date();
        var H = now.getHours();
        var updateCount = ds.items.upcount;

        if (updateCount > 0) {
            var displayUpdateCount = updateCount > 99 ? "99+" : updateCount;
            $updateNum.text(displayUpdateCount).show();

            if (isWeekVisited !== "isVisited") {
                $reminderNum.text(displayUpdateCount);
                $reminder.show();
                setTimeout(function () {
                    $reminder.hide();
                }, 2000);
                SQ.store.cookie.set("WeekVisited", "isVisited", "week", "/");
            }
        }
        SQ.store.cookie.set("updateTipTime", H, "day", "/");
        SQ.store.cookie.set("updateNum", updateCount, "day", "/");
    }

    if (localAppsInfo) {
        var content = { "uid": UC_EI, "sn": UC_SN, "version": "1.0", "itemcount": 0, "items": localAppsInfo };
        $.ajax({
            type: "POST",
            url: api,
            dataType: "json",
            data: content,
            timeout: SQ.XHRTime,
            success: function (data) {
                updateUI(data);
            },
            error: function () {
                $.get(reportAPI, {imei : UC_EI, sn : UC_SN});
            }
        });
    }

    if (SQ.DEV) {
        var data = {
            "RESULT": 100,
            "items" : {"upcount" : 7}
        };
        updateUI(data);
    }
}());

// -----------------------------------------------------------------
// 应用详情 detail
// -----------------------------------------------------------------
(function DetailPage() {
    var isDetailPage = $(".J_detail").length > 0 ? true : false;

    if (!isDetailPage) {
        return;
    }

    /**
     * screenshotSlider
     * 应用详情软件预览截图交互
     */
    (function screenshotSlider() {
        var $scroller = $("#scroller");

        if ($scroller.length === 0) {
            return;
        }

        var $li = $scroller.find("li");
        var len = $li.length;
        var imgW;
        var imgH;
        var $imgs = $scroller.find("img");
        var hasLoadImg = false;
        var imgTimer;

        $imgs.each(function () {
            var img = this;
            img.onload = function () {
                var me = this;
                imgW = me.width;
                imgH = me.height;
                hasLoadImg = true;
            };
        });

        imgTimer = setInterval(function () {
            // 修正图片已读取缓存时，无法触发 onload 事件，导致预览图失效的问题。
            var img = $imgs.get(0);
            if (img.width > 0) {
                imgW = img.width;
                imgH = img.height;
                hasLoadImg = true;
            }

            if (hasLoadImg) {
                var maxW;
                var W;
                if (imgW > imgH) {
                    maxW = 244;
                } else {
                    maxW = 164;
                    $li.addClass("portrait");
                }
                W = len * (maxW + 10) + 10;
                $scroller.width(W);
                var slider = SQ.TouchSlip({
                    MODE : "px",
                    DOM_TRIGGER_TARGET : "#scroller",
                    DIRECTION: "x",
                    SHOW_SCROLL_BAR: true
                });
                clearInterval(imgTimer);
            }
        }, 200);
    }());

    /**
     * contextFold
     * 应用简介折叠交互
     */
    (function contextFold() {
        var $fold = $(".J_folder");

        if ($fold.length === 0) {
            return;
        }

        function showContext($contextWrap, $btn) {
            $contextWrap.css({
                "max-height" : 10000
            });
            $btn.removeClass("rotateHalfReturn").addClass("rotateHalf");
        }

        function hideContext($contextWrap, $btn) {
            var originalH = parseInt($contextWrap.attr("data-original"), 10);
            $contextWrap.css({
                "max-height" : originalH
            });
            $btn.removeClass("rotateHalf").addClass("rotateHalfReturn");
        }

        $fold.each(function () {
            var $me = $(this);
            var $toggle = $me.find(".J_toggle");
            var $contextWrap = $me.find(".context");
            var $context = $me.find(".J_context");
            var $btn = $me.find(".fold-toggle");
            var contextWrapH = $contextWrap.height();
            var contextH = $context.height();

            if (contextWrapH < contextH) {
                $btn.show();
                $contextWrap.attr("data-original", contextWrapH);

                $toggle.on("click", function () {
                    contextWrapH = $contextWrap.height();
                    $btn.addClass("animated");
                    if (contextWrapH < contextH) {
                        showContext($contextWrap, $btn);
                    } else {
                        hideContext($contextWrap, $btn);
                    }
                });
            }
        });
    }());

    /**
     * rateDing
     * 应用评分
     */
    (function rateDing() {
        var $rate = $(".J_rate");
        var $btn = $(".J_rateBtn");
        var api = config.API_Ding;

        function getState() {
            var state = $rate.text();
            if (state === "暂无推荐") {
                return false;
            }
            return true;
        }

        function postSuccess(code) {
            $btn.removeClass("connectting");
            switch (code) {
            case "1":
                var isRated = getState();
                if (isRated) {
                    var $rateNum = $rate.find("em");
                    var rateNum = parseInt($rateNum.text(), 10) + 1;
                    $rateNum.text(rateNum);
                } else {
                    $rate.html('<i class="sq-icon good"></i>已有<em class="light-orange">1</em>人推荐');
                }
                SQ.util.simpleTip.show("推荐成功！");
                break;
            case "2":
                SQ.util.simpleTip.show("您已经推荐过了！");
                break;
            case "3":
                SQ.util.simpleTip.show("推荐失败！");
                break;
            }
        }

        function rateIt() {
            if ($btn.hasClass("connectting")) {
                return;
            }
            $btn.addClass("connectting");
            $.ajax({
                type: "POST",
                url: api,
                dataType: "json",
                timeout: SQ.XHRTime,
                success: function (data) {
                    var code = data.data.toString();
                    postSuccess(code);
                },
                error: function () {
                    SQ.util.simpleTip.show("抱歉！推荐失败，请重试！");
                    $btn.removeClass("connectting");
                }
            });
        }

        $btn.on("click", rateIt);
    }());

    (function report() {
        var api = config.API_Report;
        $(".J_report").on("click", function () {
            $.ajax({
                type: "GET",
                url: api,
                timeout: SQ.XHRTime,
                success: function (code) {
                    if (code === "200") {
                        SQ.util.simpleTip.show("已成功举报到12321！");
                    }
                    if (code === "301") {
                        SQ.util.simpleTip.show("您已经举报过了！");
                    }
                },
                error: function () {}
            });
        });
    }());
}());
// -----------------------------------------------------------------
// 应用详情 End
// -----------------------------------------------------------------




// -----------------------------------------------------------------
// 必备 End
// -----------------------------------------------------------------
(function navFolder() {
    var $navFolder = $(".J_navFolder");
    var hasQuickNav = $navFolder.length > 0 ? true : false;
    if (!hasQuickNav) {
        return;
    }
    var $navLists = $navFolder.find("li");
    var listLen = $navLists.length;
    var navH = $navLists.find("ul").height();
    var $showToggle = $(".J_navShowMore");
    var $hideToggle = $("<li class='J_hideMore no-tap-color'><span>收起<i class='sq-icon arrow turn'></span></li>");

    function hideMore() {
        $showToggle.show();
        $navLists.each(function (index) {
            if (index > 7) {
                $(this).hide();
            }
        });
        $navFolder.css({
            "max-height" : navH
        });
    }

    function showMore() {
        $showToggle.hide();
        $navLists.each(function (index) {
            if (index > 7) {
                $(this).show();
            }
        });
        $navFolder.css({
            "max-height" : 9999
        });
    }

    function setAnchorPos() {
        var i;
        var j;
        var posArr = [];
        var posLen = $showToggle.length ? listLen - 1 : listLen;
        var $anchorList = $navLists.find("a");
        var achorLen = $anchorList.length;

        for (j = 0; j < posLen; j++) {
            var index = j + 1;
            var $anchor = $("#t" + index);
            var posTop = $anchor.offset() ? $anchor.offset().top : 0;
            posArr.push(posTop);
        }

        for (i = 0; i < achorLen; i++) {
            $anchorList.eq(i).attr("data-pos", posArr[i]);
        }

        $anchorList.off("click").on("click", function (e) {
            e.preventDefault();
            var $me = $(this);
            var pos = $me.attr("data-pos");
            var necId = $me.attr("data-necid");
            var api = config.xrhRequest_error.replace("{local}", necId);
            $.get(api);
            window.scrollTo(0, pos);
        });
    }

    (function init() {
        if ($showToggle.length) {
            $navFolder.append($hideToggle);
            $hideToggle = $(".J_hideMore");

            $showToggle.on("click", function (e) {
                e.preventDefault();
                showMore();
                setAnchorPos();
            });
            $hideToggle.on("click", function (e) {
                e.preventDefault();
                hideMore();
                setAnchorPos();
            });
        }
        setAnchorPos();
    }());
}());


// -----------------------------------------------------------------
// 必备 End
// -----------------------------------------------------------------





// -----------------------------------------------------------------
// 许愿与反馈
// -----------------------------------------------------------------
(function feedBackPage() {
    var isFeedBack = $(".J_feedBack").length > 0 ? true : false;
    if (!isFeedBack) {
        return;
    }

    var api = config.API_feedback;
    var $sug = $(".sug");
    var $contact = $(".contact");
    var $tips = $(".verifyTips");
    var $type = $("input[name=feedback]");
    var result = "";
    var feedbackType;

    function autoClear(time) {
        var tipsClear = setTimeout(function () {
            $tips.text("");
            clearTimeout(tipsClear);
        }, time);
    }

    function submitFeedBack() {
        var sug = $sug.val().replace(/\s+/g, "");
        var contact = $contact.val().replace(/\s+/g, "");

        $type.each(function () {
            result += $(this).is(":checked");
        });

        if (result.indexOf("true") === -1) {
            $tips.text("您的反馈类型还未选择！");
            autoClear(1500);
            return;
        }

        $sug.on("focus", function () {
            autoClear(500);
        });

        if (sug.length === 0) {
            $tips.text("您的意见还未填写！");
            return;
        }

        $.ajax({
            type: "POST",
            url: api,
            dataType: "json",
            data: { sug: sug, contact: contact, feedbackType: feedbackType},
            timeout: SQ.XHRTime,
            success: function (data) {
                var code = parseInt(data.data, 10);

                switch (code) {
                case 1:
                    $sug.val("");
                    $contact.val("");
                    $tips.text("提交成功！");
                    break;
                case 2:
                    $tips.text("您说话太快了，请稍后再提交！");
                    break;
                }
            },
            error: function () {
                $tips.text("抱歉！提交失败，请重试。");
            }
        });
    }

    $(".J_submitFeedbackForm").on("click", function (e) {
        e.preventDefault();
        submitFeedBack();
    });

    $type.on("click", function () {
        var $me = $(this);
        var tip = $me.attr("data-tip");
        feedbackType = $me.attr("value");
        $sug.attr("placeholder", tip);
    });
}());
// -----------------------------------------------------------------
// 许愿与反馈 End
// -----------------------------------------------------------------

/**
 * 常用基础交互
 */
$(".J_goTop").on("click", function (e) {
    SQ.util.goTop(e);
});
$(".J_goBack").on("click", function (e) {
    SQ.util.goBack(e);
});

if (SQ.preformance) {
    // f2e_msrt: mainScriptRunStart
    SQ.preformance.f2e_msrt =  new Date() - SQ.preformance.mainScriptRunStart;
    delete SQ.preformance.mainScriptRunStart;
    window.onload = function () {
        // f2e_wolt: windowOnloadtime
        SQ.preformance.f2e_wolt = new Date() - SQ.preformance.startDate;
        delete SQ.preformance.startDate;
        //var api = config.f2eReport.replace("{param}", SQ.preformance);
        //console.log(SQ.preformance, JSON.stringify(SQ.preformance));
        $.get(config.f2eReport, SQ.preformance);
    };
}
/**
 * @file theme
 * @data 2013.6.18
 * @version 1.0.0
 */

/*global
 window: true,
 document: true,
 setTimeout : true,
 setInterval: true,
 clearInterval: true,
 config: true,
 Image : true,
 clearTimeout: true,
 location : true,
 ucweb : true,
 history: false,
 $: false,
 SQ: false,
 Zepto: false
 */

/**
 * 常用基础交互
 */
/*$(".J_goTop").on("click", function (e) {
    SQ.util.goTop(e);
});
$(".J_goBack").on("click", function (e) {
    SQ.util.goBack(e);
});*/
(function ThemePage() {
    // 设置延迟加载
    function setLazyLoad() {
        if (imglazyloadTh) {
            imglazyloadTh.refresh();
        }
    }

    function renderDetail(e) {
        var me = this;
        var data = $.parseJSON($(e.target).parents(".pic").find("img").attr("data-detail"));
        var imgPath = config.imgPath;

        if (!data) {
            return;
        }

        var $template = $("#theme-gallery");
        var $temp = $("<div class='temp'></div>");
        var imgLen = data.screenshot.length;
        var themeURL = $(e.target).parents(".thumbnail").find(".sq-btn").find("a").attr("href");
        var detail = "";
        var screenshots = "";
        var i;
        var f = themeURL.slice(themeURL.indexOf("f="), themeURL.lastIndexOf("_1") + 2);
        var newF = f.slice(0, f.lastIndexOf("_") + 1) + "0";
        var brand_id = themeURL.slice(themeURL.indexOf("brandId="));
        brand_id = brand_id.slice(0, brand_id.indexOf("&"));

        var detailThemeURL = themeURL.replace(f, newF);
        var themeStatistics_API = config.themeStatistics_API.replace("{f_param}", newF).replace("{brand_id}", brand_id);

        var size = data.size.length > 0 ? '<dl><dt>大小：</dt><dd class="size">' + data.size + '</dd></dl>' : '';
        var author = data.author.length > 0 ? '<dl><dt>开发者：</dt><dd class="author">' + data.author + '</dd></dl>' : '';
        var update = data.update.length > 0 ? '<dl><dt>更新时间：</dt><dd class="update">' + data.update + '</dd></dl>' : '';
        var version = data.version.length > 0 ? '<dl><dt>版本：</dt><dd class="version">' + data.version + '</dd></dl>' : '';

        for (i = 0; i < imgLen; i++) {
            screenshots += '<li class="touch-item"><img src="' + imgPath + data.screenshot[i] + '" /></li>';
        }

        detail = '<div class="theme-detail">'
            +       '<h2>' + data.title + '</h2>'
            +       '<div class="sq-touch theme-gallery">'
            +            '<ul>' + screenshots + '</ul>'
            +       '</div>'
            +       '<div class="info">'
            +            size
            +            author
            +            update
            +            version
            +       '</div>'
            +       '<div class="sq-btn block m-grass-green ucweb-anchor"><a href="' + detailThemeURL + '"></a><i class="sq-icon download-w"></i>免费下载</div>'
            +    '</div>';

        $.get(themeStatistics_API);

        me.$dialogContent.append(detail);

        // 图片画廊，横向滑动的图片
        setTimeout(function () {
            var $gallerys = $(".theme-gallery").find("ul");
            var len = $gallerys.find(".touch-item").length;
            var W = len * 127 + 5;
            $gallerys.width(W);

            var GallerySlider = SQ.TouchSlip({
                MODE : "px",
                DIRECTION : "x",
                DOM_TRIGGER_TARGET : ".theme-gallery>ul",
                SHOW_SCROLL_BAR : true
            });
        }, 500);
    }

    var dialog = new SQ.Dialog({
        EVE_EVENT_TYPE : "click",
        DOM_TRIGGER_TARGET : ".J_showDetail",
        TXT_CLOSE_VAL : "×",
        CSS_STYLE : "theme-dialog",
        CSS_MIN_HEIGHT : 320,
        FULLSCREEN_OFFSET : ["auto", 10],
        ANIMATE : "bounceIn",
        LOCK : true,
        MASK : true,
        show : function (e) {
            var me = this;
            renderDetail.call(me, e);
        }
    });

    function renderList(ds) {
        var me = this;
        var data = typeof ds === "string" ? $.parseJSON(ds) : ds;
        var code = parseInt(data.code, 10);
        var i;
        var len = data.data.length;
        var li = "";
        var imgPath = config.imgPath;

        if (code !== me.config.NUM_SUCCESS_CODE && code !== me.config.NUM_NO_MORE_CODE) {
            return;
        }

        for (i = 0; i < len; i++) {
            var item = data.data[i];
            var starSection = "";

            if (parseInt(item.star, 10) > 0) {
                starSection = '<div class="rank"><i class="sq-icon star"></i><em>' + item.star + '</em></div>';
            }

            li += '<li><div class="thumbnail"><div class="pic J_showDetail"><a href="#;"><img class="J_lazyloadTh" src="' + SQ.thDefaultIcon + '" data-img="' + imgPath + item.cover + '" data-detail=\'' + JSON.stringify(item.detail) + '\'/></a><div class="caption"><h3 class="title">' + item.detail.title + '</h3></div></div><div class="extend">' + starSection + '<div class="sq-btn small f-grey ucweb-anchor"><a href="' + item.themeURL + '"></a>免费下载</div></div></div></li>';
        }
        me.$ajaxBox.append(li);
        me._changeState("loaded");
        me._reset();
        setLazyLoad();
        if (code === me.config.NUM_NO_MORE_CODE) {
            me._changeState("noMore");
        }
    }

    function renderCategoryList(ds) {
        var me = this;
        var data = typeof ds === "string" ? $.parseJSON(ds) : ds;
        var code = parseInt(data.code, 10);
        var i;
        var j;
        var cateLen = data.data.length;
        var categoryAllList = "";
        var imgPath = config.imgPath;

        if (code !== me.config.NUM_SUCCESS_CODE && code !== me.config.NUM_NO_MORE_CODE) {
            return;
        }

        for (i = 0; i < cateLen; i++) {
            var codeSection = "";
            var category = data.data[i];
            var themeLen = category.themes.length;

            codeSection += '<div class="hd">' + category.category + '</div><div class="sq-list col3 thumbnails theme-list"><ul>';

            for (j = 0; j < themeLen; j++) {
                var theme = category.themes[j];
                var starSection = "";

                if (parseInt(theme.star, 10) > 0) {
                    starSection = '<div class="rank"><i class="sq-icon star"></i><em>' + theme.star + '</em></div>';
                }
                codeSection += '<li><div class="thumbnail"><div class="pic J_showDetail"><a href="#;"><img class="J_lazyloadTh" src="' + SQ.thDefaultIcon + '" data-img="' + imgPath + theme.cover + '" data-detail=\'' + JSON.stringify(theme.detail) + '\'/></a><div class="caption"><h3 class="title">' + theme.detail.title + '</h3></div></div><div class="extend">' + starSection + '<div class="sq-btn small f-grey ucweb-anchor"><a href="' + theme.themeURL + '"></a>免费下载</div></div></div></li>';
            }

            codeSection += '</ul></div>';
            categoryAllList += codeSection;
        }
        me.$ajaxBox.append(categoryAllList);
        me._changeState("loaded");
        me._reset();
        setLazyLoad();
        if (code === me.config.NUM_NO_MORE_CODE) {
            me._changeState("noMore");
        }
    }

    var themeList = new SQ.LoadMore({
        EVE_EVENT_TYPE : "scroll",
        DOM_TRIGGER_TARGET : window,
        DOM_AJAX_BOX : ".J_ajaxWrap",
        DOM_STATE_BOX : ".J_themeListLoadMore",
        CSS_INIT_STYLE : "sq-loadMore-btn",
        NUM_START_PAGE_INDEX : 1,
        NUM_SCROLL_MAX_PAGE : 3,
        DATA_TYPE : "json",
        render : function (data) {
            renderList.call(this, data);
        },
        scrollEnd : function () {
            var me = this;
            me.$stateBox.addClass("sq-loadMore-clickState");
            setLazyLoad();
        }
    });

    var themeCategoryList = new SQ.LoadMore({
        EVE_EVENT_TYPE : "scroll",
        DOM_TRIGGER_TARGET : window,
        DOM_AJAX_BOX : ".J_ajaxWrapCategory",
        DOM_STATE_BOX : ".J_themeListLoadMore",
        CSS_INIT_STYLE : "sq-loadMore-btn",
        NUM_START_PAGE_INDEX : 1,
        NUM_SCROLL_MAX_PAGE : 3,
        DATA_TYPE : "json",
        render : function (data) {
            renderCategoryList.call(this, data);
        },
        scrollEnd : function () {
            var me = this;
            me.$stateBox.addClass("sq-loadMore-clickState");
            setLazyLoad();
        }
    });
}());

/**
 * @file update
 * @version 1.0.2
 */

/*global
 window: true,
 document: true,
 setTimeout : true,
 setInterval: true,
 clearInterval: true,
 config: true,
 Image : true,
 clearTimeout: true,
 location : true,
 ucweb : true,
 history: false,
 $: false,
 SQ: false,
 slip: false,
 Zepto: false
 */

/*var SQ = SQ || {};
SQ.lib = Zepto;
SQ.DEV = true;
SQ.XHRTime = 5000;*/

(function UpdatePage() {
    var updateConfig = config;
    var isFailBack = config.failBack;
    var UC_VERSION = parseFloat(updateConfig.ucweb);
    var UC_SN = updateConfig.sn || SQ.store.cookie.get("sn");
    var UC_EI = updateConfig.ei || SQ.store.cookie.get("imei");
    var api = updateConfig.updateListRender_API;
    var reportAPI = updateConfig.updateReport_API;
    var toggleStatApi = updateConfig.toggleStat_API;
    var $updateWrap = $(".J_ajaxWrap");
    var $updateTip = $(".J_UpdateTip");
    var $ui_updateNum = $(".J_updateNum");
    var $ui_ignoreNum = $(".J_ignoreNum");
    var $updateNum = $(".update").find(".num");
    var original_updateNum = parseInt(SQ.store.cookie.get("updateNum"), 10) || parseInt($ui_updateNum.attr("data-update"), 10);
    var original_ignoreNum = parseInt($ui_ignoreNum.attr("data-ignore"), 10);
    var localAppsInfo;
    var app = "&app=" + updateConfig.app;
    var TXT_NOUPDATE = '<div class="update-tips"><p class="light-orange">^_^ 您的手机上暂时没有可更新的应用哦!<br/>看看最近大家都在更新哪些热门应用吧!</p></div>';
    var TXT_NOCANCEL = '<div class="update-tips"><p class="light-orange">已经没有可取消的应用</p></div>';
    var TXT_UPDATEING = '<div class="update-tips"><p>正在获取升级应用列表...</p></div>';

    // 渲染更新提醒设置开关
    function renderUpdateToggle() {
        var $toggleWrap = $(".J_toggleRender");
        var toggleHTML = '<div class="update-setting">'
            +   '我的导航应用更新提醒设置'
            +   '<div class="toggle-wrap active J_updateToggle J_toggleDialog">'
            +       '<span class="state">已开启</span>'
            +       '<em class="toggle"><i class="cap"></i></em>'
            +   '</div>'
            + '</div>';
        $toggleWrap.append(toggleHTML);

        var $toggle = $(".J_updateToggle");
        var $state = $toggle.find(".state");

        //读取 Ucweb Javascript API，更新按钮状态
        try {
            var state = ucweb.startRequest("shell.appUpdateNotice.myNavi", ["getValue"]);
            if (state === "1") {
                $toggle.addClass("active");
                $state.text("已开启");
            } else if (state === "0") {
                $toggle.removeClass("active");
                $state.text("已关闭");
            }
        } catch (e) {
            $toggle.removeClass("active");
            $state.text("已关闭");
        }

        var ChangeStateDialog = new SQ.Dialog({
            EVE_EVENT_TYPE : "me_click",
            DOM_TRIGGER_TARGET : ".J_toggleDialog",
            TXT_CLOSE_VAL : "×",
            CSS_STYLE : "changeState",
            CSS_WIDTH : 240,
            CSS_HEIGHT : 120,
            MASK : true,
            VERTICAL : "middle",
            HORIZONTAL : "center",
            LOCK : true,
            show : function (e) {
                var me = this;
                me.$dialogContent.append("<p class='tip-text'>我的导航装机必备<br/>将不再提示可更新应用<br/>确定关闭？</p>");
            },
            ok : function (e) {
                var me = this;
                // 关闭更新提醒
                try {
                    ucweb.startRequest("shell.appUpdateNotice.myNavi", ["setValue", "false"]);
                    $toggle.removeClass("active");
                    $state.text("已关闭");
                    // 开关: (0表示关闭, 1表示开启)
                    toggleStatApi += 0;
                    $.get(toggleStatApi);
                } catch (err) {
                    //读取API错误
                }
            }
        });

        $toggle.on("click", function () {
            var $me = $(this);
            if ($me.hasClass("active")) {
                $(".J_toggleDialog").trigger("me_click");
            } else {
                // 开启更新提醒
                try {
                    ucweb.startRequest("shell.appUpdateNotice.myNavi", ["setValue", "true"]);
                    $me.addClass("active");
                    $state.text("已开启");
                    toggleStatApi += 1;
                    $.get(toggleStatApi);
                } catch (err) {

                }
            }
        });
    }
    // 更新子导航 UI
    function updateSubnavUI() {
        var displayUpdateCount = original_updateNum > 99 ? "99+" : original_updateNum;
        var displayIgnoreCount = original_ignoreNum > 99 ? "99+" : original_ignoreNum;

        $ui_updateNum.text(displayUpdateCount);
        $ui_ignoreNum.text(displayIgnoreCount);
        $ui_updateNum.attr("data-update", original_updateNum);
        $ui_ignoreNum.attr("data-ignore", original_ignoreNum);
    }
    // 更新徽章 UI
    function updateBadgeUI() {
        if (original_updateNum > 0) {
            var displayUpdateCount = original_updateNum > 99 ? "99+" : original_updateNum;
            $updateNum.text(displayUpdateCount).show();
        } else {
            $updateNum.hide();
        }
        SQ.store.cookie.set("updateNum", original_updateNum, "day", "/");
    }
    // 绑定忽略 & 取消按钮操作
    function bindIgnoreBtn() {
        var $ignoreBtn = $(".J_ignoreBtn");

        $ignoreBtn.on("click", function () {
            var $me = $(this);
            var idx = $me.attr("data-idx");
            var name = $me.attr("data-name");
            var state = $me.attr("data-state"); // 1 表示请求忽略, 0 表示请求取消
            var api = updateConfig.ignore_API;

            if ($me.hasClass("connectting") || !UC_SN || !UC_EI) {
                return;
            }

            $me.addClass("connectting");

            function ignoreApp(data) {
                var ds = data;
                var code = parseInt(ds.RESULT, 10);

                if (code !== 100) {
                    return;
                }

                // 更新相应数据
                if (state === "1") {
                    // 发起忽略请求
                    original_updateNum -= 1;
                    original_ignoreNum += 1;
                    $me.parents("li").remove();
                    updateSubnavUI();
                    updateBadgeUI();
                    if (original_updateNum === 0) {
                        $updateTip.html(TXT_NOUPDATE);
                    }
                } else if (state === "0") {
                    // 发起取消请求
                    original_updateNum += 1;
                    original_ignoreNum -= 1;
                    $me.parents("li").remove();
                    updateSubnavUI();
                    updateBadgeUI();
                    if (original_ignoreNum === 0) {
                        $updateTip.html(TXT_NOCANCEL);
                    }
                }
            }

            if (SQ.DEV) {
                var data = {
                    "RESULT" : 100
                };
                ignoreApp(data);
            } else {
                $.ajax({
                    type: "POST",
                    url: api,
                    dataType : "json",
                    data : {idx : idx, packagename : name, state : state, imei : UC_EI, sn : UC_SN},
                    timeout : SQ.XHRTime,
                    success : function (data) {
                        ignoreApp(data);
                    },
                    error : function () {
                        $me.removeClass("connectting");
                    }
                });
            }
        });
    }
    // 设置延迟加载
    function setLazyLoad() {
        if (imglazyload) {
            imglazyload.refresh();
        }
    }
    // 渲染更新列表
    function renderUpdateList(data) {
        var ds = data;
        var code = ds.code;

        if (code !== 100) {
            $updateTip.html(TXT_NOUPDATE);
            return;
        }

        var appListsData = ds.data.apps;
        var updateNum = appListsData.length;
        var appLists = "";
        var ignoreBtn = "";
        var hasIgnoreBtn = false;
        var i = 0;

        original_updateNum = updateNum;
        original_ignoreNum = ds.context.ignore || 0;

        if (updateNum === 0) {
            // 更新数为零
            $updateTip.html(TXT_NOUPDATE);
            updateSubnavUI();
            return;
        }

        if (!!UC_EI && !!UC_SN) {
            // 能够获取 EI、SN 参数，将显示忽略按钮。
            hasIgnoreBtn = true;
        }

        for (i = 0; i < updateNum; i++) {
            var item = appListsData[i];
            if (hasIgnoreBtn) {
                ignoreBtn = '<div class="sq-btn f-grey ucweb-anchor block small"><a href="#btn" class="J_ignoreBtn" data-idx="' + appListsData[i].idx + '" data-name="' + appListsData[i].packageName + '" data-state="1"></a>忽略</div>';
            }
            appLists += '<li>'
                +   '<div class="icon"><i class="' + item.mark + '"><img class="J_lazyload" src="' + SQ.defaultIcon + '" data-img="' + item.icon + '"/></i></div>'
                +   '<dl class="description">'
                +      '<dt class="row">' + item.title + '</dt>'
                +      '<dd class="row">' + item.versionold + '更新到' + item.versionname + '</dd>'
                +      '<dd class="row">大小 ' + item.size + '</dd>'
                +   '</dl>'
                +   '<div class="extend">'
                +       '<div class="sq-btn f-green ucweb-anchor block small"><a href="' + item.packageURL + app + '"></a>更新</div>'
                +       ignoreBtn
                +   '</div>'
                +   '<a href="' + item.detailsURL + app + '" class="trigger-area"></a>'
                + '</li>';
        }
        $updateTip.empty();
        $updateWrap.empty().append(appLists);
        setLazyLoad();
        updateSubnavUI();
        updateBadgeUI();
        bindIgnoreBtn();
    }

    if (UC_VERSION >= 9.0) {
        renderUpdateToggle();
    }

    if (!isFailBack) {
        bindIgnoreBtn();
        return;
    }

    try {
        $updateTip.html(TXT_UPDATEING);
        localAppsInfo = ucweb.startRequest("shell.appsInfo.all");
    } catch (e) {
        $updateTip.html(TXT_NOUPDATE);
    }

    if (SQ.DEV) {
        localAppsInfo = "dev_test";
    }

    if (localAppsInfo) {
        var content = { "uid": UC_EI, "sn": UC_SN, "version": "1.0", "itemcount": 0, "items": localAppsInfo};
        $.ajax({
            type: "POST",
            url: api,
            dataType: "json",
            data: content,
            timeout: SQ.XHRTime,
            success: function (data) {
                renderUpdateList(data);
            },
            error: function () {
                $updateTip.html(TXT_NOUPDATE);
                $.get(reportAPI, {imei : UC_EI, sn : UC_SN});
            }
        });
    }
}());