/* ═══════════════════════════════════════════════════════════════════════════
   HACKATHON UGEL CHICLAYO 2025 - JAVASCRIPT
   RECICLA-IA: Guardianes Muchik de la Economía Circular
   I.E. Nº 10923 "Fanny Abanto Calle" | Innova-Fanny Tech
   ═══════════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════
// PARTÍCULAS DE FONDO ANIMADAS
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initScrollAnimations();
    initHoverEffects();
});

// Crear partículas flotantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    const colors = ['#40b5ad', '#d4a84b', '#00d4ff', '#00ff88', '#8b5cf6'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Color aleatorio
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Duración de animación aleatoria
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMACIONES AL HACER SCROLL
// ═══════════════════════════════════════════════════════════════════════════

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animación especial para las tarjetas de componentes
                if (entry.target.classList.contains('componente-card')) {
                    entry.target.style.animationDelay = '0.1s';
                }
            }
        });
    }, observerOptions);

    // Observar elementos
    const animatedElements = document.querySelectorAll(
        '.proyecto-card, .equipo-card, .problema-content, .solucion-intro, .componente-card, .link-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Clase CSS para animación de entrada
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// ═══════════════════════════════════════════════════════════════════════════
// EFECTOS HOVER AVANZADOS
// ═══════════════════════════════════════════════════════════════════════════

function initHoverEffects() {
    // Efecto de brillo en los logos
    const logos = document.querySelectorAll('.logo-img');
    logos.forEach(logo => {
        logo.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            logo.style.filter = `drop-shadow(${(x - rect.width/2) / 10}px ${(y - rect.height/2) / 10}px 30px rgba(212, 168, 75, 0.8))`;
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.filter = 'drop-shadow(0 0 20px rgba(212, 168, 75, 0.5))';
        });
    });

    // Efecto de ondas en las tarjetas de enlace
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Estilos para el efecto ripple
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .link-card {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    </style>
`);

// ═══════════════════════════════════════════════════════════════════════════
// EFECTO DE ESCRITURA EN EL TÍTULO
// ═══════════════════════════════════════════════════════════════════════════

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTADOR ANIMADO (para futuras estadísticas)
// ═══════════════════════════════════════════════════════════════════════════

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// ═══════════════════════════════════════════════════════════════════════════
// PARALLAX SUAVE EN EL HEADER
// ═══════════════════════════════════════════════════════════════════════════

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    
    if (header) {
        header.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
    
    // Efecto de opacidad en las partículas
    const particles = document.querySelector('.particles');
    if (particles) {
        particles.style.opacity = 1 - (scrolled / 1000);
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// MODO OSCURO / CLARO (opcional para el futuro)
// ═══════════════════════════════════════════════════════════════════════════

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Cargar tema guardado
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}

// ═══════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL PARA NAVEGACIÓN INTERNA
// ═══════════════════════════════════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// CONSOLE LOG DECORATIVO
// ═══════════════════════════════════════════════════════════════════════════

console.log('%c ♻️ RECICLA-IA: Guardianes Muchik de la Economía Circular ', 
    'background: linear-gradient(135deg, #1a3a4a, #0a1628); color: #d4a84b; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c I.E. Nº 10923 "Fanny Abanto Calle" | Innova-Fanny Tech ', 
    'background: #40b5ad; color: white; font-size: 12px; padding: 5px 15px; border-radius: 3px;');
console.log('%c Primera Hackathon Educativa UGEL Chiclayo 2025 ', 
    'background: #d4a84b; color: #0a1628; font-size: 12px; font-weight: bold; padding: 5px 15px; border-radius: 3px;');
