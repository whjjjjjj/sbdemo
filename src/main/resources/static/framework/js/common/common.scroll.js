;
(function ($, window) {
    var ScrollPage = function (ele, opt) {
        this.$this = $(ele);
        this.options = $.extend({}, ScrollPage.DEFAULT_OPTION, opt, ScrollPage.DEFAULT_FUNCTION);
        this.options.loading = false;

        var options = this.options, $this = this.$this;
        if (options.data.length == 0) {
            options.data = $this.data('myScrollData') || {};
        }

        options.$list = (options.listSelector || '') == '' ? $this.find(options.listSelector) : $this;
    };

    //默认参数
    ScrollPage.DEFAULT_OPTION = {
        height: '100%',
        url: '',
        data: {},
        listSelector: '',
        isFlow: false,
        flowSelector: 'col-sm-4',
        pageNumber: 1,
        isLast: false,
        openLoading: function () {
            var $list = this.$list;
            if (typeof $list.layerLoad == 'function') {
                $list.layerLoad();
            }
        },
        closeLoading: function () {
            var $list = this.$list;
            if (typeof $list.closeLayerLoad == 'function') {
                $list.closeLayerLoad();
            }
        },
        //加载后回调函数
        afterLoaded: function () {
        }
    };

    //防止被覆盖的方法
    ScrollPage.DEFAULT_FUNCTION = {};

    //定义myscroll的方法
    ScrollPage.prototype = {
        scrollInit: function () {
            var options = this.options, $list = this.$this;
            options.isLast = false;
            $list.unbind('scroll').scroll(function () {
                //如果是最后一页，停止滚动翻页
                if (options.isLast) {
                    return;
                }

                var scrollHeight = parseFloat($list[0].scrollHeight), height = parseFloat($list.height());
                var scrollTop = parseFloat($list[0].scrollTop) + 1;
                var pageNumber = options.pageNumber + 1;
                //滚动到底部
                if (scrollTop + height >= scrollHeight && !options.loading) {
                    var data = options.data || {}, url = options.url;
                    data.pageNumber = pageNumber;

                    //加载中状态
                    options.openLoading($list);
                    options.loading = true;
                    $('<div></div>').load(url, data, function () {
                        options.loading = false;
                        var $this = $(this);
                        $list.find(':hidden[id*=page-]').remove();

                        //回调函数
                        options.afterLoaded.apply($this);

                        //关闭加载提示框
                        options.closeLoading($list);
                        options.pageNumber = pageNumber;
                        options.isLast = $this.children(':not(:hidden[id*=page-])').length == 0;
                        //追加元素
                        $this.children().appendTo($list);


                    });
                }
            });
        },
        //修改或获取请求参数
        data: function (option) {
            var options = this.options;
            if (typeof option == 'object') {
                $.extend(options.data, option);
            } else {
                return options.data;
            }
        },
        cancelScroll: function () {
            var $list = this.$this;
            $list.unbind('scroll');
        }
    };

    $.fn.scrollPage = function (option, _target) {
        var $this = $(this), data = $this.data('myScroll');
        if (typeof option == 'object') {
            $this.data('scrollPage', (data = new ScrollPage(this, option)));
            //下拉分页初始化
            data.scrollInit();
        } else if (_target == undefined || _target == null) {
            return data[option];
        } else {
            data[option](_target);
        }
        return this;
    };
})(jQuery, window);