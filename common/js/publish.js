// 210224 연혁 마우스 스크롤 이벤트
function his_scroll() {
    $(window).on('load scroll', function () {
        var scrollTop = $(window).scrollTop();
        var winH = $(document).height() - $(window).height();

        $('.history_list > li').each(function () {
            var elH = $(this).offset().top;
            if (scrollTop > elH - 400) {
                $(this).addClass('active').siblings().removeClass('active');
            }
            if (scrollTop === winH) {
                $('.history_list > li:last-child').addClass('active').siblings().removeClass('active');
            }
            if (scrollTop === 0) {
                $('.history_list > li:first-child').addClass('active').siblings().removeClass('active');
            }
        });
    });
}

// 210311 gnb
function head_scroll() {
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 80) {
            $('.main').addClass('active');
        } else {
            $('.main').removeClass('active');
        }
    });
}

// 포트폴리오 값 입력
function insertPortfolio(val) {
    var item = portfolio[val];
    for (var i = 0; i < item.length; i++) {
        if ($('.val').eq(i).is('img')) {
            $('.val').eq(i).attr({
                src: item[i][0],
                alt: item[i][1],
            });
        } else if ($('.val').eq(i).is('a')) {
            $('.val').eq(i).attr('href', item[i]).text(item[i]);
        } else {
            $('.val').eq(i).text(item[i]);
        }
    }
}
function FullHeightBanner() {
    winH = $(window).outerHeight();
    $('.mb_wrap .mb').outerHeight(winH);
}
// 스크롤 방지(스크롤 위치 반영)
function pageScroll(state) {
    if (state == 'on') {
        $('body').removeClass('active');
    } else if (state == 'off') {
        $('body').addClass('active');
    }
}

$(function () {
    var winH;
    // if($('#header.sub').length > 0 && window.innerWidth > 1000){
    //     var index1 = $(".sub #gnb > ul > li.active").index();
    //     $('.sub #gnb').on('mouseleave',function(){
    //         $('.sub #gnb > ul > li').removeClass('active');
    //         $('.sub #gnb > ul > li').eq(index1).addClass('active');
    //     });
    // }
    // wow.js 초기화
    new WOW().init();

    //페이지 로드시 실행
    $('.work .container').height($('.work section').height() + 'px');

    //우리가 하는일 - 탭클릭 이벤트
    $('.work button').on({
        click: function () {
            $('.work li').removeClass('active');
            $(this).closest('li').addClass('active');
        },
    });

    // 메인슬라이드 배너 이벤트
    if ($('.main_slide').length > 0) {
        var mainSlider = $('.main_slide');
        mainSlider
            .slick({
                centerPadding: 0,
                autoplay: true,
                autoplaySpeed: 4000,
                cssEase: 'ease-in',
                slickPlay: false,
                pauseOnHover: false,
                infinite: true,
                prevArrow: $('.mb_prev'),
                nextArrow: $('.mb_next'),
            })
            .on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                var i = (currentSlide ? currentSlide : 0) + 1;
                $('.slide_count').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
                $('.main_slide').find('p').removeClass('active');
                $('.slick-active p').addClass('active');
            });

        $('.nt_stop').click(function () {
            if ($(this).hasClass('play')) {
                $(this).removeClass('play').children('.hide').text('일시정지');
                $(this).parents('.mb_ctrl').prev().slick('slickPlay');
                $('.pro_bar').removeClass('pause');
            } else {
                $(this).addClass('play').children('.hide').text('자동시작');
                $(this).parents('.mb_ctrl').prev().slick('slickPause');
                $('.pro_bar').addClass('pause');
            }
        });

        // 210108 추가
        // var time = 3;
        // var bar, isPause, tick, percentTime;

        // bar = $('.ProgressBar span');

        // function startProgressbar() {
        //     resetProgressbar();
        //     percentTime = 0;
        //     isPause = false;
        //     tick = setInterval(interval, 10);
        // }

        // function stopProgressbar(){

        // }

        // function interval() {
        //     if (isPause === false) {
        //         percentTime += 1 / (time + 0.1);
        //         bar.css({
        //             width: percentTime + '%',
        //         });
        //         if (percentTime >= 100) {
        //             mainSlider.slick('slickNext');
        //             startProgressbar();
        //         }
        //     }

        // }

        // function resetProgressbar() {
        //     bar.css({
        //         width: 0 + '%',
        //     });
        //     clearTimeout(tick);
        // }

        // startProgressbar();

        // $('.mb_prev, .mb_next').click(function () {
        //     startProgressbar();
        // });

        // $('.ProgressBar').addClass('pro-ani');
        mainSlider.on('afterChange', function () {
            $('.pro_bar').addClass('pro-ani');
        });
        mainSlider.on('beforeChange', function () {
            $('.pro_bar').removeClass('pro-ani');
        });

        setTimeout(function () {
            $('.slick-active p').addClass('active');
        }, 300);
    }

    // function hh(){
    // 	var portH = $('.tab_con.active .port_list').innerHeight();
    // 	console.log(portH);
    // 	$('.tab_con.active .port_list').css('height', portH);
    // }
    //
    // 포트폴리오 레이아웃 플러그인
    $(window).on('load resize', function () {
        if (window.innerWidth > 768) {
            if ($('.port_list').length > 0) {
                var $portList = $('.port_list').masonry({
                    horizontalOrder: true,
                    transitionDuration: '0.5s',
                    resize: true,
                    containerStyle: { height: '1904px', position: 'relative' },
                });
                $portList.imagesLoaded().progress(function () {
                    $portList.masonry('layout');
                });
            }
        } else {
            $('.port_list').css('animation', 'none');
            $('.portfolio li').css('position', 'relative');
            $('.portfolio li').css('top', 'auto');
        }
    });
    $(window).on('load resize orientationchange', function () {
        if ($(window).width() > 1041) {
            $('#header .sitemap ol').removeAttr('style');
        }
    });
    $('#header .sitemap ul > li').click(function () {
        if ($(window).width() < 1041) {
            $(this).toggleClass('active').children('ol').stop().slideToggle(300);
            if ($(this).hasClass('active')) {
                $(this).siblings().removeClass('active').find('ol').stop().slideUp(300);
            }
        }
    });
    //포트폴리오 보기
    $('.port_list a').on('click', function () {
        var portNum = $(this).attr('data-port');
        insertPortfolio(portNum);
        pageScroll('off');
        $('#modal').show();
        return false;
    });
    //버튼클릭시 모달팝업 열기
    $('.modal button').click(function (e) {
        if (e.target !== this) {
            return false;
        }
        pageScroll('on');
        $('.modal').hide();
    });

    $(window).resize(function () {
        FullHeightBanner();
    });
    FullHeightBanner();

    $('.cate_filter button').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var tabIn = $(this).index();
    });
    $('.scrollTop').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 500);
    });
    gnbToggle();
    function gnbToggle() {
        //gnb 토글
        $('#header .attr button').click(function () {
            $('body').toggleClass('scrollDisable');
            $(this).toggleClass('active');
            $(this).parent().parent().next().fadeToggle();
            $(this).parent().prev().toggleClass('off');
            $(this).parents('#header').toggleClass('active');
        });
    }

    var pfItem = 0;
    // 210205 노재룡 추가

    // 콘텐츠 탭메뉴 (컴패니, 비즈니스, 솔루션)
    $('.tab_menu > ul > li > a').click(function () {
        var tabNum = $(this).parent().index();
        $(this).parent().addClass('active').siblings().removeClass('active');
        $(this).parents('ul').next().find('> li').eq(tabNum).addClass('active').siblings().removeClass('active');
        his_scroll();
        return false;
    });
    his_scroll();

    // 210204 김영산 추가
    // $('.more_port').on( 'click', function() {
    //     if(portfolio.length == pfItem){
    //         alert('내용이 없습니다.');
    //         return false;
    //     }
    //     for(var j = 0; j < 4;j++){
    //         var $items = $('<li class="item '+portfolio[pfItem][1]+'"><a href="'+ portfolio[pfItem][0] +'"><b>'+ portfolio[pfItem][1] +'</b><strong>'+ portfolio[pfItem][2] +' <span>'+ portfolio[pfItem][3] +'</span></strong><img src="'+ portfolio[pfItem][4] +'" alt="'+ portfolio[pfItem][5] +'"></a></li>');
    //         // append items to grid
    //         $('#gall2').append($items).masonry( 'appended', $items );

    //         pfItem++;
    //     }
    //   });
    if ($('.partners .slide').length > 0) {
        $('.partners .slide').slick({
            variableWidth: true,
            slidesToScroll: 1,
            autoplay: true,
            pauseOnHover: true,
            infinite: true,
            autoplaySpeed: 2000,
            prevArrow: $('.partners .prev'),
            nextArrow: $('.partners .next'),
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                    },
                },
            ],
        });
    }

    // 210311 gnb 수정
    head_scroll();
    if ($('#header.main').length > 0) {
        $('#gnb').hover(
            function () {
                $('#header.main').addClass('on');
            },
            function () {
                $('#header.main').removeClass('on');
            }
        );
    }
    $('#gnb > ul > li > a').click(function () {
        index = $(this).parent().index();
        depAct = $(this).parent().hasClass('active');

        if ($(window).width() < 1001) {
            $(this).next().toggleClass('active').parent().siblings().find('div').removeClass('active');
        }
    });

    $('.sub .dep2_none').mouseenter(function () {
        if ($(window).width() > 1000) $('.sub #gnb ul > li > div').css('opacity', '0');
    });

    $('.sub #gnb > div ul > li')
        .not('li.dep2_none')
        .mouseenter(function () {
            if ($(window).width() > 1000) $(this).find('div').css('opacity', '1');
        });

    $('.sub #gnb > div ul > li').mouseleave(function () {
        var dep2_act = $('.dep2_none').hasClass('active');
        if (dep2_act === true) $(this).find('div').css('opacity', '0');
        else $(this).find('div').css('opacity', '1');
    });

    // 도식 높이 자동으로 맞추기
    var winW = window.outerWidth;
    var li_h1 = 0;
    var li_h2 = 0;
    var li_h3 = 0;

    if ($('.slide_solution').length > 0) {
        $('.slide_solution')
            .removeClass('non_fn')
            .slick({
                autoplay: true,
                infinite: true,
                dots: false,
                arrows: false,
                slidesToShow: 1,
                variableWidth: true,
                autoplaySpeed: 1000,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            variableWidth: false,
                            slidesToShow: 2,
                        },
                    },
                ],
            });
    }
}); //jQuery End

// 윈도우 로드시 동작
$(window).load(function () {
    $('#page_load').fadeOut(600);

    // 210316 gnb
    var dep2_act = $('.dep2_none').hasClass('active');
    if (dep2_act === true) $('.sub #gnb ul > li > div').css('opacity', '0');

    txtL_H();
    numH();
});

// 텍스트 리스트
function txtL_H() {
    winW = window.outerWidth;
    li_h1 = 0;

    if (winW > 768) {
        $('.txt_list > li')
            .css({ height: 'auto' })
            .each(function () {
                var H1 = $(this).outerHeight();
                if (H1 > li_h1) {
                    li_h1 = H1;
                }
            });
        $('.txt_list > li').outerHeight(li_h1);
    } else $('.txt_list > li').css({ height: 'auto' });
}

// 스탭 리스트
function numH() {
    winW = window.outerWidth;
    li_h2 = 0;

    if (winW > 1000) {
        $('.num_step > li')
            .css({ height: 'auto' })
            .each(function () {
                var H2 = $(this).outerHeight();
                if (H2 > li_h2) {
                    li_h2 = H2;
                }
            });
        $('.num_step > li').outerHeight(li_h2);
    } else $('.num_step > li').css({ height: 'auto' });
}

// function gnbAct() {
//     $('#header #gnb').removeClass('active');
//     $('#header #gnb button').removeClass('active');
//     $('body').removeClass('scrollDisable');
// }

// 도식 높이 반응형 처리
$(window).on('resize load', function () {
    winW = window.outerWidth;
    li_h1 = 0;
    li_h2 = 0;
    li_h3 = 0;

    if (winW > 1000) {
        numH();
    }
    if (winW > 768) {
        txtL_H();
    }
    if ($('#gall').length > 0) {
        $('#gall').masonry({
            columnWidth: '.item_size',
            itemSelector: '.item',
            percentPosition: true,
        });
    }
});
