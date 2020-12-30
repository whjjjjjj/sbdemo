//@ sourceURL=cascader.select.js
;
(function ($, window) {
    $.fn.cascadeSelect = function (option) {
        return this.each(function () {
            var $el = $(this);
            var data = $el.data('CascadeSelect');
            var options = typeof option === 'object' && option;

            if (!data && option === 'destroy') return;
            if (data && typeof option === 'string') {
                data[option]();
                return;
            }
            if (!data) $el.data('CascadeSelect', (data = new CascadeSelect(this, options)));
        });
    };

    var CascadeSelect = function (ele, opt) {
        this.$element = $(ele);
        this.$span = null;
        this.settings = $.extend({}, CascadeSelect.DEFAULT, opt);
        this.visible = false;
        this.level = 1;
        this.valueStr = '';
        this.value = [];
        this.originalValue = '';
        this.result = [];
        this.data = [];
        this.init();
    };

    CascadeSelect.source = [
        {
            "name": "浙江省",
            "code": "zhejiang",
            "children": [
                {
                    "name": "杭州市",
                    "code": "hangzhou",
                    "children": [
                        {"name": "西湖区", "code": "xihu"},
                        {"name": "上城区", "code": "shangcheng"},
                        {"name": "下城区", "code": "xiacheng"},
                        {"name": "江干区", "code": "jianggan"},
                        {"name": "拱墅区", "code": "gongshu"},
                        {"name": "滨江区", "code": "binjiang"},
                        {"name": "萧山区", "code": "xiaoshan"},
                        {"name": "余杭区", "code": "yuhang"}
                    ]
                },
                {"name": "金华市", "code": "jinhua"},
                {"name": "宁波市", "code": "ningbo"},
                {"name": "衢州市", "code": "quzhou"},
                {"name": "永康市", "code": "yongkang"},
                {"name": "台州市", "code": "taizhou"},
                {
                    "name": "温州市",
                    "code": "wenzhou",
                    "children": [
                        {"name": "鹿城区", "code": "lucheng"},
                        {"name": "瓯海区", "code": "ouhai"},
                        {"name": "龙湾区", "code": "longwan"},
                        {"name": "瑞安", "code": "ruian"},
                        {"name": "苍南", "code": "cangnan"},
                        {"name": "平阳", "code": "pingyang"},
                        {"name": "永嘉", "code": "yongjia"}
                    ]
                }
            ]
        },
        {
            "name": "江苏省",
            "code": "jiangsu",
            "children": [
                {"name": "南京", "code": "nanjing"},
                {"name": "苏州", "code": "suzhou"},
                {"name": "无锡", "code": "wuxi"},
                {"name": "常州", "code": "changzhou"},
                {"name": "南通", "code": "nantong"},
                {"name": "泰州", "code": "taizhou"},
                {"name": "扬州", "code": "yangzhou"},
                {"name": "盐城", "code": "yancheng"},
                {"name": "镇江", "code": "zhenjiang"},
                {"name": "淮安", "code": "huaian"},
                {"name": "徐州", "code": "xuzhou"},
                {"name": "连云港", "code": "lianyungang"},
                {"name": "宿迁", "code": "suqian"}
            ]
        },
        {
            "name": "上海市",
            "code": "shanghai"
        }
    ];
    CascadeSelect.DEFAULT = {
        source: CascadeSelect.source,
        showField: 'name',
        valueField: 'code',
        showAllLevel: false,
        disableField: 'disabled',
        separator: '/',
        scrollElement: 'body',
        containerElement: 'body'
    };

    CascadeSelect.prototype = {
        init: function () {
            var that = this;

            that.shapeElement(function () {
                that.shapeSelect(function () {
                    that.$cascaderBox.on('click', '.cascader-menu-item:not(".disabled")', function (e) {
                        var $item = $(this),
                            data = $item.data('item'),
                            nextLevel = parseInt($item.data('level')) + 1,
                            $nextUL = $('[id=' + that.settings.name + '-level-' + nextLevel + ']');

                        $item.addClass('is-active').siblings().removeClass('is-active');
                        that.shapeValue($item, data); //计算当前的值


                        if ($nextUL.length && data[that.settings.valueField] === $nextUL.data('parent')) {
                            $nextUL.find('.is-active').removeClass('is-active');
                            $nextUL.next().remove();
                            that.level = nextLevel + 1;
                        } else {
                            if ($nextUL.length) {
                                $nextUL.next().remove().end().remove();
                                that.level = nextLevel;
                            }

                            if (data.children && data.children.length) {
                                that.$cascaderBox.append(that.shapeLevel(data.children, that.level, data[that.settings.valueField]));
                                that.level++;
                            } else {
                                that.level = nextLevel;
                                $nextUL.next().remove().end().remove();
                                that.shapeResult(function () {
                                    var nowValue = that.value, nowValLen = that.value.length;

                                    if (that.originalValue && that.originalValue === nowValue[nowValLen - 1][that.settings.valueField]) {
                                        return;
                                    }

                                    that.originalValue = nowValue[nowValLen - 1][that.settings.valueField];
                                    if (that.settings.change && typeof  that.settings.change === 'function') {
                                        that.settings.change(that.result, data);
                                    }
                                });
                                that.hide();
                            }
                        }
                        e.stopPropagation();
                    });
                    that.$cascaderBox.on('click', '.cascader-menu-item.disabled', function (e) {
                        e.stopPropagation();
                    });
                    that.$scrollContainer.on('scroll', function () {
                        that.$cascaderBox.css({
                            'top': that.$span.offset().top + that.$span[0].offsetHeight - $(that.$container).offset().top
                        });
                        if (parseInt(that.$cascaderBox.css('top')) <= that.$scrollContainer.offset().top || parseInt(that.$cascaderBox.css('top')) >= that.$scrollContainer.offset().top + that.$scrollContainer.height()) {
                            that.hide();
                        }
                    });
                    that.initSelect();
                });
                that.$span.on('click', function (e) {
                    if (that.$span.hasClass('disabled')) {
                        return;
                    }
                    that.$cascaderBox.slideToggle(300).siblings('.cascader-menus').slideUp(300);
                    if (that.$cascaderBox.is(':visible')) {
                        that.$cascaderBox.css({
                            'top': that.$span.offset().top + that.$span[0].offsetHeight - $(that.$container).offset().top,
                            'left': that.$span.offset().left - $(that.$container).offset().left,
                            'z-index': 1050
                        });
                    }
                    e.stopPropagation();
                });
            });

            $(document).on('click', function () {
                that.hide();
            });
        },
        shapeElement: function (callback) {
            this.$element.hide();
            this.$span = $('<span class="form-control cascade-input"></span>').appendTo(this.$element.parent());
            this.$container = this.$span.parents(this.settings.containerElement);
            this.$scrollContainer = this.$span.parents(this.settings.scrollElement);
            callback && typeof callback === 'function' && callback();
        },
        show: function () {
            this.$cascaderBox.slideDown(300);
        },
        hide: function () {
            this.$cascaderBox.slideUp(300);
        },
        destroy: function () {
            this.$cascaderBox.find('.cascader-menu-item').removeData().off('click').end().removeData().remove();
            this.$span.remove().off('click');
            this.$element.show().removeData('CascadeSelect');
        },
        shapeSelect: function (callback) {
            this.$cascaderBox = $('<div class="cascader-menus" style="display: none;"><div class="cascader-arrow"></div></div>');
            this.$cascaderBox.append(this.shapeLevel(this.settings.source, this.level)).appendTo(this.$container);
            this.level++;
            callback && typeof callback === 'function' && callback();
        },
        shapeLevel: function (list, level, data) {
            var $ul = $('<ul class="cascader-menu"></ul>').prop('id', this.settings.name + '-level-' + level);
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i], $li;
                if (item.children && item.children.length) {
                    $li = $('<li class="cascader-menu-item cascader-menu-item-extensible">')
                        .appendTo($ul)
                        .text(item[this.settings.showField])
                        .data('level', level)
                        .data('item', item);

                } else {
                    $li = $('<li class="cascader-menu-item"></li>')
                        .appendTo($ul)
                        .text(item[this.settings.showField])
                        .data('level', level)
                        .data('item', item);

                }

                if (item[this.settings.disableField]) {
                    $li.addClass('disabled');
                }
            }
            if (data) {
                $ul.data('parent', data);
            }
            this.data.push(list);

            return $ul;
        },
        shapeValue: function ($item, itemData) {
            var level = $item.data('level');
            var length = this.value.length;

            if (level === length + 1) {
                this.value.push(itemData);
            } else if (level === length) {
                this.value.splice(length - 1, 1, itemData);
            } else if (level < length) {
                this.value.splice(level - 1, (length - level + 1), itemData);
            }
        },
        shapeResult: function (callback) {
            this.result = [];
            this.valueStr = '';
            for (var i = 0, len = this.value.length; i < len; i++) {
                if (this.settings.showAllLevel) {
                    this.valueStr += this.value[i][this.settings.showField];
                } else {
                    this.valueStr = this.value[i][this.settings.showField];
                }

                if (this.settings.showAllLevel && (i < len - 1)) {
                    this.valueStr += ' ' + this.settings.separator + ' ';
                }
                this.result.push(this.value[i][this.settings.valueField]);
            }
            this.$element.val(this.valueStr);
            this.$span.text(this.valueStr);
            callback && typeof callback === 'function' && callback();
        },
        initSelect: function () {
            var eleVal = this.$element.data('value'), that = this, initValue = [], isMatch = false, initLevel = 0;

            if (eleVal instanceof Array) {
                if (!eleVal.length) return;
                that.triggerClick(eleVal, 0);
            }

            if (typeof eleVal === 'string') {
                ergodicSource(that.settings.source);
            }

            function ergodicSource(list) {
                for (var j = 0, len = list.length; j < len; j++) {
                    initValue.splice(initLevel, Number(initValue.length - initLevel), list[j][that.settings.valueField]);

                    if (!list[j].children && list[j][that.settings.valueField] === eleVal) {
                        isMatch = true;
                        that.triggerClick(initValue, 0);
                        break;
                    }

                    if (list[j].children) {
                        initLevel++;
                        ergodicSource(list[j].children);
                    }

                    if (j === len - 1) {
                        initLevel--;
                    }
                }
            }
        },
        triggerClick: function (item, index) {
            var that = this;

            $.each($('#' + that.settings.name + '-level-' + Number(index + 1) + ' .cascader-menu-item'), function (i, ele) {
                if ($(ele).data('item')[that.settings.valueField] === item[index]) {

                    if ($(ele).hasClass('disabled') && index !== item.length - 1) {
                        that.shapeValue($(ele), $(ele).data('item'));
                    } else if ($(ele).hasClass('disabled') && index === item.length - 1) {
                        that.shapeValue($(ele), $(ele).data('item'));
                        that.shapeResult();
                    } else {
                        $(ele).click();
                    }
                }
            });
            index++;
            if (index < item.length) {
                that.triggerClick(item, index);
            }
        }
    };

})(jQuery, window);
