/**
 * Main Application Entry Point
 * Initializes all modules and components
 *
 * @author Victoria Psicóloga
 * @version 2.0.0
 */

// Import utilities
import { DOM } from './utils/dom.js';
import Accessibility from './utils/accessibility.js';
import EasterEgg from './utils/easter-egg.js';

// Import components
import CustomCursor from './components/cursor.js';
import Loader from './components/loader.js';
import Navigation from './components/navigation.js';
import Particles from './components/particles.js';
import ScrollAnimations from './components/scroll-animations.js';
import FaqAccordion from './components/faq-accordion.js';
import InteractiveEffects from './components/interactive-effects.js';
import LazyLoadImages from './components/lazy-load.js';

/**
 * Application Class
 * Main controller that initializes all modules
 */
class App {
    constructor() {
        this.modules = {};
    }

    /**
     * Initialize all application modules
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bootstrap());
        } else {
            this.bootstrap();
        }

        // Initialize loader on window load
        window.addEventListener('load', () => {
            this.modules.loader?.init();
        });
    }

    /**
     * Bootstrap all modules
     */
    bootstrap() {
        // Utilities (initialize first)
        this.modules.accessibility = new Accessibility();

        // UI Components
        this.modules.loader = new Loader();
        this.modules.cursor = new CustomCursor();
        this.modules.navigation = new Navigation();
        this.modules.particles = new Particles();

        // Interactive features
        this.modules.scrollAnimations = new ScrollAnimations();
        this.modules.faqAccordion = new FaqAccordion();
        this.modules.interactiveEffects = new InteractiveEffects();
        this.modules.lazyLoad = new LazyLoadImages();

        // Fun stuff
        this.modules.easterEgg = new EasterEgg();

        // Add loaded class for CSS animations
        setTimeout(() => {
            DOM.addClass(document.body, 'loaded');
        }, 100);

        console.log('✨ Site Victoria Psicóloga initialized successfully!');
    }

    /**
     * Get a specific module
     * @param {string} name - Module name
     * @returns {Object} Module instance
     */
    getModule(name) {
        return this.modules[name];
    }
}

// Create and initialize the application
const app = new App();
app.init();

// Export for potential external use
export default app;
