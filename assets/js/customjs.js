!function(e){"use strict";e(document).ready(function(){e(".header_stick").length&&e(window).scroll(function(){e(window).scrollTop()?e(".header_stick").addClass("navbar_fixed"):e(".header_stick").removeClass("navbar_fixed")}),e(".bar_menu").length&&(e(".bar_menu").on("click",function(){e("#menu").toggleClass("show-menu")}),e(".close_icon").on("click",function(){e("#menu").removeClass("show-menu")})),e(".offcanfas_menu .dropdown").on("show.bs.dropdown",function(n){e(this).find(".dropdown-menu").first().stop(!0,!0).slideDown(400)}),e(".offcanfas_menu .dropdown").on("hide.bs.dropdown",function(n){e(this).find(".dropdown-menu").first().stop(!0,!0).slideUp(500)}),e(".box_item").hover(function(){e(".mid-activity").find(".active-img").removeClass("active-img"),e(".features").find(".active-sec").removeClass("active-sec"),e("#"+e(this).attr("data-img")+" img").addClass("active-img"),e(this).addClass("active-sec")}),e('[data-toggle="popover"]').popover()})}(jQuery),jQuery(function(e){e("nav ul li a").each(function(){this.href===window.location.href&&e(this).addClass("active")})});
