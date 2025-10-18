/**
 * Advanced Loading Screen Effects
 * Creates dynamic particle system and 3D book animations
 */

class LoadingEffects {
    constructor() {
        this.particles = [];
        this.isActive = false;
        this.animationFrame = null;
    }

    init() {
        this.isActive = true;
        this.createParticleSystem();
        this.animateBook();
        this.startParticleAnimation();
    }

    createParticleSystem() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        // Create floating code snippets
        const codeSnippets = [
            'const',
            'function',
            'async',
            'await',
            'return',
            '{code}',
            '< />',
            'Web3',
            'React'
        ];

        // Create additional dynamic particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Randomly choose between dot particle or code snippet
            if (Math.random() < 0.3 && codeSnippets.length > 0) {
                particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                particle.style.fontSize = '10px';
                particle.style.color = '#00ff88';
                particle.style.fontFamily = 'Space Mono, monospace';
                particle.style.background = 'none';
                particle.style.width = 'auto';
                particle.style.height = 'auto';
                particle.style.borderRadius = '0';
                particle.style.padding = '2px 4px';
                particle.style.border = '1px solid rgba(0, 255, 136, 0.3)';
                particle.style.borderRadius = '3px';
            }
            
            // Position and animation
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            particlesContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }

    animateBook() {
        const book = document.querySelector('.book');
        if (!book) return;

        let rotationY = 0;
        const animateBookRotation = () => {
            if (!this.isActive) return;
            
            rotationY += 0.5;
            book.style.transform = `rotateY(${Math.sin(rotationY * 0.01) * 15}deg)`;
            
            this.animationFrame = requestAnimationFrame(animateBookRotation);
        };
        
        animateBookRotation();
    }

    startParticleAnimation() {
        // Add glow effect to poetry words
        const poetryWords = document.querySelectorAll('.poetry-word');
        poetryWords.forEach((word, index) => {
            word.style.animationDelay = (index * 0.8) + 's';
            word.style.textShadow = `0 0 20px rgba(255, 107, 53, 0.5)`;
        });
    }

    destroy() {
        this.isActive = false;
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Clean up particles
        this.particles.forEach(particle => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        
        this.particles = [];
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        const effects = new LoadingEffects();
        effects.init();
        
        // Clean up when loading screen is hidden
        setTimeout(() => {
            effects.destroy();
        }, 5000);
    }
});

// Export for use in main script
window.LoadingEffects = LoadingEffects;