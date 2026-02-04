/**
 * Interactive Effects Module
 * Handles button effects, card tilts, and other interactive animations
 */

import { DOM } from '../utils/dom.js';

class InteractiveEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupMagneticButtons();
        this.setupCardTilt();
        this.setupRippleEffect();
    }

    /**
     * Magnetic effect on primary buttons
     */
    setupMagneticButtons() {
        const buttons = DOM.getAll('.btn-primary, .btn-cta');

        buttons.forEach(btn => {
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
    }

    /**
     * 3D tilt effect on service cards
     */
    setupCardTilt() {
        const cards = DOM.getAll('.servico-card');

        cards.forEach(card => {
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
    }

    /**
     * Ripple effect on button click
     */
    setupRippleEffect() {
        DOM.getAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e, button));
        });
    }

    createRipple(e, button) {
        const ripple = DOM.create('span', { className: 'ripple' });

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
}

export default InteractiveEffects;
