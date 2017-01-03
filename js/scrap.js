!function (a) {
    "use strict";
    a("a.page-scroll").bind("click", function (e) {
        var l = a(this);
        a("html, body").stop().animate({
            scrollTop: a(l.attr("href")).offset().top - 50
        }, 1000);
        e.preventDefault();
    });

    a(window).on('scroll', function(event) {
        var navBar =  a('#mainNavBar');
        var scrollValue = a(window).scrollTop();
        if (scrollValue > 100) {
            navBar.addClass('affix');
        } else {
            navBar.removeClass('affix');
        }
    });

    a("body").scrollspy({
        target: ".navbar-fixed-top",
        offset: 51
    });

    window.sr = ScrollReveal();

    sr.reveal(".sr-icons", {
        duration: 1600,
        scale: .1,
        distance: "0px"
    }, 200);

    a(".popup-gallery").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Загружается изображение #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
            enabled: !0,
            navigateByImgClick: !0,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    })
} (jQuery);
