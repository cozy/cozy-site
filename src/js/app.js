$(function() {

  // Features
  //
  // Config features screenshot switching
  var $featuresLink         = $('.featuresList-item-link'),
      $screenshotsContainer = $('.featuresList-screenshots'),
      $featuresScreenshot   = $('.featuresList-screenshotOutter');

  // Set height of screenshots container, from the first slide at launch
  var firstScreenshotHeight = $featuresScreenshot.filter('.active').find('.featuresList-screenshot').height();

  $screenshotsContainer.height(firstScreenshotHeight + 'px');

  $featuresLink.on('click', function() {
    $featuresLink.filter('.active').removeClass('active');
    $(this).addClass('active');

    var target = $(this).data('target');

    $('.featuresList-screenshotOutter.active').removeClass('active');
    $('#feature-' + target).addClass('active');

    return false;
  });


  // Smooth scrolling on click on anchor link
  //
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

});