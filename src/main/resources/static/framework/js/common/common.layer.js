/**
 * 成功提示
 * @param msg 提示信息
 * @param time 时间，默认为2000
 * @param url 跳转路由
 */
function layerSuccess(msg, url, time) {
    if (typeof url == 'function') {
        layerMsg(msg, 1, time, url)
    } else {
        layerMsg(msg, 1, time, function () {
            if (url || '' != '') {
                window.location.href = url;
            }
        });
    }
}

/**
 * 错误提示
 * @param msg
 * @param time
 * @param fun
 */
function layerFail(msg, time, fun) {
    if (typeof time == 'function') {
        fun = time;
        time = 2000;
    }
    layerMsg(msg, 2, time, fun);
}

/**
 * 提示信息
 */
function layerTip(msg, fun) {
    layerMsg(msg, null, 3000, fun);
}

/**
 * 弹框提示
 * @param msg
 * @param icon
 * @param time
 * @param fun
 */
function layerMsg(msg, icon, time, fun) {
    time = time || 2000;
    icon = icon || -1;
    layer.msg(msg, {
        icon: icon,
        time: time
    }, fun);
}

/**
 * 确认框
 * @param msg
 * @param successFun
 */
function confirmLayer(msg, successFun) {
    layer.confirm(msg, {
        btn: ['确认', '取消'] //按钮
    }, function (index) {
        layer.close(index);
        if (typeof successFun == 'function') {
            successFun();
        }
    }, function (index) {
        layer.close(index);
    });
}

/**
 * 需要输入一项内容的弹框
 * @param title
 * @param successFun
 */
function confirmPromptyLayer(title, successFun) {
    layer.prompt({title: title, formType: 0}, function (text, index) {
        layer.close(index);
        if (typeof successFun == 'function') {
            successFun(text);
        }
    });
}

function confirmTextAreaPromptLayer(title, successFun) {
    layer.prompt({title: title, formType: 2}, function (text, index) {
        layer.close(index);
        if (typeof successFun == 'function') {
            successFun(text);
        }
    });
}

/**
 * 自定义按钮
 * @param msg
 * @param btns
 */
function confirmLayerBtns(msg, btns) {
    var btnArray = [], funs = [];

    jQuery.each(btns, function (key, val) {
        btnArray.push(key);
        funs.push(val);
    });

    var option = {btn: btnArray};
    for (var i = 0; i < funs.length; i++) {
        var fn = funs[i];
        var key = i == 0 ? 'yes' : 'btn' + (i + 1);
        option[key] = fn;
    }

    layer.confirm(msg, option);
}

//加载框
(function ($) {
    $.fn.layerLoad = function (width, left) {
        var $this = $(this);
        var _height = ($this.height() - 34) / 2;
        var _width = ($this.width() - 150) / 2;
        var $shade = $('<div class="layui-layer-shade" times="2" style="z-index: 19891015;background-color: #000;position:absolute;opacity: 0.01;filter:alpha(opacity=1)"></div>')
            .appendTo($this);
        //var $loading = $('<div class="layui-layer layui-anim layui-layer-loading" type="loading" times="2" showtime="0" contype="string" style="z-index: 19891016;"></div>')
        //    .append('<div class="layui-layer-content layui-layer-loading0"></div><span class="layui-layer-setwin"></span>')
        //    .css('left', _width + 'px').css('top', _height + 'px')
        //    .appendTo($this);

        var $loading = $('<div class="spinner" style="z-index: 19891016;"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>')
            .css('left', _width + 'px').css('top', _height + 'px')
            .appendTo($this);

        if (width != null) {
            $shade.css('width', width + 'px');
        }

        if (left != null) {
            $shade.css('left', left + 'px');
            $loading.css('left', (left + _width) + 'px');
        }

        return $(this);
    };

    $.fn.closeLayerLoad = function () {
        var $this = $(this);
        $this.find('.layui-layer-shade:last').remove();
        //$this.find('.layui-layer:last').remove();
        $this.find('.spinner:last').remove();
        return $this;
    };

})(jQuery);