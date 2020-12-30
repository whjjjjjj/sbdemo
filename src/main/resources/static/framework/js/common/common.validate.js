$.validator.setDefaults({
    highlight: function (element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function (element) {
        element.closest('.form-group').removeClass('has-error').addClass('has-success');
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
        if (element.is(":radio") || element.is(":checkbox")) {
            error.appendTo(element.parent().parent().parent());
        } else {
            error.appendTo(element.parent());
        }
    },
    errorClass: "help-block m-b-none",
    validClass: "help-block m-b-none"
});

/**
 * 校验初始化
 * @param dom
 */
function validatorInit(dom) {
    var $frm = $(dom), icon = "<i class='fa fa-times-circle'></i> ";
    var message = {};
    $frm.find('input').each(function () {
        var name = $(this).attr('name'), msg = $(this).data('msg');
        if (msg) {
            message[name] = icon + msg;
        }
    });
    $frm.validate({
        messages: message
    });
    return $frm;
}