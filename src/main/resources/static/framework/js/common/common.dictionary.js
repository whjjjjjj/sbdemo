/**
 * 数据字典批量初始化
 * @param dictionaryIds
 * @param url
 */
function multiDictionaryInit(url, dom) {
    //默认的一些配置参数名称
    var dictionaryPara = {
        name: 'name',
        code: 'code',
        father: 'father_code',
        level: 'level',
        result: 'result',
        dictionariesName: '_RULE_DICTIONARIES'
    };

    dictionaryPara.url = url;

    var $list = $(dom), dictionaryIds = [];
    $list.find('select[data-dictionary]').each(function () {
        var $this = $(this), dictionaryId = $this.data('dictionary');
        dictionaryIds.push(dictionaryId);
    });

    getMultiDictionary(dictionaryIds, dictionaryPara).then(function (data) {
        $list.find('select[data-dictionary]').each(function () {
            var $this = $(this), dictionaryId = $this.data('dictionary');
            setDic($list, $this.attr('name'), data[dictionaryId], $this.data('value'), dictionaryPara);
        });
    });
}

/**
 * 数据字典初始化
 */
function dictionaryInit(dom, url) {

    //默认的一些配置参数名称
    var dictionaryPara = {
        name: 'name',
        code: 'code',
        father: 'father_code',
        result: 'data',
        level: 'level',
        dictionariesName: '_RULE_DICTIONARIES'
    };

    dictionaryPara.url = url;

    var $list = $(dom);
    $list.find('select[data-dictionary]').each(function () {
        var $this = $(this), dictionaryId = $this.data('dictionary'), val = $this.data('value');
        getDictionary(dictionaryId, dictionaryPara).then(function (data) {
            setDic($list, $this.attr('name'), data, val, dictionaryPara);
        });
    });

}

/**
 * 获取数据字典
 * @param dictionaryId
 * @param para
 * @returns {*}
 */
function getDictionary(dictionaryId, para) {
    var dictionariesName = para.dictionariesName;
    if (window[dictionariesName] && window[dictionariesName][dictionaryId]) {
        var deferred = $.Deferred();
        deferred.resolve(window[dictionariesName][dictionaryId]);
        return deferred.promise()
    } else {
        return $.get(para.url + dictionaryId)
            .then(function (data) {
                var dictionaryDataList = data[para.result][dictionaryId];
                dictionaryDataList = dealDictionaryList(dictionaryDataList, para);

                window[dictionariesName] = window[dictionariesName] || {};
                window[dictionariesName][dictionaryId] = dictionaryDataList;
                return window[dictionariesName][dictionaryId];
            })
    }
}

/**
 * 批量获取数据字典
 * @param dictionaryIds
 * @param para
 * @returns {*}
 */
function getMultiDictionary(dictionaryIds, para) {
    var dictionariesName = para.dictionariesName;

    //遍历缓存列表，将已加载过的数字字典去除
    var i, dictionaryId, resultDictionaryIds = [];
    dictionaryIds = dictionaryIds instanceof Array ? dictionaryIds : [dictionaryIds];
    for (i = 0; i < dictionaryIds.length; i++) {
        dictionaryId = dictionaryIds[i];
        if (!window[dictionariesName] || !window[dictionariesName][dictionaryId]) {
            resultDictionaryIds.push(dictionaryId);
        }
    }

    var dictionaryMap, id, reuslt = {};
    if (resultDictionaryIds.length > 0) {
        return $.get(para.url + resultDictionaryIds.join).then(function (data) {
            dictionaryMap = data[para.result];
            for (id in datas) {
                var dictionaryList = datas[id];
                dictionaryList = dealDictionaryList(dictionaryList, para);
                window[dictionariesName][id] = dictionaryList;
            }

            //批量加载数据字典
            for (i in dictionaryIds) {
                id = dictionaryIds[i];
                result[id] = window[dictionariesName][id];
            }
            return result;
        });
    } else {
        //批量加载数据字典
        for (i in dictionaryIds) {
            id = dictionaryIds[i];
            result[id] = window[dictionariesName][id];
        }
        var deferred = $.Deferred();
        deferred.resolve(result);
        return deferred.promise();
    }
}

/**
 * 处理数据字典列表
 * @param dictionaryDataList
 * @param para
 * @returns {*}
 */
function dealDictionaryList(dictionaryDataList, para) {
    var dictionaryPara = {
        name: 'name',
        code: 'code',
        father: 'father_code',
        result: 'data',
        level: 'level',
        dictionariesName: '_RULE_DICTIONARIES'
    };
    para = para || dictionaryPara;

    dictionaryDataList.forEach(function (c) {
        if (dictionaryDataList.processed) return;
        var parent = dictionaryDataList.find(function (d) {
            return d[para.code] === c[para.father]
        });
        if (parent) {
            parent.children = parent.children || [];
            parent.children.push(c);
            c.parent = parent
        }
    });
    return dictionaryDataList;
}

/**
 * 从列表中查找对应的数据
 * @param dictionaryDataList
 * @param initValue
 * @param isLast
 * @param para
 * @returns {*}
 */
function findFromList(dictionaryDataList, initValue, isLast, para) {
    isLast = isLast == null || isLast == undefined ? true : isLast;
    return dictionaryDataList.find(function (c) {
        return c[para.name] === initValue && (isLast ? !c.children : true);
    });
}

/**
 * 根据数据字典级别获取数据结果
 * @param dictionaryDataList
 * @param level
 * @param minLevel
 * @param para
 */
function getDictionaryByLevel(dictionaryDataList, level, minLevel, para) {
    level = parseInt(level || 0);
    minLevel = parseInt(minLevel || 0);

    if (level <= 0 && minLevel <= 0) {
        return dictionaryDataList;
    }

    var resultMinLevel = level > 0 ? level : minLevel;
    var result = dictionaryDataList.filter(function (c) {
        return parseInt(c[para.level]) === resultMinLevel;
    });

    var myResult = [];
    var resultChildrenArray = [];
    result.forEach(function (c) {
        //取出parent与children，避免拷贝时出错
        var parent = c.parent, children = c.children;
        c.parent = null;
        c.children = null;

        //从多级字典中取出单级字典时，采用拷贝形式，避免影响原数据
        var temp = JSON.parse(JSON.stringify(c));
        if (level <= 0 && children) {
            resultChildrenArray = resultChildrenArray.concat(children);
            temp.children = children;
        }
        myResult.push(temp);

        c.parent = parent;
        c.children = children;
    });

    return myResult.concat(resultChildrenArray);
}

/**
 * 赋值
 * @param box
 * @param fieldId
 * @param dictionaryDataList
 * @param initValue
 * @param para
 */
function setDic(box, fieldId, dictionaryDataList, initValue, para) {
    //按code进行排序
    dictionaryDataList.sort(function (a, b) {
        var code1 = parseInt(a[para.code]), code2 = parseInt(b[para.code]);
        code1 = isNaN(code1) ? 0 : code1;
        code2 = isNaN(code2) ? 0 : code2;
        return code1 - code2;
    });

    if (Object.prototype.toString.call(initValue) !== '[object Array]') {
        if (initValue.indexOf(',') > 0) {
            initValue = initValue.split(',');
        } else {
            initValue = [initValue];
        }
    }

    //根据元素的level属性，获取实际显示的数据字典列表
    var $box = $(box || 'body'), $input = $box.find('select[name=' + fieldId + ']');
    var level = parseInt($input.data('level')), minLevel = parseInt($input.data('level-min'));
    var result = getDictionaryByLevel(dictionaryDataList, level, minLevel, para);

    //多级或单级数据字典查询
    var initData = null;
    var isLast = initValue.length == 1;
    for (var i = 0; i < initValue.length; i++) {
        initData = findFromList(initData == null ? dictionaryDataList : initData.children, initValue[i], isLast, para);
    }

    result.processed = true;

    //按层级进行拼接
    var _initValue = initValue;
    if (initData) {
        _initValue = [initData[para.name]];
        while (initData.parent) {
            initData = initData.parent;

            var nowLevel = parseInt(initData[para.level]);
            if (nowLevel >= minLevel) {
                _initValue.unshift(initData[para.name]);
            }
        }
    }

    var dataTree = result.filter(item => !item.parent);

    var displayAsSimplyDropdown = dataTree.every(item => !item.children);

    //元素初始化
    if (displayAsSimplyDropdown) {
        var newHtml = '';
        newHtml += dataTree.reduce(function (p, c) {
            var option, val = c[para.name];
            if (initData != null && val === initData[para.name])
                option = '<option selected value="' + val + '">' + val + '</option>';
            else
                option = '<option value="' + val + '">' + val + '</option>';
            return p + option
        }, "");
        $input.html($input.html() + newHtml);

        if (initValue[0] != '') {
            $input.val(initValue[0]);
        }
    } else {

        var name = $input.attr('name');
        $input.attr('name', '_' + name);
        var linkName = $input.data('link') || '', linkLevel = $input.data('link-level') || '0';
        var $realInput = $('<input type="text" name="' + name + '" class="form-control" />').insertAfter($input);
        $input.hide();

        var isShowAll = $input.data('showall') || '0';
        var showAllLevel = parseInt(isShowAll) == 1;
        $realInput.data('value', _initValue).addClass('cascader').cascadeSelect({
            name: fieldId,
            source: dataTree,
            showField: para.name,
            valueField: para.name,
            scrollElement: ".modal-body",
            showAllLevel: showAllLevel,
            change: function (val, data) {
                $input.data('value', val).data('dictionaryData', data);

                if (linkName != '') {
                    linkLevel = parseInt(linkLevel) - 1;
                    if (linkLevel < 0) {
                        return;
                    }

                    var $link = $box.find('select[name=' + linkName + ']');
                    if ($link.length == 0) {
                        return;
                    }

                    $link.val(val[linkLevel]);
                }

                $input.trigger('dictionaryChange');
            }
        });
    }
}

/**
 * 联动初始化
 */
function dictionaryLinkInit(dom, dictionaryDataList) {
    var maxLevel = 1, level;

    //获取最高等级的level
    var dictionaryMap = {};
    dictionaryDataList.forEach(function (data) {
        level = parseInt(data.level || 1);

        if (!data.children) {
            maxLevel = maxLevel > level ? maxLevel : level;
        }

        var list = dictionaryMap[level] || [];
        list.push(data);
        dictionaryMap[level] = list;
    });

    //获取第一级列表
    var topDictionaryList = dictionaryDataList.every(function (data) {
        return !data.parent;
    });

    var $dom = $(dom);

    //生成联动select
    var i, $box = $('<div class="form-inline"></div>');
    for (i = 1; i <= maxLevel; i++) {
        var $sel = $('<div class="form-group"><select class="form-control" data-level="' + i + '"></select></div>');
        $box.append($sel);
    }

    //数据初始化事件绑定
    $box.find('select').on('dataInit', function () {
        var $this = $(this), dataList = $this.data('dictionaryList') || [];
        $this.html('<option value="">全部</option>');

        if (dataList.length == 0) {
            return;
        }

        dataList.forEach(function (data) {
            var name = data.name || '';
            var $opt = $('<option value="' + name + '">' + name + '</option>');
            $opt.data('dictionary', data);
            $this.append($opt);
        });
    }).on('change', function () {
        var $this = $(this), $opt = $this.find('option:selected');
        if ($opt.length == 0) {
            return;
        }

        var data = $opt.data('dictionary') || {};
        var level = parseInt($this.data('level') || 1), nextLevel = level + 1;

        $box.find('select:gt(' + (level - 1) + ")").val('').attr('disabled', 'disabled');

        var $next = $box.find('select[data-level=' + nextLevel + ']').remove('disabled');
        if ($next.length == 0) {
            return;
        }

        $next.data('dictionaryList', data.children).trigger('dataInit');
    });

    //一级数据绑定
    var $topSelect = $box.find('select[data-level=1]').html('').data('dictionaryList', topDictionaryList);
    $topSelect.trigger('dataInit');

    //其他级别的数据，不允许选择
    $box.find('select:not(:first)').attr('disabled', 'disabled');
    $dom.append($box);
}

/**
 * 关联select数据字典初始化
 * @param dom
 * @param dictionaryId
 * @param dictionaryDataList
 */
function dictionaryLinkDataInit(dom, dictionaryId, dictionaryDataList) {
    var $dom = $(dom), $selList = $dom.find('select[data-id=' + dictionaryId + ']');
    if ($selList.length == 0) {
        return;
    }

    var isSingle = dictionaryDataList.every(function (d) {
        return !d.children;
    });

    if (isSingle) {
        var $sel = $dom.find('select:first').data('dictionaryList', dictionaryDataList).append('<option value="">全部</option>');
        dictionaryDataList.forEach(function (d) {
            $('<option></option>').attr('value', d.name).html(d.name).data('dictionary', d).appendTo($sel);
        });
        return;
    }

    //console.log('selectlist', $selList);

    var level, minLevel = parseInt($selList.eq(0).data('level'));
    //console.log(minLevel);

    var dictionaryMap = {};
    dictionaryDataList.forEach(function (d) {
        level = parseInt(d.level || 1);
        var list = dictionaryMap[level] || [];
        list.push(d);
        dictionaryMap[level] = list;
    });

    //console.log('level map', dictionaryMap);

    var topDictionaryList = dictionaryDataList.filter(function (d) {
        return parseInt(d.level) == minLevel;
    });

    //console.log('top list', topDictionaryList);

    //数据初始化，选择事件绑定
    $selList.on('dataInit', function () {
        var $this = $(this), dataList = $this.data('dictionaryList') || [];
        if (dataList.length == 0) {
            $this.attr('disabled', 'disabled').html('');
            return;
        }

        //console.log('datalist', dataList);
        $this.html('<option value="">全部</option>');

        dataList.forEach(function (d) {
            var name = d.name || '';
            var $opt = $('<option value="' + name + '">' + name + '</option>');
            $opt.data('dictionary', d).appendTo($this);
        });

        //console.log($this.html());
    }).on('change', function () {
        var $this = $(this), $opt = $this.find('option:selected');
        if ($opt.length == 0 || $this.val() == '') {
            return;
        }

        var data = $opt.data('dictionary') || {};
        var level = parseInt(data.level || 1);
        var index = $selList.index($dom.find('[data-level=' + level + ']'));
        $selList.slice(index + 1, $selList.length).val('').attr('disabled', 'disabled');

        var $next = $selList.eq(index + 1).removeAttr('disabled');
        //console.log('select data', data);
        $next.data('dictionaryList', data.children || []).trigger('dataInit');
    });

    var $topSelect = $selList.eq(0).html('').data('dictionaryList', topDictionaryList);
    $topSelect.trigger('dataInit');

    //除第一个select外，其他的select设置为不可选择
    $dom.find('select[data-id=' + dictionaryId + ']:not(:first)').attr('disabled', 'disabled');
}

function joinDictionaryList(dictionaryDataList) {

}
