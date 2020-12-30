/**
 * 统一提示信息
 * @param data
 * @param fun
 * @param frm
 */
function commonResult(data, fun, frm) {

    var successFun = function () {
        var url = data.url || '', urlType = data.urlType || 'window', isUrl = data.isUrl;
        isUrl = isUrl == undefined || isUrl == null ? true : isUrl;
        if (!isUrl || url == '') {
            return;
        }

        if (urlType == 'window') {
            window.location.href = url;
        } else if (urlType == 'nav') {
            loadPage(url);
        }
    };
    var failFun = function () {
        var para = data.para || '';
        if (para != '') {
            var $frm = $(frm || 'form:first');
            $frm.find('[name=' + para + ']').focus();
            $frm.find(':password').val('');
        }
    };


    if (typeof fun == 'function') {
        successFun = fun;
    } else if (typeof fun == 'object') {
        successFun = typeof fun.success == 'function' ? fun.success : successFun;
        failFun = typeof fun.fail == 'function' ? fun.fail : failFun;
    }


    if (data.code == 1) {
        layerSuccess(data.message, successFun);
    } else {
        layerFail(data.message, failFun);
    }
}

/**
 * 序列化列表
 * @param dom
 * @param selector
 * @returns {Array}
 */
function serializeArrayData(dom, selector) {
    var $dom = $(dom);
    var dataList = [];
    $dom.find(selector).each(function () {
        dataList.push(serializeData(this));
    });
    return dataList;
}

/**
 * 序列化列表
 * @param dom
 * @param selector
 * @returns {Array}
 */
function serializeArrayDatas(dom, selector) {
    var $dom = $(dom);
    var dataList = [];
    $dom.find(selector).each(function () {
        dataList.push(serializeDatas(this));
    });
    return dataList;
}

/**
 * 序列化数据
 * @param dom
 * @returns {{}}
 */
function serializeData(dom) {
    var $dom = $(dom);
    var data = {};
    $dom.find('input:not(:button,:submit)').each(function () {
        var $this = $(this);
        var name = $this.attr('name'), value = $this.val();

        if ($this.is(':checkbox')) {
            if ($this.is(':checked')) _setValue(data, name, value);
        } else if ($this.is(':radio')) {
            if ($this.is(':checked')) _setValue(data, name, value);
        } else {
            _setValue(data, name, value);
        }
    });

    $dom.find('select').each(function () {
        var $this = $(this), name = $this.attr('name'), value = $this.val();
        _setValue(data, name, value);
    });

    return data;
}

/**
 * 序列化数据
 * @param dom
 * @returns {{}}
 */
function serializeDatas(dom) {
    var $dom = $(dom);
    var data = {};

    $dom.find('input:not(:button,:submit)').each(function () {
        var $this = $(this);
        var name = $this.attr('name'), value = $this.val();
        if ($this.is(':checkbox')) {
            if ($this.is(':checked')) _setValue(data, name, value);
        } else if ($this.is(':radio')) {
            var name = $this.attr('names'), value = $this.attr('memberId');
            if ($this.is(':checked')) _setValue(data, name, value);
        } else {
            _setValue(data, name, value);
        }


        if ($this.is(':checkbox')) {
            if ($this.is(':checked')) _setValue(data, name, value);
        } else if ($this.is(':radio')) {
            var name = 'status', value = $this.attr('value');
            if ($this.is(':checked')) _setValue(data, name, value);
        } else {
            _setValue(data, name, value);
        }
    });

    $dom.find('select').each(function () {
        var $this = $(this), name = $this.attr('name'), value = $this.val();
        _setValue(data, name, value);
    });

    return data;
}


function _setValue(data, key, value) {
    if (key == undefined || key == null || key == '') {
        return;
    }

    if (data[key] != null && data[key] != '') {
        data[key] = data[key] + ',' + value;
    } else {
        value = key.toLowerCase().indexOf('id') >= 0 ? parseInt(value) : value;
        data[key] = value;
    }
}

/**
 * 序列化表单数据
 * @param form
 * @returns {{}}
 */
function serializeForm(form) {
    var $form = $(form);
    var form_data = $form.serializeArray();
    var data = {};

    //添加disabled的数据
    $form.find(':disabled').each(function () {
        var $this = $(this), name = $this.attr('name') || '';
        if (name != '') {
            var value = $form.find('[name=' + name + ']').val();
            form_data.push({name: name, value: value});
        }
    });

    for (var i in form_data) {
        var key = form_data[i].name;
        var value = form_data[i].value;
        if (data[key] == undefined || data[key] == null || data[key] == "") {
            data[key] = value;
        } else {
            data[key] = data[key] + "," + value;
        }
    }

    return data;
}

/**
 * 获取select的值
 */
function getSelectVal(obj) {
    var value = $(obj).val(), result = '';
    for (var i in value) {
        result += value[i] + ',';
    }
    return result != '' ? result.substring(0, result.length - 1) : '';
}

$.fn.ajaxGetOption = function (url, data, listName, keyName, valueName) {
    var $sel = $(this);

    //如果url参数为空，则默认从$(this).data中取出数据，方便进行刷新操作
    if (url == null || url == undefined) {
        var option = $sel.data('ajaxGetOptionPara') || {};
        url = option.url || '';
        data = option.data || {};
        listName = option.listName || '';
        keyName = option.keyName || '';
        valueName = option.valueName || '';
    }

    //允许不传data参数
    if (typeof data == 'string') {
        valueName = keyName;
        keyName = listName;
        listName = data;
        data = {};
    }

    //通过get请求获取具体数据
    $.get(url, data, function (result) {
        var options = createOptions(result, listName, keyName, valueName);
        if (options != '') {
            $sel.find('option:not([value="0"],[value=""])').remove();
            $sel.append(options);
        }
    });

    $sel.data('ajaxGetOptionPara', {url: url, data: data, listName: listName, keyName: keyName, valueName: valueName});
    return $sel;
};

/**
 * 获取元素中的序列化参数
 * @returns {{}}
 */
$.fn.serializeData = function () {
    return serializeData(this);
};

/**
 * 将指定的元素中的参数组成数组并返回
 * @param selector1
 * @param selector2
 * @returns {Array}
 */
$.fn.serializeArrayData = function (selector1, selector2) {
    if (selector2 == undefined || selector2 == null) {
        return serializeArrayData(this, selector1);
    } else {
        var $this = $(this), result = [];
        $this.find(selector1).each(function () {
            var data = {id: $(this).data('id'), values: serializeArrayData(this, selector2)};
            result.push(data);
        });
        return result;
    }
};

/**
 * 拼接option
 * @param result
 * @param listName
 * @param keyName
 * @param valueName
 * @returns {string}
 */
function createOptions(result, listName, keyName, valueName) {
    var list = result[listName] || [], i, item, options = '';
    for (i = 0; i < list.length; i++) {
        item = list[i] || {};
        var name = item[keyName] || '', value = item[valueName] || '';
        options += '<option value="' + value + '">' + name + '</option>';
    }
    return options;
}

/**
 * 将对象转为url参数
 * @param data
 * @returns {string}
 */
function data2UrLPara(data) {
    var result = '';
    jQuery.each(data, function (i, val) {
        result += i + "=" + val + '&';
    });
    if (result != '') {
        result = '?' + result.substring(0, result.length - 1);
    }
    return result;
}

/**
 * 上传文件
 * @param list
 * @param btn
 * @param box
 * @param fn
 * @param opt
 */
function uploadFile(list, btn, box, fn, opt) {
    var $list = $(list);

    $list.on('change', btn, function () {
        var $this = $(this), $par = $this.closest(box);
        var file = $(this)[0].files[0];

        var $next = $this.next();
        $next.html('<i class="fa fa-download text-info hide"></i> ' + file.name);


        var formData = new FormData();
        formData.append('file', file);

        //设置其他参数
        fn.apply($par, [formData]);

        $.ajax({
            url: opt.url || '/admin/apply/uploadAttachment',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.code == 1) {
                    if (typeof opt.success == 'function') {
                        opt.success.apply($this, [data]);
                    }
                } else {
                    commonResult(data);
                }
            }
        });

    });
}

/**
 * excel上传
 * @param option
 */
function uploadExcel(option) {
    var $file = $(option.file);
    $file.on('change', function () {
        var formData = new FormData();
        formData.append('file', $file[0].files[0]);
        var setDataFn = option.setData;
        if (setDataFn) {
            setDataFn.apply(null, formData);
        }
        layer.load();
        $.ajax({
            url: option.url
            , type: 'post'
            , data: formData
            , contentType: false
            , processData: false
            , success: option.success
        });

        $file.val('');
    });


}

/**
 * 过滤筛选初始化
 * @param list
 * @param tr
 * @param search
 */
function filterList(list, tr, search) {
    var $list = $(list), $search = $(search);

    $search.on('page.filter', function () {
        var data = $search.serializeData();
        $list.find(tr).each(function (i, item) {
            var isAccord = true, $item = $(item);
            jQuery.each(data, function (i, val) {

                //内容为空，跳过
                val = val == 0 ? val : (val || '');
                if (val === '') {
                    return true;
                }

                //关键字匹配所有字段
                if (i == 'keyword') {
                    isAccord = false;
                    $item.find('[data-type]').each(function () {
                        var $this = $(this);
                        var myVal = $this.is('select') ? $this.val() : $this.text();
                        if (myVal.indexOf(val) >= 0) {
                            isAccord = true;
                            return false;
                        }
                    });
                    return isAccord;
                }

                //单一字段匹配
                var $this = $item.find('[data-type=' + i + ']');
                if ($this.length == 0) {
                    return isAccord;
                }
                var myVal = $this.is('select') ? $this.val() : $this.text();
                var intVal = parseInt(val), myIntVal = parseInt(myVal);

                if (myVal !== val && intVal !== myIntVal) {
                    isAccord = false;
                }

                return isAccord;

            });


            if (!isAccord) {
                $item.find(':checkbox').prop('checked', false).end().hide();
            } else {
                $item.show();
            }

        });
    });

    $search.find('select').on('change', function () {
        $search.trigger('page.filter');
    }).end().find('button').on('click', function () {
        $search.trigger('page.filter');
    }).end().find('input').on('keydown', function (e) {
        if (e.keyCode === 13) {
            $search.trigger('page.filter');
        }
    });
}
