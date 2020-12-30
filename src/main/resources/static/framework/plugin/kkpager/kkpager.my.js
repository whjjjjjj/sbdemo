;
(function ($, window) {
    var Kkpager = function (ele, opt) {
        this.$this = $(ele);
        this.setting = $.extend({}, Kkpager.DEFAULT, opt, Kkpager.DEFAULT_FUNCTION);
        var setting = this.setting;

        //click事件定义
        if (this.setting.mode == 'load') {
            this.setting.click = function (n) {
                setting.data.pageNumber = n;
                $(this.pageBox).load(setting.url, setting.data, setting.afterLoad);
            };
        } else if (this.setting.mode == 'link') {
            this.setting.click = function (n) {
                window.location.href = this.setting.getLink(n);
            };
        }

        //number数字转换
        var _default = Kkpager.DEFAULT;
        for (var i in _default) {
            if (typeof _default[i] == 'number' && typeof this.setting[i] != 'number') {
                this.setting[i] = parseInt(this.setting[i]);
                if (isNaN(this.setting[i])) this.setting[i] = _default[i];
            }
        }

        //参数计算
        this.setting.total = this.setting.total <= 1 ? 1 : this.setting.total;
        this.setting.pno = this.setting.pno <= 1 ? 1 : this.setting.pno;
        this.setting.pno = this.setting.pno > this.setting.total ? this.setting.total : this.setting.pno;
        this.setting.prv = this.setting.pno <= 2 ? 1 : this.setting.pno - 1;
        this.setting.next = this.setting.pno >= this.setting.total ? this.setting.total : this.setting.pno + 1;
        this.setting.hasPrv = this.setting.pno != 1;
        this.setting.hasNext = this.setting.pno != this.setting.total;
    };

    Kkpager.DEFAULT = {
        mode: 'link', //模式(link 或者 click 或者 load)
        pno: 1, //当前页码
        total: 1, //总页码
        totalRecords: 0, //总数据条数
        isShowFirstPageBtn: true, //是否显示首页按钮
        isShowLastPageBtn: true, //是否显示尾页按钮
        isShowPrePageBtn: true, //是否显示上一页按钮
        isShowNextPageBtn: true, //是否显示下一页按钮
        isShowTotalPage: true, //是否显示总页数
        isShowCurrPage: true,//是否显示当前页
        isShowTotalRecords: false, //是否显示总记录数
        showPageCount: 7, //显示页面数量
        isGoPage: true,	//是否显示页码跳转输入框
        isWrapedPageBtns: true,	//是否用span包裹住页码按钮
        isWrapedInfoTextAndGoPageBtn: true, //是否用span包裹住分页信息和跳转按钮
        hrefFormer: '', //链接前部
        hrefLatter: '', //链接尾部
        gopageWrapId: 'kkpager_gopage_wrap',
        gopageButtonId: 'kkpager_btn_go',
        gopageTextboxId: 'kkpager_btn_go_input',
        lang: {
            firstPageText: '首页',
            firstPageTipText: '首页',
            lastPageText: '尾页',
            lastPageTipText: '尾页',
            prePageText: '上一页',
            prePageTipText: '上一页',
            nextPageText: '下一页',
            nextPageTipText: '下一页',
            totalPageBeforeText: '共',
            totalPageAfterText: '页',
            currPageBeforeText: '当前第',
            currPageAfterText: '页',
            totalInfoSplitStr: '/',
            totalRecordsBeforeText: '共',
            totalRecordsAfterText: '条数据',
            gopageBeforeText: '&nbsp;转到',
            gopageButtonOkText: '确定',
            gopageAfterText: '页',
            buttonTipBeforeText: '第',
            buttonTipAfterText: '页'
        }
        , click: function (n) {
            $(this.$this).prev().load(this.setting.url, {pageNumber: n});
        }
        , getLink: function (n) {
            return "javascript:void(0)";
        }
        , pageBox: ''
        , url: ''
        , data: {}
        , afterLoad: function () {
            return;
        }
    };

    //默认方法，防止被覆盖
    Kkpager.DEFAULT_FUNCTION = {
        gopage_focus: function () {
            var $input = $(this), $btn = $input.prev();
            $input.attr('hideFocus', true).addClass('focus');
            $btn.css('left', '10px').show().animate({left: '+=30'}, 50);
        },
        gopage_blur: function () {
            var $input = $(this), $btn = $input.prev();
            setTimeout(function () {
                $btn.animate({left: '-=25'}, 100, function () {
                    $btn.hide();
                    $input.removeClass('focus');
                });
            }, 400);
        },
        gopage_keypress: function (event) {
            event = event || window.event;
            var $input = $(this), $btn = $input.prev();
            var code = event.keyCode || event.charCode;
            if (code == 8) return true;
            if (event.ctrlKey && (code == 99 || code == 118)) return false;
            if (code < 48 || code > 57)return false;
            if (code == 13) {
                $btn.click();
                return false;
            }
            return true;
        }
    };

    //定义kkpager的方法
    Kkpager.prototype = {
        generPageHtml: function () {
            var setting = this.setting;
            var $a = $('<a href="javascript:void(0)"></a>'), $span = $('<span class="disabled"></span>');
            var $continer = $('<div></div>');
            var $continer_page = $('<span class="pageBtnWrap"></span>');
            //首页
            if (setting.isShowFirstPageBtn) {
                if (setting.hasPrv) {
                    $continer_page.append($a.clone().attr('title', setting.lang.firstPageTipText || setting.firstPageText).html(setting.lang.firstPageText).attr('page', '1'));
                } else {
                    $continer_page.append($span.clone().html(setting.lang.firstPageText));
                }
            }
            //上一页
            if (setting.isShowPrePageBtn) {
                if (setting.hasPrv) {
                    $continer_page.append($a.clone().attr('title', setting.lang.prePageTipText || setting.prePageText).html(setting.lang.prePageText).attr('page', setting.prv));
                } else {
                    $continer_page.append($span.clone().html(setting.lang.prePageText));
                }
            }

            //分页
            var half_page = (setting.showPageCount - 1) / 2;
            var begin = setting.pno - half_page, end = setting.pno + half_page;
            begin = begin < 1 ? 1 : begin;
            end = end > setting.total ? setting.total : end;
            if (end - begin < setting.showPageCount - 1) {
                if (setting.pno - begin < half_page) {
                    end = begin + 2 * half_page > setting.total ? setting.total : begin + 2 * half_page;
                }

                if (end - setting.pno < half_page) {
                    begin = end - 2 * half_page < 1 ? 1 : end - 2 * half_page;
                }
            }

            for (var i = begin; i < setting.pno; i++) {
                $continer_page.append($a.clone().html(i).attr('page', i));
            }
            $continer_page.append('<span class="curr">' + i + '</span>');
            for (var i = setting.pno + 1; i <= end; i++) {
                $continer_page.append($a.clone().html(i).attr('page', i));
            }
            $continer_page.appendTo($continer);

            //下一页
            if (setting.isShowNextPageBtn) {
                if (setting.hasNext) {
                    $continer_page.append($a.clone().attr('title', setting.lang.nextPageTipText || setting.lang.nextPageText).html(setting.lang.nextPageText).attr('page', setting.next));
                } else {
                    $continer_page.append($span.clone().html(setting.lang.nextPageText));
                }
            }
            //尾页
            if (setting.isShowLastPageBtn) {
                if (setting.hasNext) {
                    $continer_page.append($a.clone().attr('title', setting.lang.lastPageTipText || setting.lang.lastPageText).html(setting.lang.lastPageText).attr('page', setting.total));
                } else {
                    $continer_page.append($span.clone().html(setting.lang.lastPageText));
                }
            }

            //绑定跳转页面事件
            if (setting.mode == "link") {
                $continer_page.find('a').each(function () {
                    var $this = $(this);
                    $this.attr('href', setting.getLink($this.attr('page')));
                });
            } else {
                $continer_page.find('a').on('click', function () {
                    setting.click($(this).attr('page'));
                });
            }

            //文字说明
            var $continer_text = $('<span class="totalText"></span>'), $spliter = $('<span class="totalInfoSplitStr"></span>').html(setting.lang.totalInfoSplitStr);
            //文字内容：当前页数、总页数、总条数
            var text_curr_page = setting.lang.currPageBeforeText + '<span class="currPageNum">' + setting.pno + '</span>' + setting.lang.currPageAfterText;
            var text_total_page = setting.lang.totalPageBeforeText + '<span class="totalPageNum">' + setting.total + '</span>' + setting.lang.totalPageAfterText;
            var text_total_record = setting.lang.totalRecordsBeforeText + '<span class="totalRecordNum">' + setting.totalRecords + '</span>' + setting.lang.totalRecordsAfterText;
            if (setting.isShowCurrPage) {
                $continer_text.append(text_curr_page).append($spliter.clone());
            }
            if (setting.isShowTotalPage) {
                $continer_text.append(text_total_page).append($spliter.clone());
            }
            if (setting.isShowTotalRecords) {
                $continer_text.append(text_total_record).append($spliter.clone());
            }
            $continer_text.append('<span>每页' + setting.pageSize + '条</span>');

            var $continer_wrap = $('<span class="infoTextAndGoPageBtnWrap"></span>').append($continer_text);

            //跳转页面
            if (setting.isGoPage) {
                var $continer_goto = $('<span class="goPageBox"></span>');
                var $span_go = $('<span></span>').attr('id', setting.gopageWrapId);
                $('<input type="button">').attr('id', setting.gopageButtonId).val(setting.lang.gopageButtonOkText)
                    .on('click', function () {
                        setting.click($(this).next().val());
                    }).appendTo($span_go);
                $('<input type="text">').attr('id', setting.gopageTextboxId).val(setting.next)
                    .on('focus', setting.gopage_focus).on('blur', setting.gopage_blur).on('keypress', setting.gopage_keypress).appendTo($span_go);
                $continer_goto.append(setting.lang.gopageBeforeText).append($span_go).append(setting.lang.gopageAfterText)
                    .appendTo($continer_wrap);
            }

            return $continer.append($continer_wrap);
        }
        , reload: function (isCurrent) {    //页面刷新，默认刷新当前页
            isCurrent = isCurrent == null || isCurrent;
            var page = isCurrent ? this.setting.pno : 1;
            this.setting.click(page);
        }
        , selectPage: function (n) {        //加载第n页
            if (typeof n == "string")n = parseInt(n);
            n = isNaN(n) || n < 1 ? n = 1 : n;
            n = n > this.setting.totalPages ? this.setting.totalPages : n;
            this.setting.click(n);
        }
    };

    $.fn.kkpager = function (option, _target) {
        var $this = $(this), data = $this.data('kkpager');
        if (typeof option == "object") {
            $this.data('kkpager', (data = new Kkpager(this, option)));
            return $this.addClass('kkpager').html('').append(data.generPageHtml()).append('<div style="clear:both;"></div>');
        } else {
            data[option](_target);
            return this;
        }
    }

})(jQuery, window);
