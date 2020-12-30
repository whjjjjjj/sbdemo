$(document).ready(function () {
    var $cache = $('#cache-box');

    $('.w-home-main-mid-tab-item').on('click', function () {
        $('.w-home-main-mid-tab-item').removeClass('active');
        $(this).addClass('active');

        var roleId = $(this).data('role');
        $cache.find('.w-swiper-cache').removeClass('w-swiper-cache');
        $cache.find('[data-role=' + roleId + ']').addClass('w-swiper-cache');
        initSwiper();

    });

    // 幻灯片部分代码
    var linkSwiper = null;//初始化

    //初始化幻灯片(如果有改动窗口大小或者改动图标数量的时候调用)
    function initSwiper() {
        console.log('initSwiper');

        // 初始化数据
        var allLinkWindowCount = $('.w-swiper-cache .w-home-swiper-item').length;//总共有多少个窗口
        var linkWindowWidth = 230;//一个窗口的宽度
        var linkWindowParentWidth = $('.w-home-swiper-body').width() * 0.85;//窗口父级宽度
        var singleWindowCount = Math.floor(linkWindowParentWidth / linkWindowWidth);//一页能装下多少个
        var singleWindowAllPage = Math.ceil(allLinkWindowCount / singleWindowCount);//一共有多少页

        //如果有幻灯片先销毁
        if (linkSwiper) {
            linkSwiper.destroy();
        }

        //清空元素
        $('.w-home-swiper-body .swiper-wrapper').empty();
        if (allLinkWindowCount === 0) {
            //如果没有元素则不制作幻灯片
            return false;
        }

        //循环添加幻灯片内容
        for (var i = 0; i < singleWindowAllPage; i++) {
            $('.w-home-swiper-body .swiper-wrapper').append('<div class="w-home-swiper-box swiper-slide"></div>');
            for (var j = 0; j < singleWindowCount; j++) {
                var el = $('.w-swiper-cache .w-home-swiper-item').eq(i * singleWindowCount + j);
                if (el.length > 0) {
                    el.clone().appendTo(".w-home-swiper-body .w-home-swiper-box:eq(" + i + ")");
                } else {
                    break;
                }
            }
        }
        //初始化幻灯片
        linkSwiper = new Swiper('.swiper-container', {
            autoplay: false,//可选选项，自动滑动
            // 如果需要分页器
            pagination: {
                el: '.m-swiper-pagination',
                clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.m-swiper-next',
                prevEl: '.m-swiper-prev',
            },
        })
    }

    //窗口大小改动则重新初始化幻灯片
    $(window).resize(function () {
        initSwiper();
    });

    //页面加载后初始化幻灯片
    initSwiper();

});