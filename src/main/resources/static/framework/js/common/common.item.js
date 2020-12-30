/**
 * item头部点击事件
 * @param itemBox
 * @param fn
 */
function itemHeadClick(itemBox, fn) {
    var $itemBox = $(itemBox);

    $itemBox.on('click', '.step', function () {
        var $this = $(this);
        if ($this.hasClass('using')) {
            return true;
        }

        //样式修改
        $this.removeClass('already').removeClass('unUsed').addClass('using');
        $this.prevAll().removeClass('using').removeClass('unUsed').addClass('already');
        $this.nextAll().removeClass('using').removeClass('already').addClass('unUsed');

        fn.apply($this);
    });

    $itemBox.on('prevStep', function () {
        var index = $itemBox.find('.step.using').index();
        $itemBox.find('.step').eq(index - 1).click();
    }).on('nextStep', function () {
        var index = $itemBox.find('.step.using').index();
        $itemBox.find('.step').eq(index + 1).click();
    });
}

