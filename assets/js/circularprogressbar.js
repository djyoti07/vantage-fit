
(function($) {
  $.fn.circleGraphic = function(options) {
    $.fn.circleGraphic.defaults = {
      color: '#05c8ad',
      startAngle: 0,
      //endAngle:50
    };
    $(this).each(function() {
      let $this = $(this)
      var opts = $.extend({}, $.fn.circleGraphic.defaults, options);
      var percentage = $(this).find('.circle').attr('data-percent');
      //var percentage = $this.html();
      var ID = "c" + percentage + Math.random();
      $this.append("<canvas width='200' height='200' id='" + ID + "'></canvas>");
      var canvas = document.getElementById(ID),
      context = canvas.getContext('2d');
      var Width = $this.width();
      $this.height(Width);
      var Height = $this.height();

      canvas.width = Width;
      canvas.height = Height;
      var startAngle = opts.startAngle,
        endAngle = percentage / 100,
        angle = startAngle,
        radius = Width * 0.4;

      function drawTrackArc() {
        context.beginPath();
        context.strokeStyle = '#ecfdfb';
        context.lineWidth = 7;
        context.arc(Width / 2, Height / 2, radius, (Math.PI / 180) * (startAngle * 360 - 90), (Math.PI / 180) * (endAngle * 360 + 270), false);
        context.stroke();
        context.closePath();
      }

      function drawOuterArc(_angle, _color) {
        var angle = _angle;
        var color = _color;
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 7;

        context.font = '300 70px Poppins,sans-serif';
        context.arc(Width / 2, Height / 2, radius, (Math.PI / 180) * (startAngle * 360 - 90), (Math.PI / 180) * (angle * 360 - 90), false);
        context.stroke();
        context.closePath();
      }

      function numOfPercentage(_angle, _color) {
        var angle = Math.ceil(_angle * 100);
        var color = _color;
        context.fillStyle = '#4a5269';
        var metrics = context.measureText(angle);
        var textWidth = metrics.width;
        var xPos = Width / 2 - textWidth / 2,
          yPos = Height / 2 + textWidth / 2;
          context.textAlign ='center';
          context.direction = 'ltr'
        context.fillText(angle + "%", 137, 157);
      }

      function drawACircleInTheEnd() {
        let radians = angle * 2 * Math.PI;
        context.beginPath();
        context.arc(Width / 2 + radius * (Math.sin(radians)),
          Height / 2 - radius * (Math.cos(radians)),
          3,
          0,
          2 * Math.PI,
          false);

        context.fillStyle = '#05c8ad';
        context.fill();
        context.lineWidth = 7;
        context.strokeStyle = '#05c8ad';
        context.stroke();
      }
          

      function draw() {
        var loop = setInterval(function() {
        var elementPos = $('.circleGraphic').offset().top;
              var topOfWindow = $(window).scrollTop();
              var animate = $('.circleGraphic').data('animate');
               if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                  context.clearRect(0, 0, Width, Height);
                  drawTrackArc();
                  drawOuterArc(angle, opts.color);
                  numOfPercentage(angle, opts.color);
                  drawACircleInTheEnd();
                  angle += 0.01;
                  if (angle > endAngle) {
                    clearInterval(loop);
                  }
             }

        }, 1000 / 60);
      }
      draw();
      return $this;
    })
  };
})(jQuery);
$('.circleGraphic').circleGraphic();