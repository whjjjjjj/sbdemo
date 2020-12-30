function myModal(type, dataId) {
    var modalData = $.modalOption.data;
    if (modalData[type] != null) {
        var data = modalData[type];
        return showRemoteModal(data.url + (dataId || ''), data.cls || '', data.id || '', data.callback || null, data.height || '', data.width || '');
    }
    return null;
}

//modal摸态框 remote
function showRemoteModal(url, dialogClass, id, callback, height, width) {
    dialogClass = dialogClass == undefined || dialogClass == null ? '' : dialogClass;

    if (dialogClass != '') {
        $('.' + dialogClass).closest('.modal').modal('hide');
    }

    if (id != '') {
        $('#' + id).modal('hide');
    }


    var $modal = $('<div class="modal inmodal fade" tabindex="-1" role="dialog" aria-hidden="true"></div>')
        .append('<div class="modal-dialog ' + dialogClass + '"><div class="modal-content animated w_modal_wrap fadein" style="height: 100%"></div></div>')
        .appendTo('body');

    if (height != null && height != '') {
        $modal.find('.modal-dialog').css('height', height);
    }

    if (width != null && width != '') {
        $modal.find('.modal-dialog').css('width', width);
    }

    if (id != null && id != "") {
        $modal.attr("id", id);
    }

    var urlOpt = typeof url == 'object' ? url : {url: url}, data = urlOpt.data || {};
    url = urlOpt.url;

    $modal.on('shown.bs.modal', function () {
        $modal.find('.modal-dialog').layerLoad();
        $modal.find('.modal-content').load(url, data, function () {
            //$modal.modal('show');
            $modal.find('.modal-dialog').closeLayerLoad();
            if (typeof callback == 'function') {
                callback.apply($modal);
            }
        });
    });
    $modal.modal('show');
    $modal.on('hidden.bs.modal', function () {
        $modal.find('.cascader').cascadeSelect('destroy');

        if ($modal.data('isReload')) {
            $modal.trigger('reloadPage');
        }

        $modal.remove();
    });

    //modal重新加载
    $modal.on('modalReload', function () {
        $modal.find('.modal-dialog').layerLoad();
        $modal.find('.modal-content').load(url, data, function () {
            $modal.find('.modal-dialog').closeLayerLoad();
        });
    });

    return $modal;
}

