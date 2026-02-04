/**
 * FAQ Accordion Module
 * Handles FAQ expand/collapse functionality
 */

import { DOM } from '../utils/dom.js';

class FaqAccordion {
    constructor() {
        this.items = DOM.getAll('.faq-item');

        if (this.items.length > 0) {
            this.init();
        }
    }

    init() {
        this.items.forEach(item => {
            const question = DOM.get('.faq-question', item);

            if (question) {
                question.addEventListener('click', () => this.toggle(item));
            }
        });
    }

    toggle(clickedItem) {
        const isActive = DOM.hasClass(clickedItem, 'active');

        // Close all items
        this.items.forEach(item => DOM.removeClass(item, 'active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
            DOM.addClass(clickedItem, 'active');
        }
    }

    // Public method to open specific item
    open(index) {
        if (this.items[index]) {
            this.items.forEach(item => DOM.removeClass(item, 'active'));
            DOM.addClass(this.items[index], 'active');
        }
    }

    // Public method to close all items
    closeAll() {
        this.items.forEach(item => DOM.removeClass(item, 'active'));
    }
}

export default FaqAccordion;
