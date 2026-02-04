/**
 * Lazy Load Images Module
 * Handles lazy loading of images for better performance
 */

import { DOM } from '../utils/dom.js';

class LazyLoadImages {
    constructor() {
        this.images = DOM.getAll('img[data-src]');

        if (this.images.length > 0) {
            this.init();
        }
    }

    init() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.images.forEach(img => observer.observe(img));
    }

    loadImage(img) {
        const src = img.dataset.src;

        if (src) {
            img.src = src;
            img.addEventListener('load', () => {
                DOM.addClass(img, 'loaded');
            });
        }
    }

    /**
     * Preload specific images
     * @param {string[]} urls - Array of image URLs to preload
     */
    static preload(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
}

export default LazyLoadImages;
