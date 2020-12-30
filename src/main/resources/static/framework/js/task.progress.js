function taskInfo(modal, url) {
    var $modal = $(modal), isShowModal = true;

    $modal.find('#name').html('-');
    $modal.find('#status').html('-');
    $modal.find('.progress-bar').width('0');
    $modal.find('#dealCount').html('-');
    $modal.find('#allCount').html('-');
    $modal.find('#successCount').html('-');
    $modal.find('#errorCount').html('-');
    $modal.find('#error').html('').slideUp();

    /**
     * 更新进度
     */
    function updateProgress() {
        $.get(url, function (data) {
            var isNextUpdate = true;
            if (data.code == 1) {
                var task = data.progress, name = task.name || '';
                var dealCount = task.dealCount || 0, count = task.count || 0;
                var percent = 1.0 * dealCount / count * 100.0;

                //提示信息
                var errorMessage = task.errorMessage;
                var tip = '';
                if (errorMessage) {
                    $.each(errorMessage, function (i, val) {
                        tip += (i + "：" + val + '<br/>');
                    });
                }

                $modal.find('#name').html(name);
                $modal.find('#status').html(dealCount == count ? '已完成' : '进行中');
                $modal.find('.progress-bar').width(percent + '%');
                $modal.find('#dealCount').html(dealCount);
                $modal.find('#allCount').html(count);
                $modal.find('#successCount').html(task.successCount || 0);
                $modal.find('#errorCount').html(task.errorCount || 0);
                $modal.find('#error').html(tip).slideDown();
                isNextUpdate = dealCount < count;

                if (isShowModal) {
                    $modal.modal('show');
                    isShowModal = false;
                }
            }

            if (isNextUpdate) {
                setTimeout(updateProgress, 2 * 1000);
            }
        });
    }

    updateProgress();
}