(function ($) {
    $.modalOption = {
        newLang: function () {
            $.modalOption.data = {
                'rejectList': {url: '/admin/assess/rejectModal?itemAssessId=', cls: 'modal-900'},
                'assess': {url: '/admin/assess/assessModal?assessId=', id: 'assessModal', cls: ''},
                'back': {url: '/admin/assess/reassignBackModal?itemAssessId=', cls: '', id: 'reassignModal'},
                'itemInfo': {url: '/admin/assess/itemInfoData?itemAssessId=', cls: '', id: 'itemInfoModal'},
                'exportList': {url: '/admin/apply/exportList?applyId=', cls: '', id: 'exportListModal'},
                'adminExportList': {url: '/admin/export/exportList?projectId=', cls: '', id: 'adminExportListModal'}
            };
        }
    };
    $.modalOption.newLang();
})(jQuery);