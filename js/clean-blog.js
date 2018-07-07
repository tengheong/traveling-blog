(function ($) {
    "use strict";

    // Show the navbar when the page is scrolled up
    var MQL = 992;

    // Floating label headings for the contact form
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass("floating-label-form-group-with-value", Boolean($(e.target)).val());
    }).on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    // Cache selectors
    var lastId;
    var mainNav = $("#mainNav");
    var mainNavHeight = mainNav.outerHeight();
    var sidebarItems = $(".sidebar").find("a");
    // Anchors corresponding to sidebar items
    var scrollItems = sidebarItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

    // Bind click handler to sidebar items
    // so we can get a fancy scroll animation
    sidebarItems.click(function (e) {
        var href = $(this).attr("href");
        var offsetTop = (href === "#")? 0 : $(href).offset().top - mainNavHeight + 1;

        $("html, body").stop().animate({
            scrollTop: offsetTop
        }, 500);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + mainNavHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop) {
                return this;
            }
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = (cur && cur.length) ? cur[0].id : "";

        if (id && lastId !== id) {
            lastId = id;

            // Set/remove active class
            $("nav").find("a").removeClass("active");
            $("nav").find("a[href='#" + id + "']").addClass("active");
        }
    });

    // Top navbar slide-in effect when scrolling up
    if ($(window).width() > MQL) {
        var headerHeight = $("#mainNav").height();
        $(window).on("scroll", {
            previousTop: 0
        },
        function () {
            var currentTop = $(window).scrollTop();

            // check if user is scrolling up
            if (currentTop < this.previousTop) {
                // if scrolling up...
                if (currentTop > 0 && $("#mainNav").hasClass("is-fixed")) {
                    $("#mainNav").addClass("is-visible");
                } else {
                    $("#mainNav").removeClass("is-visible is-fixed");
                }
            } else if (currentTop > this.previousTop) {
                // if scrolling down...
                $("#mainNav").removeClass("is-visible");

                if (currentTop > headerHeight && !$("#mainNav").hasClass("is-fixed")) {
                    $("#mainNav").addClass("is-fixed");
                }
            }
            this.previousTop = currentTop;
        });
    }
}(jQuery));
