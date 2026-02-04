/**
 * DOM Utilities Module
 * Helper functions for DOM manipulation
 */

export const DOM = {
    /**
     * Get single element by selector
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (defaults to document)
     * @returns {Element|null}
     */
    get(selector, parent = document) {
        return parent.querySelector(selector);
    },

    /**
     * Get multiple elements by selector
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (defaults to document)
     * @returns {NodeList}
     */
    getAll(selector, parent = document) {
        return parent.querySelectorAll(selector);
    },

    /**
     * Add event listener to element(s)
     * @param {Element|NodeList|string} target - Element, NodeList, or selector
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     */
    on(target, event, handler, options = {}) {
        const elements = typeof target === 'string'
            ? this.getAll(target)
            : target instanceof NodeList
                ? target
                : [target];

        elements.forEach(el => el.addEventListener(event, handler, options));
    },

    /**
     * Create element with attributes and content
     * @param {string} tag - HTML tag name
     * @param {Object} attributes - Element attributes
     * @param {string|Element} content - Inner content
     * @returns {Element}
     */
    create(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);

        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else {
                element.setAttribute(key, value);
            }
        });

        if (content) {
            if (typeof content === 'string') {
                element.innerHTML = content;
            } else {
                element.appendChild(content);
            }
        }

        return element;
    },

    /**
     * Add class(es) to element
     * @param {Element} element
     * @param {...string} classes
     */
    addClass(element, ...classes) {
        element.classList.add(...classes);
    },

    /**
     * Remove class(es) from element
     * @param {Element} element
     * @param {...string} classes
     */
    removeClass(element, ...classes) {
        element.classList.remove(...classes);
    },

    /**
     * Toggle class on element
     * @param {Element} element
     * @param {string} className
     */
    toggleClass(element, className) {
        element.classList.toggle(className);
    },

    /**
     * Check if element has class
     * @param {Element} element
     * @param {string} className
     * @returns {boolean}
     */
    hasClass(element, className) {
        return element.classList.contains(className);
    }
};

export default DOM;
