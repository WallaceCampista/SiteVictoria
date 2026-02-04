/**
 * Loader Module
 * Handles page loading animation
 */

import { DOM } from '../utils/dom.js';

class Loader {
    constructor(options = {}) {
        this.loader = DOM.get('.loader');
        this.duration = options.duration || 2500;
        this.heroAnimations = DOM.getAll('.animate-text, .animate-image');
    }

    init() {
        if (!this.loader) return;

        DOM.addClass(document.body, 'loading');

        setTimeout(() => this.hide(), this.duration);
    }

    hide() {
        DOM.addClass(this.loader, 'hidden');
        DOM.removeClass(document.body, 'loading');

        this.triggerHeroAnimations();
    }

    triggerHeroAnimations() {
        this.heroAnimations.forEach((el, index) => {
            setTimeout(() => {
                DOM.addClass(el, 'animate');
            }, index * 150);
        });
    }
}

export default Loader;
