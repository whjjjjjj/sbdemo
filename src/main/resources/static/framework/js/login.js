$(document).ready(function () {
    $(".w-login-input").focus(function () {
        $(".w-login-input-box").removeClass('active');
        $(this).parent().addClass('active');
    });
    $('#login').on('click', function () {
        var account = $('#account').val();
        var password = $('#password').val();
        if (account == '') {
            layer.msg('请输入账号');
            return false;
        } else if (password == '') {
            layer.msg('请输入密码');
            return false;
        }
        //处理发送逻辑
        $.ajax({
            type: 'POST',
            url: 'url',
            data: {},
            success: function (result) {

            },
            error: function () {

            },
            dataType: 'json'
        });
    });
});