!function(a) {
    "use strict";
    a("a.page-scroll").bind("click", function(e) {
        var l = a(this);
        a("html, body").stop().animate({
            scrollTop: a(l.attr("href")).offset().top - 50
        }, 1000);
        e.preventDefault();
    })
}(jQuery);
