"use strict";

var Scrap = (function() {
    var root = {};

    root.VariantInfoSection = null;

    root.Init = function() {
        root.VariantInfoSection = $("#variant-info");

        PreparePromo($("#description .description-row"));
        PrepareVariants();
        ScrollInit();
        AffixBehaviour();   
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

        sr.reveal(".sr-variant", {
            duration: 1600,
            scale: .8,
            distance: "0px"
        }, 200);

        $("body").scrollspy({
            target: ".navbar-fixed-top",
            offset: 51
        });
    }

    function PreparePromo(container) {
        var template = $('#promo-icon-template').html();
        Mustache.parse(template);   // optional, speeds up future uses

        var rendered = Mustache.render(template, { "promo": [
                                                        {title: "Дизайн уникален", comment: "Дизайн разрабатывается с учетом Вашего мнения.", className: "fa-user-circle text-faded", textClassName: "text-faded"},
                                                        {title: "Необычно", comment: "Отличный необычный подарок друзьям и близким.", className: "fa-gift text-faded", textClassName: "text-faded"},
                                                        {title: "Красиво", comment: "Превосходное место сохранить свои волшебные моменты.", className: "fa-picture-o text-faded", textClassName: "text-faded"},
                                                        {title: "Сделано с Любовью", comment: "Каждый альбом уникальный и делается только для Вас.", className: "fa-heart text-faded", textClassName: "text-faded"}
                                                        ]
                                                    });
        container.html(rendered);
    }

    function PrepareVariants() {
        var row = $("#calculate .calculate-row");
        PrepareVariantsMarkup(row);
        PrepareVariantsEvents(row)
    }

    function PrepareVariantsMarkup(container) {
        var template = $('#variant-template').html();
        Mustache.parse(template);   // optional, speeds up future uses

        var rendered = Mustache.render(template, { "variants": [
                                                        {name: "album1.jpg", price: "700"},
                                                        {name: "album2.jpg", price: "1500"},
                                                        {name: "album3.jpg", price: "3500"},
                                                        {name: "album4.jpg", price: "5000"}
                                                        ]
                                                    });
        container.html(rendered);
    }

    function PrepareVariantsEvents(container) {
        $(".variant-box", container[0]).each(function() {
            $(this).on('click', function(e) {
                var $this = $(this);
                $this.closest('.row').find(".variant-box.active").removeClass('active');
                $this.addClass('active');
                root.VariantInfoSection.show(400);
                e.stopPropagation();
            });
        });
        $("body").on('click', function(e) {
            if (root.VariantInfoSection.is(":visible")) {
                root.VariantInfoSection.hide(400);
            }            
        });
    }

    return root;
}(Scrap || {}))

$(document).ready(function() {
    Scrap.Init();
});