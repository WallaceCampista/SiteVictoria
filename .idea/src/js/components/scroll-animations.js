/**
 * Scroll Animations Module
 * Handles scroll-based animations and effects
 */

import { DOM } from '../utils/dom.js';

class ScrollAnimations {
    constructor() {
        this.animatedElements = DOM.getAll('.animate-on-scroll');
        this.backToTop = DOM.get('#backToTop');
        this.spheres = DOM.getAll('.gradient-sphere');

        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.bindScrollEvents();
        this.createScrollProgress();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    DOM.addClass(entry.target, 'visible');

                    // Trigger counter animation for stats
                    if (DOM.hasClass(entry.target, 'sobre-stats')) {
                        this.animateCounters();
                    }
                }
            });
        }, options);

        this.animatedElements.forEach(el => observer.observe(el));
    }

    bindScrollEvents() {
        window.addEventListener('scroll', () => {
            this.updateBackToTop();
            this.updateParallax();
            this.updateScrollProgress();
        });

        if (this.backToTop) {
            this.backToTop.addEventListener('click', () => this.scrollToTop());
        }
    }

    updateBackToTop() {
        if (!this.backToTop) return;

        if (window.pageYOffset > 500) {
            DOM.addClass(this.backToTop, 'visible');
        } else {
            DOM.removeClass(this.backToTop, 'visible');
        }
    }

    updateParallax() {
        const scrolled = window.pageYOffset;

        this.spheres.forEach((sphere, index) => {
            const speed = 0.1 + (index * 0.05);
            sphere.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    createScrollProgress() {
        const progressBar = DOM.create('div', { className: 'scroll-progress' });
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);
    }

    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        const progressBar = DOM.get('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    }

    animateCounters() {
        const counters = DOM.getAll('.stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (!target) return;

            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

export default ScrollAnimations;
