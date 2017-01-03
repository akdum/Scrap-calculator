"use strict";

var Scrap = (function() {
    var root = {};

    root.Init = function() {
        ScrollInit();
        AffixBehaviour();
    }

    function AffixBehaviour() {
        jQuery(window).on('scroll', function(event) {
            var navBar =  jQuery('#mainNavBar');
            var scrollValue = jQuery(window).scrollTop();
            if (scrollValue > 100) {
                navBar.addClass('affix');
            } else {
                navBar.removeClass('affix');
            }
        });
    }

    function ScrollInit() {
        jQuery("a.page-scroll").bind("click", function (e) {
            var l = jQuery(this);
            jQuery("html, body").stop().animate({
                scrollTop: jQuery(l.attr("href")).offset().top - 50
            }, 1000);
            e.preventDefault();
        });

        window.sr = ScrollReveal();
        sr.reveal(".sr-icons", {
            duration: 1600,
            scale: .1,
            distance: "0px"
        }, 200);

        jQuery("body").scrollspy({
            target: ".navbar-fixed-top",
            offset: 51
        });
    }

    function GalleryInit() {
        jQuery(".popup-gallery").magnificPopup({
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
                tError: '<a href="%url%">Изображение #%curr%</a> не удается загрузить.'
            }
        })
    }

    return root;
}(Scrap || {}))

jQuery(document).ready(function() {
    Scrap.Init();
});