jQuery(document).ready(function(e){new GhostContentAPI({host:" https://vantagefitblog.ghost.io",key:"ad75a783c6fd3a1665f4d6c225",version:"v2"}).posts.browse({limit:6,include:"tags,authors"}).then(a=>{a.forEach(a=>{e("#search_field").append('<div class="col-md-4 col-lg-4 col-sx-12 col-sm-4 d-left"><div class="box-shadow"><div class="overflow"><a href="'+a.url+'" target="_blank"><img class="img-responsive ease" src="'+a.feature_image+'"/></a></div><a href="'+a.url+'" target="_blank"><div class="post_titel">'+a.title+'</div></a><a href="'+a.url+'" target="_blank"><div class="blog_excerpt">'+a.excerpt+"</div></a></div></div>")})}).catch(e=>{console.error(e)})});

$(function($) {
$('.popupyoutubevideo,.popupvideosection').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
  });
  $(document).ready(function () {
    $(window).scroll(function() {
      const showMsg = localStorage.getItem('showMsg');
      if ($(window).scrollTop() > 550) {
          if(showMsg !== 'false'){
            $(".new_footer_area").addClass("popupspc");
            $('.overlayPop').addClass("slideUp").removeClass("slideDown");
          }
      } else {
        $('.overlayPop').removeClass("slideUp").addClass("slideDown").hide("1000");
      }
       $(".close-fd").click(function() {
        $(".new_footer_area").removeClass("popupspc");
        $(".overlayPop").addClass("slideDown").removeClass("slideUp");
          localStorage.setItem('showMsg', 'false');
      }); 
      if(showMsg == 'false'){
        $(".new_footer_area").removeClass("popupspc");
        $('.overlayPop').addClass("slideDown").removeClass("slideUp");    
      }
    });
  });
});