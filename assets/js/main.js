(function($){

    "use strict";

    //===== Mobile Menu

    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass('active');
    });

    $(".navbar-nav a").on('click', function() {
        $(".navbar-toggler").removeClass('active');
        $(".navbar-collapse").removeClass("show");
    });


    //===== Sticky navigation

    $(window).on('scroll', function() {
        if ($(window).scrollTop() < 10) {
            $(".navigation").removeClass("sticky");
        } else {
            $(".navigation").addClass("sticky");
        }
    });


    //===== Active section link on scroll

    var scrollLink = $('.page-scroll');
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();
        scrollLink.each(function() {
            var sectionOffset = $(this.hash).offset().top - 73;
            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });


    //===== Magnific Popup

    $('.image-popup').magnificPopup({type: 'image'});
    $('.text-popup').magnificPopup({type: 'inline', midClick: true});


    //===== Back to top

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200);
        } else {
            $('.back-to-top').fadeOut(200);
        }
    });

}(jQuery));
