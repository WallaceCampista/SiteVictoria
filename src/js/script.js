/**
 * Site Victoria - Psicóloga
 * Script Principal (Compatível sem módulos ES6)
 *
 * @author Victoria Aquino
 * @version 2.0.0
 */

(function() {
    'use strict';

    // ===== DOM Utilities =====
    const DOM = {
        get: (selector, parent = document) => parent.querySelector(selector),
        getAll: (selector, parent = document) => parent.querySelectorAll(selector),
        addClass: (el, ...classes) => el.classList.add(...classes),
        removeClass: (el, ...classes) => el.classList.remove(...classes),
        toggleClass: (el, className) => el.classList.toggle(className),
        hasClass: (el, className) => el.classList.contains(className),
        create: (tag, attrs = {}, content = '') => {
            const el = document.createElement(tag);
            Object.entries(attrs).forEach(([key, val]) => {
                if (key === 'className') el.className = val;
                else el.setAttribute(key, val);
            });
            if (content) el.innerHTML = content;
            return el;
        }
    };

    // ===== Elements Cache =====
    const elements = {
        loader: DOM.get('.loader'),
        header: DOM.get('.header'),
        navToggle: DOM.get('#nav-toggle'),
        navMenu: DOM.get('#nav-menu'),
        navLinks: DOM.getAll('.nav-link'),
        backToTop: DOM.get('#backToTop'),
        faqItems: DOM.getAll('.faq-item'),
        animateOnScroll: DOM.getAll('.animate-on-scroll'),
        heroAnimations: DOM.getAll('.animate-text:not(.typing-line), .animate-image'),
        particlesContainer: DOM.get('#particles'),
        heroNameLines: DOM.getAll('.typing-line'),
        spheres: DOM.getAll('.gradient-sphere'),
        serviceCards: DOM.getAll('.servico-card'),
        sections: DOM.getAll('section[id]')
    };

    // ===== Loader Module =====
    const Loader = {
        init() {
            if (!elements.loader) return;
            DOM.addClass(document.body, 'loading');
            setTimeout(() => this.hide(), 2500);
        },
        hide() {
            DOM.addClass(elements.loader, 'hidden');
            DOM.removeClass(document.body, 'loading');
            this.triggerHeroAnimations();
        },
        triggerHeroAnimations() {
            elements.heroAnimations.forEach((el, index) => {
                setTimeout(() => DOM.addClass(el, 'animate'), index * 150);
            });

            // Inicia o efeito de digitação quando os elementos do hero já começaram a aparecer.
            setTimeout(() => TypingHeroName.init(), 400);
        }
    };

    // ===== Hero Typing Module =====
    const TypingHeroName = {
        init() {
            if (!elements.heroNameLines.length) return;

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                elements.heroNameLines.forEach(line => {
                    line.textContent = line.dataset.text || line.textContent;
                    DOM.removeClass(line, 'is-typing');
                });
                return;
            }

            this.typeLinesSequentially(Array.from(elements.heroNameLines));
        },

        typeLinesSequentially(lines) {
            let lineIndex = 0;

            const typeNextLine = () => {
                if (lineIndex >= lines.length) return;

                const line = lines[lineIndex];
                const fullText = line.dataset.text || line.textContent.trim();
                let charIndex = 0;

                // Remove delays herdados do animate-text para a digitação ficar visível desde a 1a letra.
                line.classList.forEach(className => {
                    if (className.indexOf('delay-') === 0) {
                        line.classList.remove(className);
                    }
                });

                line.textContent = '';
                DOM.addClass(line, 'animate', 'is-typing');

                const typeNextChar = () => {
                    if (charIndex < fullText.length) {
                        line.textContent += fullText.charAt(charIndex);
                        charIndex += 1;
                        setTimeout(typeNextChar, 95);
                        return;
                    }

                    DOM.removeClass(line, 'is-typing');
                    lineIndex += 1;
                    setTimeout(typeNextLine, 150);
                };

                setTimeout(typeNextChar, 120);
            };

            typeNextLine();
        }
    };

    // ===== Particles Module =====
    const Particles = {
        init() {
            if (!elements.particlesContainer) return;

            for (let i = 0; i < 30; i++) {
                const particle = DOM.create('div', { className: 'particle' });
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 15}s`;
                particle.style.animationDuration = `${15 + Math.random() * 10}s`;
                const size = `${4 + Math.random() * 4}px`;
                particle.style.width = size;
                particle.style.height = size;
                elements.particlesContainer.appendChild(particle);
            }
        }
    };

    // ===== Navigation Module =====
    const Navigation = {
        init() {
            this.bindScrollEvents();
            this.bindMobileNav();
            this.bindSmoothScroll();
        },
        bindScrollEvents() {
            window.addEventListener('scroll', () => {
                this.updateHeader();
                this.highlightActiveSection();
            });
        },
        updateHeader() {
            if (window.pageYOffset > 50) {
                DOM.addClass(elements.header, 'scrolled');
            } else {
                DOM.removeClass(elements.header, 'scrolled');
            }
        },
        highlightActiveSection() {
            const scrollY = window.pageYOffset;

            elements.sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    elements.navLinks.forEach(link => {
                        DOM.removeClass(link, 'active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            DOM.addClass(link, 'active');
                        }
                    });
                }
            });
        },
        bindMobileNav() {
            if (!elements.navToggle || !elements.navMenu) return;

            elements.navToggle.addEventListener('click', () => {
                DOM.toggleClass(elements.navToggle, 'active');
                DOM.toggleClass(elements.navMenu, 'active');
            });

            elements.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    DOM.removeClass(elements.navToggle, 'active');
                    DOM.removeClass(elements.navMenu, 'active');
                });
            });
        },
        bindSmoothScroll() {
            DOM.getAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = DOM.get(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        }
    };

    // ===== Scroll Animations Module =====
    const ScrollAnimations = {
        init() {
            this.setupObserver();
            this.bindBackToTop();
            this.createScrollProgress();
            window.addEventListener('scroll', () => {
                this.updateBackToTop();
                this.updateParallax();
                this.updateScrollProgress();
            });
        },
        setupObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        DOM.addClass(entry.target, 'visible');
                        if (DOM.hasClass(entry.target, 'sobre-stats')) {
                            this.animateCounters();
                        }
                    }
                });
            }, { threshold: 0.1 });

            elements.animateOnScroll.forEach(el => observer.observe(el));
        },
        updateBackToTop() {
            if (!elements.backToTop) return;
            if (window.pageYOffset > 500) {
                DOM.addClass(elements.backToTop, 'visible');
            } else {
                DOM.removeClass(elements.backToTop, 'visible');
            }
        },
        bindBackToTop() {
            if (!elements.backToTop) return;
            elements.backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        },
        updateParallax() {
            const scrolled = window.pageYOffset;
            elements.spheres.forEach((sphere, index) => {
                const speed = 0.1 + (index * 0.05);
                sphere.style.transform = `translateY(${scrolled * speed}px)`;
            });
        },
        createScrollProgress() {
            const progressBar = DOM.create('div', { className: 'scroll-progress' });
            progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
            document.body.appendChild(progressBar);
        },
        updateScrollProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            const bar = DOM.get('.scroll-progress-bar');
            if (bar) bar.style.width = `${scrollPercent}%`;
        },
        animateCounters() {
            DOM.getAll('.stat-number').forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                if (!target) return;

                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const update = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target;
                    }
                };
                update();
            });
        }
    };

    // ===== FAQ Accordion Module =====
    const FaqAccordion = {
        init() {
            elements.faqItems.forEach(item => {
                const question = DOM.get('.faq-question', item);
                if (question) {
                    question.addEventListener('click', () => this.toggle(item));
                }
            });
        },
        toggle(clickedItem) {
            const isActive = DOM.hasClass(clickedItem, 'active');
            elements.faqItems.forEach(item => DOM.removeClass(item, 'active'));
            if (!isActive) DOM.addClass(clickedItem, 'active');
        }
    };

    // ===== Interactive Effects Module =====
    const InteractiveEffects = {
        init() {
            this.setupMagneticButtons();
            this.setupCardTilt();
            this.setupRippleEffect();
        },
        setupMagneticButtons() {
            DOM.getAll('.btn-primary, .btn-cta').forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translate(0, 0)';
                });
            });
        },
        setupCardTilt() {
            elements.serviceCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                });
            });
        },
        setupRippleEffect() {
            DOM.getAll('.btn').forEach(button => {
                button.addEventListener('click', function(e) {
                    const ripple = DOM.create('span', { className: 'ripple' });
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = `${size}px`;
                    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                });
            });
        }
    };

    // ===== Lazy Load Images Module =====
    const LazyLoad = {
        init() {
            const images = DOM.getAll('img[data-src]');
            if (images.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.addEventListener('load', () => DOM.addClass(img, 'loaded'));
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: '50px' });

            images.forEach(img => observer.observe(img));
        }
    };

    // ===== Accessibility Module =====
    const Accessibility = {
        init() {
            this.respectMotionPreference();
            this.setupKeyboardNavigation();
        },
        respectMotionPreference() {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

            if (prefersReducedMotion.matches) {
                document.documentElement.style.setProperty('--transition', 'none');
                document.documentElement.style.setProperty('--transition-slow', 'none');
            }
        },
        setupKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') DOM.addClass(document.body, 'keyboard-navigation');
            });
            document.addEventListener('mousedown', () => {
                DOM.removeClass(document.body, 'keyboard-navigation');
            });
        }
    };

    // ===== Gallery Carousel Module =====
    const GalleryCarousel = {
        track: null,
        slides: null,
        indicators: null,
        modal: null,
        modalImage: null,
        currentIndex: 0,
        totalSlides: 5,
        autoPlayInterval: null,
        images: [
            'image/use.jpeg',
            'image/use1.jpeg',
            'image/use2.jpeg',
            'image/use3.jpeg',
            'image/use4.jpg'
        ],

        init() {
            this.track = DOM.get('#carouselTrack');
            this.slides = DOM.getAll('.carousel-slide');
            this.indicators = DOM.getAll('.indicator');
            this.modal = DOM.get('#galleryModal');
            this.modalImage = DOM.get('#modalImage');

            if (!this.track) return;

            this.bindEvents();
            this.updateIndicators();
        },

        bindEvents() {
            // Botões de navegação do carrossel
            const prevBtn = DOM.get('#carouselPrev');
            const nextBtn = DOM.get('#carouselNext');

            if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
            if (nextBtn) nextBtn.addEventListener('click', () => this.next());

            // Indicadores
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goTo(index));
            });

            // Clique nas fotos para abrir modal
            this.slides.forEach((slide, index) => {
                slide.addEventListener('click', () => {
                    const realIndex = index % this.totalSlides;
                    this.openModal(realIndex);
                });
            });

            // Modal controls
            const modalClose = DOM.get('#modalClose');
            const modalPrev = DOM.get('#modalPrev');
            const modalNext = DOM.get('#modalNext');

            if (modalClose) modalClose.addEventListener('click', () => this.closeModal());
            if (modalPrev) modalPrev.addEventListener('click', () => this.modalPrev());
            if (modalNext) modalNext.addEventListener('click', () => this.modalNext());

            // Fechar modal com ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeModal();
                if (this.modal && DOM.hasClass(this.modal, 'active')) {
                    if (e.key === 'ArrowLeft') this.modalPrev();
                    if (e.key === 'ArrowRight') this.modalNext();
                }
            });

            // Fechar modal clicando fora
            if (this.modal) {
                this.modal.addEventListener('click', (e) => {
                    if (e.target === this.modal) this.closeModal();
                });
            }
        },

        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
            this.updateIndicators();
        },

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
            this.updateIndicators();
        },

        goTo(index) {
            this.currentIndex = index;
            this.updateIndicators();
        },

        updateIndicators() {
            this.indicators.forEach((indicator, index) => {
                if (index === this.currentIndex) {
                    DOM.addClass(indicator, 'active');
                } else {
                    DOM.removeClass(indicator, 'active');
                }
            });
        },

        openModal(index) {
            this.currentIndex = index;
            this.modalImage.src = this.images[index];
            DOM.addClass(this.modal, 'active');
            document.body.style.overflow = 'hidden';
        },

        closeModal() {
            DOM.removeClass(this.modal, 'active');
            document.body.style.overflow = '';
        },

        modalPrev() {
            this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
            this.modalImage.src = this.images[this.currentIndex];
        },

        modalNext() {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
            this.modalImage.src = this.images[this.currentIndex];
        }
    };

    // ===== Easter Egg Module =====
    const EasterEgg = {
        code: [],
        sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
        init() {
            document.addEventListener('keydown', (e) => this.checkCode(e));
        },
        checkCode(e) {
            this.code.push(e.key);
            this.code = this.code.slice(-10);

            if (this.code.join('') === this.sequence.join('')) {
                this.activate();
            }
        },
        activate() {
            document.body.style.animation = 'rainbow 2s ease infinite';
            const style = DOM.create('style', {}, `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `);
            document.head.appendChild(style);
            setTimeout(() => { document.body.style.animation = ''; }, 5000);
        }
    };

    // ===== Initialize Application =====
    function init() {
        // Initialize on DOM ready
        Accessibility.init();
        Navigation.init();
        Particles.init();
        ScrollAnimations.init();
        FaqAccordion.init();
        InteractiveEffects.init();
        LazyLoad.init();
        GalleryCarousel.init();
        EasterEgg.init();

        // Fallback para cenários sem loader ativo.
        if (!elements.loader) {
            TypingHeroName.init();
        }

        setTimeout(() => DOM.addClass(document.body, 'loaded'), 100);

        console.log('✨ Site Victoria Psicóloga initialized successfully!');
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Initialize loader on window load
    window.addEventListener('load', () => Loader.init());

})();
