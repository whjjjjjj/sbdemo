/**
 * 时间选择初始化
 * @param dom
 * @param startView
 */
function datepickerInit(dom, startView) {
    startView = startView || 'days';
    $(dom).datepicker({
        startView: startView,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true
    });
}

/**
 * 时间范围初始化
 * @param dom
 * @param format
 */
function dateRangeInit(dom, format) {
    $(dom).datepicker({
        inputs: $(dom).find('input'),
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: format
    });
}

function dateTimeInit(dom) {
    $(dom).datetimepicker('remove').datetimepicker({
        format: "yyyy-mm-dd hh:ii",
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: true,
        todayHighlight: false,
        startView: 2,
        minView: 0,
        minuteStep: 10,
        forceParse: true,
        viewSelect: 'hour',
        startDate: new Date(),
        pickerPosition: 'bottom-left'
    });
}