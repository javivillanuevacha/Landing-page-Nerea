/**
 * Archivo: main.js
 * Descripción: Funcionalidades de la landing page
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== UTILIDADES =====
    const utils = {
        // Validación de email
        validarEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        
        // Mostrar mensajes de feedback
        mostrarMensaje: (mensaje, tipo) => {
            const mensajeDiv = document.createElement('div');
            mensajeDiv.classList.add('mensaje', `mensaje-${tipo}`);
            mensajeDiv.textContent = mensaje;
            
            const form = document.getElementById('contactForm');
            form.parentNode.insertBefore(mensajeDiv, form);
            
            setTimeout(() => mensajeDiv.remove(), 3000);
        }
    };

    // ===== NAVEGACIÓN =====
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            document.querySelector(targetId)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // ===== FORMULARIO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Recoger datos del formulario
            const formData = {
                nombre: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                telefono: contactForm.querySelector('input[type="tel"]').value,
                mensaje: contactForm.querySelector('textarea').value
            };
            
            // Validaciones
            if (Object.values(formData).some(value => !value)) {
                utils.mostrarMensaje('Por favor, completa todos los campos', 'error');
                return;
            }
            
            if (!utils.validarEmail(formData.email)) {
                utils.mostrarMensaje('Por favor, introduce un email válido', 'error');
                return;
            }
            
            // Envío exitoso
            utils.mostrarMensaje('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.', 'success');
            contactForm.reset();
        });
    }

    // ===== ANIMACIONES =====
    // Elementos que se animan al hacer scroll
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});