"use strict";

var Scrap = (function() {
    var root = {};

    root.Init = function() {
        PrepareServices();
        ScrollInit();
        AffixBehaviour();
        GalleryInit();        
    }

    function AffixBehaviour() {
        $(window).on('scroll', function(event) {
            var navBar =  $('#mainNavBar');
            var scrollValue = $(window).scrollTop();
            if (scrollValue > 100) {
                navBar.addClass('affix');
            } else {
                navBar.removeClass('affix');
            }
        });
    }

    function ScrollInit() {
        $("a.page-scroll").bind("click", function (e) {
            var l = $(this);
            $("html, body").stop().animate({
                scrollTop: $(l.attr("href")).offset().top - 50
            }, 1000);
            e.preventDefault();
        });

        window.sr = ScrollReveal();
        sr.reveal(".sr-icons", {
            duration: 1600,
            scale: .1,
            distance: "0px"
        }, 200);

        $("body").scrollspy({
            target: ".navbar-fixed-top",
            offset: 51
        });
    }

    function GalleryInit() {
        PrepareGalleryData();

        $(".popup-gallery").magnificPopup({
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

    function PrepareServices() {
        var template = $('#service-template').html();
        Mustache.parse(template);   // optional, speeds up future uses

        var rendered = Mustache.render(template, { "services": [
                                                        {title: "Дизайн каждого альбома уникален", comment: "Дизайн разрабатывается с учетом Вашего мнения.", className: "fa-user-circle"},
                                                        {title: "Оплата", comment: "Оплата безналичным переводом на карту Сбербанка.", className: "fa-credit-card"},
                                                        {title: "Доставка по всей России", comment: "Альбом может быть доставлен по всей России через Почту России.", className: "fa-heart"},
                                                        {title: "Сделано с Любовью", comment: "Каждый альбом уникальный и делается только для Вас.", className: "fa-user-circle"}
                                                        ]
                                                    });
        $('#services .services-row').html(rendered);
    }

    function PrepareGalleryData() {
        var template = $('#portfolio-template').html();
        Mustache.parse(template);   // optional, speeds up future uses

        var rendered = Mustache.render(template, { "portfolio": [
                                                        {title: "Альбом для Златы", comment: "Комментарий", name: "album1.jpg"},
                                                        {title: "Нежный альбом для Марьяны", comment: "Комментарий", name: "album2.jpg"},
                                                        {title: "Нежный альбом для Марьяны", comment: "Комментарий", name: "album2_1.jpg"},
                                                        {title: "Альбом-замок для Стаси", comment: "Комментарий", name: "album3.jpg"},
                                                        {title: "Альбом-замок для Стаси", comment: "Комментарий", name: "album3_1.jpg"},
                                                        {title: "Альбом для Дашеньки", comment: "Комментарий", name: "album4.jpg"},
                                                        ]
                                                    });
        $('.row.popup-gallery.no-gutter').html(rendered);
    }

    return root;
}(Scrap || {}))

$(document).ready(function() {
    Scrap.Init();
});