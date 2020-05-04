jQuery(document).ready(function($) {

    var config = {
        'share-selected-text': true,
        'load-more': true,
        'infinite-scroll': false,
        'infinite-scroll-step': 1,
        'disqus-shortname': 'vantage-circle',
        'content-api-host': ' https://vantagefitblog.ghost.io',
        'content-api-key': 'ad75a783c6fd3a1665f4d6c225',
    };
    var ghostAPI = new GhostContentAPI({
        host: config['content-api-host'],
        key: config['content-api-key'],
        version: 'v2'
    });
    ghostAPI.posts
    .browse({limit: 6, include: 'tags,authors'})
    .then((posts) => {
        posts.forEach((post) => {
          $('#search_field').append('<div class="col-md-4 col-lg-4 col-sx-12 col-sm-4 d-left"><div class="box-shadow"><div class="overflow"><a href="'+post.url+'" target="_blank"><img class="img-responsive ease" src="'+post.feature_image+'"/></a></div><a href="'+post.url+'" target="_blank"><div class="post_titel">'+post.title+'</div></a><a href="'+post.url+'" target="_blank"><div class="blog_excerpt">'+post.excerpt+'</div></a></div></div>');
        });
    })
    .catch((err) => {
        console.error(err);
    });
  });