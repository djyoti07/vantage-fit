jQuery(document).ready(function(e){new GhostContentAPI({host:" https://vantagefitblog.ghost.io",key:"ad75a783c6fd3a1665f4d6c225",version:"v2"}).posts.browse({limit:6,include:"tags,authors"}).then(a=>{a.forEach(a=>{e("#search_field").append('<div class="col-md-4 col-lg-4 col-sx-12 col-sm-4 d-left"><div class="box-shadow"><div class="overflow"><a href="'+a.url+'" target="_blank"><img class="img-responsive ease" src="'+a.feature_image+'"/></a></div><a href="'+a.url+'" target="_blank"><div class="post_titel">'+a.title+'</div></a><a href="'+a.url+'" target="_blank"><div class="blog_excerpt">'+a.excerpt+"</div></a></div></div>")})}).catch(e=>{console.error(e)})});
$(function(e){e(".popupyoutubevideo,.popupvideosection").magnificPopup({type:"iframe",mainClass:"mfp-fade",removalDelay:160,preloader:!1,fixedContentPos:!1}),e(window).scroll(function(){const a=localStorage.getItem("showMsg");e(window).scrollTop()>550?"false"!==a&&(e(".new_footer_area").addClass("popupspc"),e(".overlayPop").addClass("slideUp").removeClass("slideDown")):e(".overlayPop").removeClass("slideUp").addClass("slideDown").hide("1000"),e(".close-fd").click(function(){e(".new_footer_area").removeClass("popupspc"),e(".overlayPop").addClass("slideDown").removeClass("slideUp"),localStorage.setItem("showMsg","false")}),"false"==a&&(e(".new_footer_area").removeClass("popupspc"),e(".overlayPop").addClass("slideDown").removeClass("slideUp"))}),e.fn.circleGraphic=function(a){e.fn.circleGraphic.defaults={color:"#05c8ad",startAngle:0},e(this).each(function(){let t=e(this);var o=e.extend({},e.fn.circleGraphic.defaults,a),l=e(this).find(".circle").attr("data-percent"),i="c"+l+Math.random();t.append("<canvas width='200' height='200' id='"+i+"'></canvas>");var s=document.getElementById(i),r=s.getContext("2d"),c=t.width();t.height(c);var n=t.height();s.width=c,s.height=n;var d,p=o.startAngle,h=l/100,f=p,v=.4*c;return d=setInterval(function(){var a=e(".circleGraphic").offset().top,t=e(window).scrollTop(),l=e(".circleGraphic").data("animate");a<t+e(window).height()-30&&!l&&(r.clearRect(0,0,c,n),r.beginPath(),r.strokeStyle="#ecfdfb",r.lineWidth=7,r.arc(c/2,n/2,v,Math.PI/180*(360*p-90),Math.PI/180*(360*h+270),!1),r.stroke(),r.closePath(),function(e,a){var t=e,o=a;r.beginPath(),r.strokeStyle=o,r.lineWidth=7,r.font="300 70px Poppins,sans-serif",r.arc(c/2,n/2,v,Math.PI/180*(360*p-90),Math.PI/180*(360*t-90),!1),r.stroke(),r.closePath()}(f,o.color),function(e,a){var t=Math.ceil(100*e);r.fillStyle="#4a5269",r.measureText(t).width,r.textAlign="center",r.direction="ltr",r.fillText(t+"%",137,157)}(f,o.color),function(){let e=2*f*Math.PI;r.beginPath(),r.arc(c/2+v*Math.sin(e),n/2-v*Math.cos(e),3,0,2*Math.PI,!1),r.fillStyle="#05c8ad",r.fill(),r.lineWidth=7,r.strokeStyle="#05c8ad",r.stroke()}(),(f+=.01)>h&&clearInterval(d))},1e3/60),t})}}),$(".circleGraphic").circleGraphic();