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

        $('.offcanfas_menu .dropdown').on('show.bs.dropdown', function(e){
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown(400);
        });
        $('.offcanfas_menu .dropdown').on('hide.bs.dropdown', function(e){
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp(500);
        });
        $(".box_item").hover(function() {
           $(".mid-activity").find(".active-img").removeClass("active-img");
           $(".features").find(".active-sec").removeClass("active-sec");
            $('#' + $(this).attr('data-img') + ' ' +'img').addClass("active-img");
            $(this).addClass("active-sec");

            
    
        });
        $('[data-toggle="popover"]').popover(); 

            

    });
})(jQuery);
jQuery(function ($) {
    $("nav ul li a").each(function() {
        if (this.href === window.location.href) {
            $(this).addClass('active');
        }
    });

    

});




