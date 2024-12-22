// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Animate the year text
    gsap.from('.year-text', {
        duration: 1.5,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
    });

    // Animate the vision text lines sequentially
    const visionLines = document.querySelectorAll('.vision-text div');
    visionLines.forEach((line, index) => {
        gsap.from(line, {
            duration: 1,
            x: 100,
            opacity: 0,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Animate the diagonal shapes
    gsap.from('.diagonal-shape', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out'
    });

    // Animate the center logo
    gsap.from('.logo-container', {
        duration: 2,
        scale: 0.5,
        opacity: 0,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.5
    });

    // Parallax effect for diagonal shapes
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.diagonal-shape');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        shapes.forEach((shape, index) => {
            const depth = index + 1;
            const moveX = mouseX * 50 * depth;
            const moveY = mouseY * 30 * depth;
            
            gsap.to(shape, {
                duration: 1,
                x: moveX,
                y: moveY,
                ease: 'power1.out'
            });
        });
    });

    // Initialize Swiper with custom navigation
    const heroSwiper = new Swiper('.hero-carousel', {
        direction: 'horizontal',
        loop: true,
        effect: 'fade',
        speed: 1000,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            }
        },
        on: {
            slideChange: function () {
                // Animate content for current slide
                const activeSlide = this.slides[this.activeIndex];
                animateSlideContent(activeSlide);
            }
        }
    });

    // Function to animate slide content
    function animateSlideContent(slide) {
        const title = slide.querySelector('h1');
        const subtitle = slide.querySelector('h6');
        const description = slide.querySelector('p');
        const button = slide.querySelector('button');

        gsap.timeline()
            .from(subtitle, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            })
            .from(title, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4')
            .from(description, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6')
            .from(button, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6');
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        });
    });

    // Navigation highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 180) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu handling
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.querySelector('#mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');

            // Animate mobile menu
            if (!mobileMenu.classList.contains('hidden')) {
                gsap.from(mobileMenu.children, {
                    y: -20,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            }
        });
    }
}); 