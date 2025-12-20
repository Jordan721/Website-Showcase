$(document).ready(function () {
	// ===== SMOOTH SCROLLING =====
	$(".navbar a, footer a[href='#myPage'], a[href^='#']").on('click', function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top - 70
			}, 800, function () {
				// Add hash to URL after scrolling (optional)
				// window.location.hash = hash;
			});
		}
	});

	// ===== NAVBAR SCROLL EFFECT =====
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.navbar').addClass('scrolled');
		} else {
			$('.navbar').removeClass('scrolled');
		}
	});

	// ===== ACTIVE NAV LINK HIGHLIGHTING =====
	$(window).scroll(function () {
		var scrollPos = $(window).scrollTop() + 100;

		$('section').each(function () {
			var currentSection = $(this);
			var sectionTop = currentSection.offset().top;
			var sectionBottom = sectionTop + currentSection.outerHeight();
			var sectionId = currentSection.attr('id');

			if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
				$('.navbar-nav li').removeClass('active');
				$('.navbar-nav a[href="#' + sectionId + '"]').parent().addClass('active');
			}
		});
	});

	// ===== SCROLL ANIMATIONS =====
	function checkVisibility() {
		$('.slide-in').each(function () {
			var elementTop = $(this).offset().top;
			var elementBottom = elementTop + $(this).outerHeight();
			var viewportTop = $(window).scrollTop();
			var viewportBottom = viewportTop + $(window).height();

			if (elementBottom > viewportTop && elementTop < viewportBottom) {
				$(this).css({
					'opacity': '1',
					'transform': 'translateX(0)'
				});
			}
		});

		$('.fade-in').each(function () {
			var elementTop = $(this).offset().top;
			var elementBottom = elementTop + $(this).outerHeight();
			var viewportTop = $(window).scrollTop();
			var viewportBottom = viewportTop + $(window).height();

			if (elementBottom > viewportTop && elementTop < viewportBottom) {
				$(this).css({
					'opacity': '1',
					'transform': 'translateY(0)'
				});
			}
		});
	}

	// Initialize animations
	checkVisibility();
	$(window).scroll(checkVisibility);

	// ===== SCROLL TO TOP BUTTON =====
	var scrollToTopBtn = $('#scrollToTop');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			scrollToTopBtn.addClass('visible');
		} else {
			scrollToTopBtn.removeClass('visible');
		}
	});

	scrollToTopBtn.click(function () {
		$('html, body').animate({ scrollTop: 0 }, 600);
		return false;
	});

	// ===== MOBILE NAV AUTO-CLOSE =====
	$('.navbar-nav a').click(function () {
		if ($('.navbar-toggle').is(':visible')) {
			$('.navbar-collapse').collapse('hide');
		}
	});

	// ===== FORM VALIDATION & ENHANCEMENT =====
	$('.contact-form').submit(function (e) {
		var isValid = true;
		var form = $(this);

		// Clear previous error messages
		form.find('.error-message').remove();

		// Validate required fields
		form.find('[required]').each(function () {
			var field = $(this);
			if (field.val().trim() === '') {
				isValid = false;
				field.css('border-color', '#d91e48');

				// Add error message if not already present
				if (field.next('.error-message').length === 0) {
					field.after('<span class="error-message" style="color: #d91e48; font-size: 0.85rem; margin-top: 5px;">This field is required</span>');
				}
			} else {
				field.css('border-color', '#e0e0e0');
			}
		});

		// Email validation
		var emailField = form.find('input[type="email"]');
		if (emailField.length && emailField.val()) {
			var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailPattern.test(emailField.val())) {
				isValid = false;
				emailField.css('border-color', '#d91e48');
				if (emailField.next('.error-message').length === 0) {
					emailField.after('<span class="error-message" style="color: #d91e48; font-size: 0.85rem; margin-top: 5px;">Please enter a valid email address</span>');
				}
			}
		}

		if (!isValid) {
			e.preventDefault();

			// Scroll to first error
			var firstError = form.find('[required]').filter(function() {
				return $(this).val().trim() === '';
			}).first();

			if (firstError.length) {
				$('html, body').animate({
					scrollTop: firstError.offset().top - 150
				}, 500);
			}
		}
	});

	// Remove error styling on input
	$('.contact-form input, .contact-form textarea').on('input', function () {
		$(this).css('border-color', '#e0e0e0');
		$(this).next('.error-message').remove();
	});

	// ===== INTERACTIVE HOVER EFFECTS =====
	// Add ripple effect to buttons
	$('.btn').click(function (e) {
		var ripple = $('<span class="ripple"></span>');
		$(this).append(ripple);

		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;

		ripple.css({
			left: x,
			top: y
		});

		setTimeout(function () {
			ripple.remove();
		}, 600);
	});

	// ===== COUNTER ANIMATION (if you want to add stats later) =====
	function animateCounter(element, target, duration) {
		var start = 0;
		var increment = target / (duration / 16);
		var current = start;

		var timer = setInterval(function () {
			current += increment;
			if (current >= target) {
				element.text(Math.floor(target));
				clearInterval(timer);
			} else {
				element.text(Math.floor(current));
			}
		}, 16);
	}

	// ===== VIDEO PLAY/PAUSE ENHANCEMENT =====
	$('.hero-video, video').on('play', function () {
		$(this).closest('.video-wrapper').addClass('playing');
	});

	$('.hero-video, video').on('pause', function () {
		$(this).closest('.video-wrapper').removeClass('playing');
	});

	// ===== IMAGE LAZY LOADING ENHANCEMENT =====
	$('img').on('load', function () {
		$(this).addClass('loaded');
	});

	// ===== ACCESSIBILITY ENHANCEMENTS =====
	// Add keyboard navigation support
	$('.navbar-nav a, .btn, .social-btn').keypress(function (e) {
		if (e.which === 13) { // Enter key
			$(this).click();
		}
	});

	// ===== PARALLAX EFFECT (subtle) =====
	$(window).scroll(function () {
		var scrolled = $(window).scrollTop();
		$('.hero-section::before').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
	});

	// ===== CUSTOM CURSOR EFFECT FOR CLICKABLE ELEMENTS =====
	$('.film-image-wrapper, .news-image-wrapper, .team-member').hover(
		function () {
			$(this).css('cursor', 'pointer');
		},
		function () {
			$(this).css('cursor', 'default');
		}
	);

	// ===== CONSOLE MESSAGE =====
	console.log('%c🎬 Run Like A G.U.R.L ', 'background: linear-gradient(135deg, #ff4d8f 0%, #d91e48 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
	console.log('%cWebsite redesigned with modern interactive features!', 'color: #d91e48; font-size: 14px;');

	// ===== NAVBAR COLLAPSE ON CLICK OUTSIDE =====
	$(document).click(function (e) {
		if (!$(e.target).closest('.navbar').length) {
			$('.navbar-collapse').collapse('hide');
		}
	});

	// ===== SMOOTH ENTRANCE ANIMATIONS ON LOAD =====
	setTimeout(function () {
		$('body').addClass('loaded');
	}, 100);

	// ===== TEAM MEMBER CARD CLICK ENHANCEMENT =====
	$('.team-member').click(function (e) {
		// Only toggle if not clicking on a link
		if (!$(e.target).is('a')) {
			$(this).toggleClass('expanded');
		}
	});

	// ===== SOCIAL SHARE BUTTON (if needed) =====
	function shareOnTwitter(text, url) {
		var twitterUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
		window.open(twitterUrl, '_blank', 'width=550,height=420');
	}

	// ===== INTERSECTION OBSERVER FOR BETTER PERFORMANCE =====
	if ('IntersectionObserver' in window) {
		var observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -100px 0px'
		};

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					$(entry.target).addClass('animate-in');
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		// Observe all elements that should animate
		$('.content-card, .team-member, .payment-card').each(function () {
			observer.observe(this);
		});
	}

	// ===== COPY TO CLIPBOARD FUNCTIONALITY =====
	function copyToClipboard(text) {
		var tempInput = $('<input>');
		$('body').append(tempInput);
		tempInput.val(text).select();
		document.execCommand('copy');
		tempInput.remove();
	}

	// ===== EASTER EGG: KONAMI CODE =====
	var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
	var konamiIndex = 0;

	$(document).keydown(function (e) {
		if (e.keyCode === konamiCode[konamiIndex]) {
			konamiIndex++;
			if (konamiIndex === konamiCode.length) {
				// Easter egg activated!
				$('body').addClass('rainbow-mode');
				setTimeout(function () {
					$('body').removeClass('rainbow-mode');
				}, 5000);
				konamiIndex = 0;
			}
		} else {
			konamiIndex = 0;
		}
	});

	// ===== PERFORMANCE: DEBOUNCE SCROLL EVENTS =====
	function debounce(func, wait) {
		var timeout;
		return function () {
			var context = this, args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				func.apply(context, args);
			}, wait);
		};
	}

	// Apply debouncing to scroll events
	$(window).on('scroll', debounce(function () {
		checkVisibility();
	}, 10));

	// ===== PRELOAD CRITICAL IMAGES =====
	var criticalImages = [
		'Pics/film_o.jpg',
		'Pics/MELANIE-ORAM.png',
		'Pics/ANDRETTA.png',
		'Pics/tracy-alexander1111.png'
	];

	criticalImages.forEach(function (src) {
		var img = new Image();
		img.src = src;
	});

	// ===== PROJECT INFO MODAL =====
	var modal = $('#projectInfoModal');
	var btn = $('#projectInfoBtn');
	var closeBtn = $('.close-modal');

	// Open modal
	btn.click(function () {
		modal.addClass('show');
		$('body').css('overflow', 'hidden'); // Prevent background scrolling
	});

	// Close modal when clicking X
	closeBtn.click(function () {
		modal.removeClass('show');
		$('body').css('overflow', 'auto');
	});

	// Close modal when clicking outside of it
	$(window).click(function (event) {
		if ($(event.target).is(modal)) {
			modal.removeClass('show');
			$('body').css('overflow', 'auto');
		}
	});

	// Close modal with ESC key
	$(document).keydown(function (e) {
		if (e.key === 'Escape' && modal.hasClass('show')) {
			modal.removeClass('show');
			$('body').css('overflow', 'auto');
		}
	});
});

// ===== ADDITIONAL CSS FOR RIPPLE EFFECT =====
// Add this to support the ripple effect
var rippleStyle = $('<style>.ripple { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.5); width: 20px; height: 20px; animation: ripple-animation 0.6s ease-out; pointer-events: none; } @keyframes ripple-animation { to { transform: scale(20); opacity: 0; } }</style>');
$('head').append(rippleStyle);
