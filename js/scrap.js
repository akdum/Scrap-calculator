"use strict";

window.onerror = function(error) {
    alert(error);
};

var Scrap = (function() {
    var root = {};

    root.VariantInfoColumn = null;

    root.Init = function() {
        root.VariantInfoColumn = $(".info-column");

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

        var rendered = Mustache.render(template, {"variants": window.PromoAlbums});
        container.html(rendered);
    }

    function PrepareVariantsEvents(container) {
        var variants = $(".variant-box", container[0]);
        variants.each(function() {
            $(this).on('click', function(e) {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $this.closest('.row').find(".variant-box.active").removeClass('active');
                    $this.addClass('active');
                    HideInfoPanel();
                    
                    ShowInfoPanel($this);              
                } else {
                    $this.removeClass('active');
                    HideInfoPanel();
                }
                e.stopPropagation();
            });
        });
        $("body").on('click', function(e) {
            HideInfoPanel();
        });
    }

    function ShowInfoPanel(albumObject) {         
        var albumColumn = albumObject.closest("div[class*='col']");
        var nextRowElement = null;
        albumColumn.siblings().each(function() {
            var $this = $(this);
            if ($this.offset().top > albumObject.offset().top) {
                nextRowElement = $this;
                return false;
            }
        });

        root.VariantInfoColumn.detach();
        if (nextRowElement) {
            root.VariantInfoColumn.insertBefore(nextRowElement);            
        } else {
            root.VariantInfoColumn.insertAfter(albumColumn);
        }
        root.VariantInfoColumn.show(0, function(){
            FillInfoPanel(GetAlbumModelById(albumColumn.data('id')));
            $(this).css('opacity','1');            
        });
    }

    function GetAlbumModelById(id) {
        var model = null;
        $(window.PromoAlbums).each(function() {
            var $this = $(this)[0];
            if ($this.id == id) {
                model = $this;
            }
        })
        return model;
    }

    function FillInfoPanel(albumColumnModel) {
        var template = $('#gallery-template').html();
        Mustache.parse(template);   // optional, speeds up future uses

        var rendered = Mustache.render(template, {"gallery": albumColumnModel.gallery});
        root.VariantInfoColumn.find('.row').html(rendered);
    }

    function HideInfoPanel() {
        root.VariantInfoColumn.hide().css('opacity','0').detach().appendTo($('body'));
    }

    return root;
}(Scrap || {}))

$(document).ready(function() {
    Scrap.Init();
});