/**
 * Easter Egg Module
 * Fun hidden feature - Konami Code
 */

class EasterEgg {
    constructor() {
        this.code = [];
        this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.checkCode(e));
    }

    checkCode(e) {
        this.code.push(e.key);
        this.code = this.code.slice(-10);

        if (this.code.join('') === this.sequence.join('')) {
            this.activate();
        }
    }

    activate() {
        document.body.style.animation = 'rainbow 2s ease infinite';

        const rainbowStyles = document.createElement('style');
        rainbowStyles.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyles);

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
}

export default EasterEgg;
