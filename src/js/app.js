$(function() {

	// Small screens hamburger icon

	var linkToMenu  = $('#siteHeader-toggleMenu'),
			$menu       = $(linkToMenu.data('toggle')),
			targetElement = document.querySelector("#menu");

	linkToMenu.on('click', function() {
		$(this).toggleClass('is-active');

		if($menu.hasClass('is-open')) {
			$menu.removeClass('is-open');
			bodyScrollLock.enableBodyScroll(targetElement);
		}
		else {
			$menu.addClass('is-open');
			bodyScrollLock.disableBodyScroll(targetElement);
		}

		return false;
	});

	// Features
	//
	// Config features screenshot switching
	var $featuresLink         = $('.featuresList-item-link'),
			$featuresLinkFlex     = $('.featuresList-item-link-flex'),
			$screenshotsContainer = $('.featuresList-screenshots'),
			$featuresScreenshot   = $('.featuresList-screenshotOutter');

	// Set height of screenshots container, from the first slide at launch
	$('.featuresList-screenshot').load(function() {
		$(window).on('resize', function(){
			var firstScreenshotHeight = $featuresScreenshot.filter('.active').find('.featuresList-screenshot').height();
			$screenshotsContainer.height(firstScreenshotHeight + 'px');
		}).resize();
	});

	function featureLinkHover() {
		// Disable active state on the previously hovered element
		var previousActiveElement = $(this).parents('ul').find('li a.active')
		previousActiveElement.removeClass('active')

		// Make current element (the one hovered) active
		var currentElement = $(this)
		currentElement.addClass('active');

		// Get previous and current target value to toggle active state on the right
		// element of the right slideshow
		var previousTarget = previousActiveElement.data('target')
		var currentTarget = currentElement.data('target');

		// Toggle the active state on the right element of the right slideshow
		$('#feature-' + previousTarget).removeClass('active')
		$('#feature-' + currentTarget).addClass('active')

		return false;
	}

	function featureLinkPrevent(event) {
		return false;
	}

	$featuresLink.on('mouseover', featureLinkHover);
	$featuresLinkFlex.on('mouseover', featureLinkHover);

	// Prevent a click from moving the screen to the top of the page.
	$featuresLink.on('click', featureLinkPrevent);
	$featuresLinkFlex.on('click', featureLinkPrevent);


	// Smooth scrolling on click on anchor link
	//
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - $('.siteHeader').outerHeight()
				}, 500);
				return false;
			}
		}
	});


	// Lazy load images
	$("img").unveil();
});
