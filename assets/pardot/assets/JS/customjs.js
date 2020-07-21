(function($){
    "use strict";

    $(document).ready(function () {

        //* Navbar Fixed
        function navbarFixed() {
            if ($('.header_stick').length) {
                $(window).scroll(function () {
                    var scroll = $(window).scrollTop();
                    if (scroll) {
                        $(".header_stick").addClass("navbar_fixed");
                    } else {
                        $(".header_stick").removeClass("navbar_fixed");
                    }
                });
            }
        }
        navbarFixed();
        // hamburger_menu
        function offcanvasActivator(){
            if ( $('.bar_menu').length ){
                $('.bar_menu').on('click', function(){
                    $('#menu').toggleClass('show-menu');
                });
                $('.close_icon').on('click',function(){
                    $('#menu').removeClass('show-menu');
                });
            }
        }
        offcanvasActivator();
            

    });
})(jQuery);
jQuery(function ($) {
    $("nav ul li a").each(function() {
        if (this.href === window.location.href) {
            $(this).addClass('active');
        }
    });

    

});




