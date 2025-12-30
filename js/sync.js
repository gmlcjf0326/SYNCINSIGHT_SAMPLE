/**
 * SYNC INSIGHT - Interactive JavaScript
 * Animations and interactions based on VODA design
 */

(function() {
	'use strict';

	// Initialize when DOM is ready
	document.addEventListener('DOMContentLoaded', function() {
		initScrollAnimations();
		initSmoothScroll();
		initHeaderBehavior();
		initQuickMenu();
	});

	/**
	 * Initialize GSAP ScrollTrigger animations
	 */
	function initScrollAnimations() {
		// Check if GSAP and ScrollTrigger are loaded
		if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
			console.warn('GSAP or ScrollTrigger not loaded');
			return;
		}

		console.log('GSAP and ScrollTrigger loaded successfully');

		// Register ScrollTrigger plugin
		gsap.registerPlugin(ScrollTrigger);

		// Animate section containers (text and images together)
		const sectionElements = document.querySelectorAll('.solution-section[data-mxds-motion="motion"]');
		console.log('Found section elements:', sectionElements.length);

		sectionElements.forEach((element, index) => {
			gsap.from(element, {
				y: 20,
				opacity: 0,
				duration: 0.4,
				delay: index * 0.03,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: element,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		});

		// Animate other elements with data-mxds-motion="motion" (excluding sections)
		const motionElements = document.querySelectorAll('[data-mxds-motion="motion"]:not(.solution-section)');
		console.log('Found motion elements:', motionElements.length);

		motionElements.forEach((element, index) => {
			gsap.from(element, {
				y: 20,
				opacity: 0,
				duration: 0.4,
				delay: index * 0.03,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: element,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		});

		// Animate solution key items with stagger (excluding icon section)
		const keyItems = document.querySelectorAll('.solution-key:not(.solution-key-icons) .solution-key-item');
		if (keyItems.length > 0) {
			gsap.from(keyItems, {
				y: 20,
				opacity: 0,
				duration: 0.4,
				stagger: 0.08,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.solution-key:not(.solution-key-icons)',
					start: 'top 80%',
					toggleActions: 'play none none none'
				}
			});
		}

		// Animate benefit items
		const benefitItems = document.querySelectorAll('.benefit-item');
		console.log('Found benefit items:', benefitItems.length);
		if (benefitItems.length > 0) {
			gsap.from(benefitItems, {
				y: 20,
				opacity: 0,
				duration: 0.4,
				stagger: 0.06,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: '.benefits-grid',
					start: 'top 90%',
					toggleActions: 'play none none none',
					markers: false,
					onEnter: () => console.log('Benefits animation triggered!')
				}
			});
		}

		// Parallax effect for images
		const images = document.querySelectorAll('.solution-visual img, .solution-function-img img, .solution-problem img');
		images.forEach(img => {
			gsap.to(img, {
				y: -20,
				ease: 'none',
				scrollTrigger: {
					trigger: img.parentElement,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1
				}
			});
		});
	}

	/**
	 * Smooth scroll to anchor links
	 */
	function initSmoothScroll() {
		const links = document.querySelectorAll('a[href^="#"]');

		links.forEach(link => {
			link.addEventListener('click', function(e) {
				const href = this.getAttribute('href');

				// Only handle hash links, not just "#"
				if (href === '#' || href === '#top') {
					e.preventDefault();
					window.scrollTo({
						top: 0,
						behavior: 'smooth'
					});
					return;
				}

				const target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					const headerHeight = document.querySelector('.header').offsetHeight;
					const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth'
					});
				}
			});
		});
	}

	/**
	 * Header scroll behavior
	 */
	function initHeaderBehavior() {
		const header = document.querySelector('.header');
		if (!header) return;

		let lastScroll = 0;

		window.addEventListener('scroll', function() {
			const currentScroll = window.pageYOffset;

			// Add shadow on scroll
			if (currentScroll > 10) {
				header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
			} else {
				header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
			}

			lastScroll = currentScroll;
		});
	}

	/**
	 * Quick menu (aside) interactions
	 */
	function initQuickMenu() {
		const aside = document.querySelector('.aside');
		if (!aside) return;

		// Show/hide based on scroll position
		window.addEventListener('scroll', function() {
			const scrollPosition = window.pageYOffset;

			if (scrollPosition > 300) {
				aside.style.opacity = '1';
				aside.style.visibility = 'visible';
			} else {
				aside.style.opacity = '0';
				aside.style.visibility = 'hidden';
			}
		});

		// Top button functionality
		const topButton = aside.querySelector('.aside-link[href="#"]');
		if (topButton) {
			topButton.addEventListener('click', function(e) {
				e.preventDefault();
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			});
		}

		// Toggle button (if needed in mobile)
		const toggleButton = aside.querySelector('.aside-toggle');
		if (toggleButton) {
			toggleButton.addEventListener('click', function() {
				const linkList = aside.querySelector('.aside-link-list');
				if (linkList) {
					linkList.style.display = linkList.style.display === 'none' ? 'flex' : 'none';
				}
			});
		}
	}

	/**
	 * Button hover effects
	 */
	document.querySelectorAll('.mxds-button, .aside-link').forEach(button => {
		button.addEventListener('mouseenter', function() {
			if (typeof gsap !== 'undefined') {
				gsap.to(this, {
					scale: 1.05,
					duration: 0.3,
					ease: 'power2.out'
				});
			}
		});

		button.addEventListener('mouseleave', function() {
			if (typeof gsap !== 'undefined') {
				gsap.to(this, {
					scale: 1,
					duration: 0.3,
					ease: 'power2.out'
				});
			}
		});
	});

	/**
	 * Key feature cards hover animation (excluding icon section)
	 */
	document.querySelectorAll('.solution-key:not(.solution-key-icons) .solution-key-item, .benefit-item').forEach(card => {
		card.addEventListener('mouseenter', function() {
			if (typeof gsap !== 'undefined') {
				gsap.to(this, {
					y: -8,
					duration: 0.3,
					ease: 'power2.out'
				});
			}
		});

		card.addEventListener('mouseleave', function() {
			if (typeof gsap !== 'undefined') {
				gsap.to(this, {
					y: 0,
					duration: 0.3,
					ease: 'power2.out'
				});
			}
		});
	});

	/**
	 * Intersection Observer for elements (fallback if GSAP not loaded)
	 */
	if (typeof gsap === 'undefined') {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('on');
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: 0.1,
			rootMargin: '0px 0px -100px 0px'
		});

		document.querySelectorAll('[data-mxds-motion="motion"]').forEach(el => {
			observer.observe(el);
		});
	}

	/**
	 * Initialize aside quick menu visibility
	 */
	function initAsideVisibility() {
		const aside = document.querySelector('.aside');
		if (aside) {
			aside.style.opacity = '0';
			aside.style.visibility = 'hidden';
			aside.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
		}
	}

	initAsideVisibility();

	/**
	 * Mobile menu toggle (if header menu is hidden on mobile)
	 */
	const mobileMenuButton = document.querySelector('.header-mobile-toggle');
	const headerMenu = document.querySelector('.header-menu');

	if (mobileMenuButton && headerMenu) {
		mobileMenuButton.addEventListener('click', function() {
			headerMenu.classList.toggle('active');
		});
	}

	/**
	 * Lazy load images for better performance
	 */
	if ('IntersectionObserver' in window) {
		const imageObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target;
					if (img.dataset.src) {
						img.src = img.dataset.src;
						img.removeAttribute('data-src');
					}
					imageObserver.unobserve(img);
				}
			});
		});

		document.querySelectorAll('img[data-src]').forEach(img => {
			imageObserver.observe(img);
		});
	}

	/**
	 * Console welcome message
	 */
	console.log('%c SYNC INSIGHT ', 'background: #7c3aed; color: white; font-size: 16px; padding: 8px 16px; border-radius: 4px;');
	console.log('%c 지식 기반 AI 생성·관리 플랫폼 ', 'color: #7c3aed; font-size: 14px;');

})();
