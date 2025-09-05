    document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.gallery-track');
            const items = document.querySelectorAll('.gallery-item');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            
            let isDown = false;
            let startX;
            let scrollLeft;
            
            // Mouse drag functionality
            track.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - track.offsetLeft;
                scrollLeft = track.scrollLeft;
                track.style.cursor = 'grabbing';
            });
            
            track.addEventListener('mouseleave', () => {
                isDown = false;
                track.style.cursor = 'grab';
            });
            
            track.addEventListener('mouseup', () => {
                isDown = false;
                track.style.cursor = 'grab';
            });
            
            track.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - track.offsetLeft;
                const walk = (x - startX) * 2;
                track.scrollLeft = scrollLeft - walk;
            });
            
            // Highlight effect on hover
            items.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    // Dim all images
                    items.forEach(img => {
                        img.style.filter = 'brightness(0.7)';
                        img.style.transform = 'scale(0.95)';
                    });
                    
                    // Highlight the hovered image
                    item.style.filter = 'brightness(1)';
                    item.style.transform = 'scale(1.05)';
                });
                
                item.addEventListener('mouseleave', () => {
                    // Reset all images
                    items.forEach(img => {
                        img.style.filter = 'brightness(0.7)';
                        img.style.transform = 'scale(0.95)';
                    });
                });
            });
            
            // Navigation buttons functionality
prevBtn.addEventListener('click', () => {
    // එක් අයිතමයක පළල සහ gap එක අනුව පසුපසට scroll කිරීම
    const itemWidth = track.querySelector('.gallery-item').offsetWidth;
    const gapWidth = parseFloat(getComputedStyle(track).gap);
    track.scrollBy({ left: -(itemWidth + gapWidth), behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
    // එක් අයිතමයක පළල සහ gap එක අනුව ඉදිරියට scroll කිරීම
    const itemWidth = track.querySelector('.gallery-item').offsetWidth;
    const gapWidth = parseFloat(getComputedStyle(track).gap);
    track.scrollBy({ left: itemWidth + gapWidth, behavior: 'smooth' });
});
            
            // Dot indicators functionality
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    // Remove active class from all dots
                    dots.forEach(d => d.classList.remove('active'));
                    
                    // Add active class to clicked dot
                    dot.classList.add('active');
                    
                    // Scroll to the corresponding section
                    track.scrollTo({ left: index * 1000, behavior: 'smooth' });
                });
            });
            
            // Update dot indicators on scroll
            track.addEventListener('scroll', () => {
                const scrollPos = track.scrollLeft;
                const activeIndex = Math.min(
                    Math.floor(scrollPos / 300), 
                    dots.length - 1
                );
                
                dots.forEach((dot, index) => {
                    if (index === activeIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            });
            
            // Touch support for mobile devices
            track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - track.offsetLeft;
                scrollLeft = track.scrollLeft;
            }, { passive: true });
            
            track.addEventListener('touchmove', (e) => {
                if (e.touches.length !== 1) return;
                const x = e.touches[0].pageX - track.offsetLeft;
                const walk = (x - startX) * 2;
                track.scrollLeft = scrollLeft - walk;
            }, { passive: true });
        });
            // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    let isDark = true;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        isDark = false;
    }

    themeToggle.addEventListener('click', () => {
        if (isDark) {
            body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
        isDark = !isDark;
    });

    // Sticky Navigation
    const stickyNav = document.getElementById('stickyNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
        }
    });

    // Scroll Down Button
    const scrollDown = document.getElementById('scrollDown');
    scrollDown.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Pricing Accordion
    const pricingHeaders = document.querySelectorAll('.pricing-header');
    pricingHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isActive = header.classList.contains('active');
            
            // Close all other accordions
            pricingHeaders.forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle current accordion
            if (!isActive) {
                header.classList.add('active');
                const content = header.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                header.classList.remove('active');
                header.nextElementSibling.style.maxHeight = null;
            }
        });
    });

    // Portfolio Card Lighting Effect
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // Open first pricing item by default
    if (pricingHeaders.length > 0) {
        pricingHeaders[0].click();
    }

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('#navLinks li a');

    // Hamburger icon එක click කළ විට මෙනුව විවෘත කිරීම/වැසීම
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    // මෙනුවේ ඇති ලින්ක් එකක් click කළ විට මෙනුව ස්වයංක්‍රීයව වැසීම
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    });