$(function () {
    var $menuItem = $('.menuItem');

    $menuItem.on('click', menuItem).each(function (index) {
        if (!$(this).attr('data-index')) {
            $(this).attr('data-index', index);
        }
    });

    /**
     * @desc 点击导航栏获取data-url
     */
    function menuItem() {
        var $this = $(this),
            dataUrl = $this.data('url');

        if (dataUrl === undefined || $.trim(dataUrl).length === 0) return;

        mainLoad(dataUrl);
    }

    var hash = window.location.hash || '';
    if (hash != '') {
        var itemId = hash.substring(1, hash.length);
        var $menu = $('.menuItem[item-id="' + itemId + '"]').click();
        if ($menu == null || $menu.length == 0) {
            mainLoad(itemId);
        }

    }

});

/**
 * @desc 刷新当前页面
 * @param url {String} 需要刷新的页面url
 * @param [data] {Object} 加载页面时需要传给后台的参数
 */
function mainLoad(url, data, nowLoadData) {
    var $content = $('#content');

    //保存历史记录
    var history = $content.data('history') || [];
    var beforeData = history.pop();
    var loadData = {url: url, data: data};
    if (beforeData != null && (beforeData.url || '') !== url) {
        var $list = $content.find('[id*=list]');
        if ($list.length > 0) {
            var listData = $list.data('pageData') || {};
            beforeData.list = $list;
            beforeData.listData = listData;
        }
        history.push(beforeData);
    }
    history.push(loadData);
    $content.data('history', history);

    if (nowLoadData != null) {
        $content.data('historyData', nowLoadData.listData);
    } else {
        $content.removeData('historyData');
    }

    $content.empty().layerLoad().load(url, data, function () {
        $content.closeLayerLoad();
        $content.find('.common_back').on('click', mainBack);

        $content.find('a.main_a').on('click', function () {
            mainLoad($(this).attr('href'));
            return false;
        });

        window.location.hash = '#' + url;
    });
}

/**
 * 返回
 */
function mainBack() {
    var $content = $('#content');

    //保存历史记录
    var history = $content.data('history') || [];
    if (history.length <= 0) {
        return;
    }

    history.pop();
    var beforeLoadData = history.pop();
    if (beforeLoadData != null) {
        mainLoad(beforeLoadData.url || '', beforeLoadData.data, beforeLoadData);
    }
}

/**
 * 刷新
 */
function mainRefresh() {
    var $content = $('#content');

    //保存历史记录
    var history = $content.data('history') || [];
    if (history.length <= 0) {
        return;
    }

    var beforeLoadData = history.pop();
    if (beforeLoadData != null) {
        mainLoad(beforeLoadData.url || '', beforeLoadData.data);
    }
}
