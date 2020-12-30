function journalSelect(option) {
    var name = option.name;
    var left = option.left, right = option.right;
    var $input = $(option.input), $btn = $(option.btn), $level;

    //结果弹框显示到页面上
    var $box = $input.parent();
    var $resultBox = $('<div class="zen-select-box" style="display:none;top:' + $input.outerHeight(true) + 'px;">' +
        '<div class="popper__arrow" style="left: 35px;"></div></div>');
    var $listBox = $('<div class="zen-select-list-box"></div>').appendTo($resultBox);

    var $ul = $('<ul class="no-padder-h m-t-sm hide"></ul>').appendTo($listBox);
    var $loading = $('<p class="text-center no-margin-bottom lineHeight40P hide">正在加载</p>').appendTo($listBox);
    var $noResult = $('<p class="text-center no-margin-bottom lineHeight40P hide">找不到期刊</p>').appendTo($listBox);

    //是否加载中
    var isLoading = false;

    $box.find('.zen-select-box').remove();
    $resultBox.appendTo($box);

    //点击输入框显示查询结果
    $input.on('click', function () {
        var journal = $input.val(), beforeJournal = $resultBox.data('journal') || '';
        if (journal == null || journal == '') {
            return false;
        }

        if (journal === beforeJournal) {
            $resultBox.slideToggle(300);
        } else {
            $btn.click();
        }
        return false;
    });

    //修改内容时，取消不可选择状态
    $input.on('change', function () {
        $level = $level || $(option.level);
        $level.next().removeClass('disabled');
    });

    //搜索按钮
    $btn.on('click', function () {
        var journal = $input.val() || '';

        if (journal == '') {
            return false;
        }

        if (isLoading) {
            return false;
        }

        //显示搜索结果，并提示加载中
        $ul.addClass('hide');
        $loading.removeClass('hide');
        $resultBox.data('journal', journal).slideDown(300);

        //查询搜索结果
        isLoading = true;
        $.get('/dictionary/searchJournal', {journal: journal}, function (data) {
            isLoading = false;

            var list = data.data;
            if (list == null || list.length == 0) {
                $noResult.removeClass('hide');
                $loading.addClass('hide');
                return;
            }

            $ul.find('li').remove();
            list.forEach(function (d) {
                var name = d.name || '', other = d.other || '', level = d.journal_level || '';
                var $li = $(
                    '<li class="zen-select-item">' +
                    '   <div class="clearfix">' +
                    '       <span class="pull-left"></span>' +
                    '       <span class="pull-right"></span>' +
                    '   </div>' +
                    '</li>');
                $li.find('.pull-left').text(name);
                $li.find('.pull-right').text(other);
                $li.data('level', level).data('name', name).appendTo($ul);
            });

            //隐藏加载中元素并显示搜索结果
            $loading.addClass('hide');
            $noResult.addClass('hide');
            $ul.removeClass('hide');
        });

        return false;
    });

    //列表点击事件初始化
    $ul.on('click', '.zen-select-item', function (e) {
        $resultBox.find('.zen-selected').removeClass('zen-selected');
        var $this = $(this).addClass('zen-selected');
        var name = $this.data('name'), level = $this.data('level');
        $input.val(name);

        $level = $level || $(option.level);

        //console.log('level', $level, level);
        $level.val(level).data('value', level).cascadeSelect('initSelect').next().addClass('disabled');
        //$level.next().addClass('disabled');

        $resultBox.slideUp(300);

        $ul.find('.zen-select-item').each(function () {
            var $li = $(this), myName = $li.data('name') || '';
            if (myName.indexOf(name) < 0) {
                $li.remove();
            }
        });
        $resultBox.data('journal', name);

        e.stopPropagation();
    });

    $resultBox.on('click', function () {
        return false;
    });

    //点击其他地方，隐藏搜索结果
    $(document).on('click', function () {
        $resultBox.slideUp(300);
    });

}
