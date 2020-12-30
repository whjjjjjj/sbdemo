/**
 * 停止冒泡
 * @param e
 */
function stopPropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

/**
 * 翻页初始化
 * @param dom
 * @param list {any}
 * @param url {string||function}
 * @param fnOrMakeInitLoad {function?||boolean?}
 * @param makeInitLoad {boolean?}
 */
function kkpageInit(dom, list, url, fnOrMakeInitLoad, makeInitLoad) {
    var self = {
        $dom: $(dom),
        $list: $(list),
        pageNumber: 1,
        totalPage: 0,
        pageSize: 20,
        row: 0,
        fn: null,
        updateVariables: function () {
            self.pageNumber = parseInt(self.$list.find('input[name$=page-number]').val())
            self.totalPage = parseInt(self.$list.find('input[name$=page-total]').val())
            self.pageSize = parseInt(self.$list.find('input[name$=page-size]').val())
            self.row = parseInt(self.$list.find('input[name$=page-row]').val())
            if (isNaN(self.totalPage)) self.totalPage = 0
            if (isNaN(self.pageNumber)) self.pageNumber = 1
            if (isNaN(self.row)) self.row = 0
            if (isNaN(self.pageSize)) self.pageSize = 20
        },
        _kkpager: function () {
            if (self.$dom.length == 0) {
                self.$dom = $(dom)
            }

            self.$dom.kkpager($.extend({
                pno: self.pageNumber,
                total: self.totalPage,
                totalRecords: self.row,
                pageSize: self.pageSize,
                isShowTotalRecords: true,
                mode: 'click',
                click: self.loadPage
            }, self.$dom.data()));
            var listData = self.$list.data('pageData');
            if (listData != null && listData.length > 0) {
                self.pageNumber = listData.pageNumber;
                if (pageNumber != null) {
                    self.$dom.kkpager('selectPage', pageNumber);
                }
            }
        },
        loadPage: function (page) {
            page = page > self.totalPage && self.totalPage != 0 ? self.totalPage : page;
            page = page < 1 ? 1 : page;

            var data = self.$list.data('pageData') || {};
            data.pageNumber = page;
            var _url = typeof url == 'function' ? url() : url;
            layer.load();
            self.$list.layerLoad().load(_url, data, function () {
                layer.closeAll();
                self.$list.closeLayerLoad();
                if (typeof self.fn == 'function') {
                    self.fn.apply(self.$list, [self]);
                }
                self.updateVariables();
                self._kkpager();

                self.$list.find('[data-toggle=tooltip]').tooltip();
            });
        },
        refresh: function () {
            self.loadPage(self.pageNumber)
        }
    };

    if (typeof fnOrMakeInitLoad == "function") {
        self.fn = fnOrMakeInitLoad
    } else if (typeof fnOrMakeInitLoad == "boolean") {
        makeInitLoad = fnOrMakeInitLoad
    }

    var $content = $('#content');
    var listData = $content.data('listData') || {};
    var id = self.$list.attr('id'), pageData = listData[id];
    pageData = pageData || {};

    if (pageData || self.$list.find('input[name$=page-number]').length == 0) {
        pageData = $.extend({}, self.$list.data('initData') || {}, self.$list.data('pageData') || {}, pageData);
        self.$list.data('pageData', pageData);
        makeInitLoad = true;
    }

    if (makeInitLoad) {
        var pageNumber = pageData.pageNumber || 1;
        self.$list.on('page.load', function () {
            self.loadPage(pageNumber);
            pageNumber = 1;
            pageData.pageNumber = 1;
        }).trigger('page.load');
    } else {
        self.updateVariables();
        self._kkpager();
    }

    return self
}

/**
 * 搜索框点击事件初始化
 * @param btn
 * @param search
 * @param list
 * @param page
 * @param dataName
 */
function searchInit(btn, search, list, page, dataName) {
    btn = btn || '#btn-search';
    search = search || '#search-frm';
    list = list || '#list';
    page = page || '#kkpage';
    dataName = dataName || 'pageData';
    var $btn = $(btn), $search = $(search), $list = $(list), $page = $(page);

    $search.on('page.search', function () {
        var data = $search.serializeData();
        data.pageNumber = 1;
        $list.data(dataName, data);
        if ($page.length == 0) {
            $list.trigger('page.load');
        } else {
            $page.kkpager('reload', false);
        }
    });

    $btn.on('click', function () {
        $search.trigger('page.search');
    });

    $search.find('select').on('change', function () {
        var $this = $(this).trigger('page.beforeChange');
        $search.trigger('page.search');
        $this.trigger('page.change');
    });

    $search.on('keypress', function (event) {
        if (event.keyCode == "13") {
            $search.trigger('page.search');
        }
    });

    var historyData = $('#content').data('historyData') || {};
    var keys = Object.keys(historyData);
    if (keys.length > 0) {
        Object.keys(historyData).forEach(function (key) {
            var $input = $search.find('[name=' + key + ']');
            $input.val(historyData[key]);
        });
        $list.data(dataName, historyData);
    } else {
        if ($search.length > 0) {
            $list.data(dataName, $search.serializeData());
        }
    }
}

/**
 * 列表初始化
 * @param dom
 * @param option
 */
function listInit(dom, option) {
    var $dom = $(dom);
    jQuery.each(option, function (key, val) {
        var fn = typeof val == 'function' ? val : null;

        if (typeof val == 'string') {
            //string类型表示详情的路由
            fn = function () {
                var isModal = $(this).data('type') == 'modal';
                var $par = $(this).closest('[data-id]'), id = $par.data('id');
                var len = val.length;
                //弹框类型
                if (isModal) {
                    myModal(val, id);
                } else {
                    val = (val[len - 1] == '=' || val[len - 1] == '/') ? val + id : val;
                    mainLoad(val);
                }
            }
        } else if (typeof val == 'object') {
            //对象类型表示详情的一些数据
            fn = function () {
                loadPage(val.url, val.data, val.callback);
            }
        }

        $dom.on('click', '[data-action=' + key + ']', fn);
    });
}

function boxInit(dom, option) {
    var $dom = $(dom);
    jQuery.each(option, function (key, val) {
        var fn = typeof val == 'function' ? val : null;

        if (typeof val == 'string') {
            //string类型表示详情的路由
            fn = function () {
                var isModal = $(this).data('type') == 'modal';
                var $par = $(this).closest('[data-id]'), id = $par.data('id');
                var len = val.length;
                //弹框类型
                if (isModal) {
                    myModal(val, id);
                } else {
                    val = (val[len - 1] == '=' || val[len - 1] == '/') ? val + id : val;
                    mainLoad(val);
                }
            }
        } else if (typeof val == 'object') {
            //对象类型表示详情的一些数据
            fn = function () {
                loadPage(val.url, val.data, val.callback);
            }
        }

        $dom.find('[data-action=' + key + ']').on('click', fn);
    });
}

/**
 * 滚动条初始化
 * @param dom
 * @param cutHeight
 */
function scrollInit(dom, cutHeight) {
    var $dom = $(dom);
    cutHeight = cutHeight || 0;
    var height = document.body.clientHeight - cutHeight;
    //$dom.parent().data('height', height).css('height', height + 'px');
    //$dom.slimScroll({height: '100%'});
}

/**
 * 加载列表后重设高度
 * @param dom
 * @param selector
 * @param addHeight
 */
function scrollReset(dom, selector, addHeight) {
    var $dom = $(dom), $div = $dom.find(selector);
    var $par = $dom.parent().parent();
    var scrollHeight = $div[0].scrollHeight + addHeight;
    var height = $par.data('height');
    height = scrollHeight < height ? scrollHeight : height;

    //$par.css('height', height + 'px');
    // console.log($dom);
    //$dom.css('height',height + 'px');
    //$dom.slimScroll({scrollTop: 0, height: '100%'});
}

/**
 * 表单中的时间插件初始化
 * @param dom
 */
function datetimepickerInit(dom) {
    var $box = $(dom);
    $box.find('input.datepicker-input').each(function () {
        var $input = $(this), format = $input.data('format') || '', showToday = parseInt($input.data('istoday') || 0);

        var monthIndex = format.indexOf('mm');
        var viewMode = monthIndex == format.length - 2 ? 1 : 0;
        var isToday = showToday == 1;

        $input.datepicker({
            minViewMode: viewMode,
            startView: viewMode,
            format: format,
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            todayHighlight: isToday
        });
    });
}

/**
 * 自动跳转至下一个输入框
 * @param dom
 * @param selector
 */
function autoSkipInput(dom, selector) {
    var $box = $(dom);
    $box.on('keydown', function (e) {
        var code = parseInt(e.keyCode);
        if (code != 13 && code != 9) {
            return true;
        }

        var $list = $box.find(selector);
        var nowIndex = -1, $now = $list.filter(function (index) {
            var $this = $(this);
            if ($this.is(':focus')) {
                nowIndex = index;
                return true;
            }
        });

        $now = $list.eq(nowIndex + 1);
        if ($now.is(':checkbox')) {
            $now = $list.eq(nowIndex + 2);
        }

        $box.trigger('afterFocus', [$now]);
        var val = $now.val();
        $now.val('').focus().val(val);
        return false;
    });
}

/**
 * 将对象转为query参数
 * @param map
 */
function mapToQuery(map) {
    return Object.keys(map)
        .map(function (key) {
            return key + "=" + (map[key] || '')
        })
        .join("&")
}
