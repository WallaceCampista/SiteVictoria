/**
 * Particles Module
 * Creates floating particle effects
 */

import { DOM } from '../utils/dom.js';

class Particles {
    constructor(options = {}) {
        this.container = DOM.get('#particles');
        this.count = options.count || 30;

        if (this.container) {
            this.create();
        }
    }

    create() {
        for (let i = 0; i < this.count; i++) {
            const particle = this.createParticle();
            this.container.appendChild(particle);
        }
    }

    createParticle() {
        const particle = DOM.create('div', { className: 'particle' });

        // Random positioning
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;

        // Random size
        const size = `${4 + Math.random() * 4}px`;
        particle.style.width = size;
        particle.style.height = size;

        return particle;
    }
}

export default Particles;
