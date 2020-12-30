/**
 * @author CandyQian
 * @date   2018/6/30.
 */

$(function() {
    $('#toggle-menu').on('click',function() {
        SmoothlyMenu();
    });

    $('#index-nav').on('click','[data-ride="collapse"]>li>a',function() {
        if($('body').hasClass('mini-navbar') && $(this).next('ul').length){
            SmoothlyMenu();
        }
    });

    function SmoothlyMenu() {
        $('body').toggleClass('mini-navbar');
        $('#index-menu').hide();
        setTimeout(function () {
            $('#index-menu').fadeIn(500);
        }, 300);
    }
});