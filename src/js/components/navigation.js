/**
 * Navigation Module
 * Handles header scroll effects and mobile navigation
 */

import { DOM } from '../utils/dom.js';

class Navigation {
    constructor() {
        this.header = DOM.get('.header');
        this.navToggle = DOM.get('#nav-toggle');
        this.navMenu = DOM.get('#nav-menu');
        this.navLinks = DOM.getAll('.nav-link');
        this.sections = DOM.getAll('section[id]');

        this.init();
    }

    init() {
        this.bindScrollEvents();
        this.bindMobileNavigation();
        this.bindSmoothScroll();
    }

    bindScrollEvents() {
        window.addEventListener('scroll', () => {
            this.updateHeaderOnScroll();
            this.highlightActiveSection();
        });
    }

    updateHeaderOnScroll() {
        const scrollY = window.pageYOffset;

        if (scrollY > 50) {
            DOM.addClass(this.header, 'scrolled');
        } else {
            DOM.removeClass(this.header, 'scrolled');
        }
    }

    highlightActiveSection() {
        const scrollY = window.pageYOffset;

        this.sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    DOM.removeClass(link, 'active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        DOM.addClass(link, 'active');
                    }
                });
            }
        });
    }

    bindMobileNavigation() {
        if (!this.navToggle || !this.navMenu) return;

        this.navToggle.addEventListener('click', () => {
            DOM.toggleClass(this.navToggle, 'active');
            DOM.toggleClass(this.navMenu, 'active');
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                DOM.removeClass(this.navToggle, 'active');
                DOM.removeClass(this.navMenu, 'active');
            });
        });
    }

    bindSmoothScroll() {
        DOM.getAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = DOM.get(anchor.getAttribute('href'));

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

export default Navigation;
