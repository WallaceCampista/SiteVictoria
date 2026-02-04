/**
 * Accessibility Module
 * Handles accessibility features and preferences
 */

class Accessibility {
    constructor() {
        this.init();
    }

    init() {
        this.respectMotionPreference();
        this.setupKeyboardNavigation();
    }

    /**
     * Reduce motion for users who prefer it
     */
    respectMotionPreference() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition', 'none');
            document.documentElement.style.setProperty('--transition-slow', 'none');
        }

        // Listen for changes
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.documentElement.style.setProperty('--transition', 'none');
                document.documentElement.style.setProperty('--transition-slow', 'none');
            } else {
                document.documentElement.style.removeProperty('--transition');
                document.documentElement.style.removeProperty('--transition-slow');
            }
        });
    }

    /**
     * Improve keyboard navigation
     */
    setupKeyboardNavigation() {
        // Add visible focus styles when using keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

export default Accessibility;
