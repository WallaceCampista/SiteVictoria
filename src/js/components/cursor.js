/**
 * Custom Cursor Module
 * Handles custom cursor effects for desktop
 */

import { DOM } from '../utils/dom.js';

class CustomCursor {
    constructor() {
        this.cursor = DOM.get('.cursor');
        this.follower = DOM.get('.cursor-follower');
        this.isDesktop = window.innerWidth > 768;

        if (this.isDesktop && this.cursor && this.follower) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
        this.setupHoverEffects();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    onMouseMove(e) {
        // Main cursor follows immediately
        this.cursor.style.left = `${e.clientX}px`;
        this.cursor.style.top = `${e.clientY}px`;

        // Follower has slight delay
        setTimeout(() => {
            this.follower.style.left = `${e.clientX}px`;
            this.follower.style.top = `${e.clientY}px`;
        }, 100);
    }

    setupHoverEffects() {
        const hoverElements = DOM.getAll('a, button, .servico-card, .faq-question, .interesse-card');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.onHoverEnter());
            el.addEventListener('mouseleave', () => this.onHoverLeave());
        });
    }

    onHoverEnter() {
        DOM.addClass(this.cursor, 'hover');
        DOM.addClass(this.follower, 'hover');
    }

    onHoverLeave() {
        DOM.removeClass(this.cursor, 'hover');
        DOM.removeClass(this.follower, 'hover');
    }
}

export default CustomCursor;
