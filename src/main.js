document.addEventListener("DOMContentLoaded", () => {
  const loaderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const circle = card.querySelector('.progress-circle');
        const textElement = card.querySelector('.progress-text');
        
        // Obtenemos el objetivo desde el HTML (40, 28, o 16)
        const targetValue = parseInt(card.getAttribute('data-target'));
        
        if (circle && textElement) {
          // 1. Animación del Círculo
          // Perímetro (r=56) es ~351.8. 
          // Fórmula: Perímetro * (1 - (Target / 100))
          const perimeter = 351.8;
          const offset = perimeter * (1 - (targetValue / 100));
          
          circle.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)';
          circle.style.strokeDashoffset = offset;

          // 2. Animación del Número
          let startTime = null;
          const duration = 2000;

          const updateNumber = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            textElement.innerText = Math.floor(progress * targetValue);

            if (progress < 1) requestAnimationFrame(updateNumber);
          };
          requestAnimationFrame(updateNumber);
        }
        loaderObserver.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.card-loader').forEach(card => loaderObserver.observe(card));
});


const lenis = new Lenis({
  duration: 2.2,
  lerp: 0.03,
  wheelMultiplier: 1.6,
  gestureOrientation: 'vertical',
  normalizeWheel: true,
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Este bloque es el mismo que ya tienes y funciona perfecto.
// Al añadir 'reveal', 'opacity-0' y 'translate-x-10' al HTML,
// este script automáticamente limpiará esas clases al hacer scroll.
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(
          'opacity-0',
          'translate-y-10',
          '-translate-x-10', // <-- Asegúrate de tener este remoción en tu script original
          'translate-x-10', // <-- Asegúrate de tener este remoción en tu script original
          'scale-50',
          'blur-md'
        );

        entry.target.classList.add(
          'opacity-100',
          'translate-x-0',
          'translate-y-0',
          'scale-100',
          'blur-0'
        );

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
});

window.addEventListener("scroll", () => {
  const images = document.querySelectorAll('.scroll-expand');
  
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculamos qué tan centrada está la imagen (0 a 1)
    const intersectRatio = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
    
    // Efecto elástico: escala entre 1 y 1.25 basado en el scroll
    const scale = 1 + (intersectRatio * 0.25); 
    
    img.style.transform = `scale(${scale})`;
  });
});

const langButton = document.getElementById('language-toggle');
const btnEn = document.getElementById('lang-en');
const btnEs = document.getElementById('lang-es');
let currentLang = 'en';

langButton.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'es' : 'en';

  // 1. Animación del Botón (Ease-in en el cambio de fondo)
  const gradientClass = 'bg-[linear-gradient(270deg,#00B277_-0.06%,#0092E7_100%)]';
  
  if (currentLang === 'es') {
    // Activar ES
    btnEs.classList.add('bg-[linear-gradient(270deg,#00B277_-0.06%,#0092E7_100%)]', 'text-white-500');
    btnEs.classList.remove('text-black-400');
    // Desactivar EN
    btnEn.classList.remove('bg-[linear-gradient(270deg,#00B277_-0.06%,#0092E7_100%)]', 'text-white-500');
    btnEn.classList.add('text-black-400');
  } else {
    // Activar EN
    btnEn.classList.add('bg-[linear-gradient(270deg,#00B277_-0.06%,#0092E7_100%)]', 'text-white-500');
    btnEn.classList.remove('text-black-400');
    // Desactivar ES
    btnEs.classList.remove('bg-[linear-gradient(270deg,#00B277_-0.06%,#0092E7_100%)]', 'text-white-500');
    btnEs.classList.add('text-black-400');
  }

  // 2. Traducción (Tu lógica que funciona de 10)
  document.querySelectorAll('[data-en]').forEach(el => {
    const translation = el.getAttribute(`data-${currentLang}`);
    if (el.tagName === 'H1' || el.classList.contains('h1-fluid')) {
      const word = currentLang === 'en' ? 'Connections' : 'Conexiones';
      const span = `<span class="bg-linear-to-l from-[#00B277] to-[#0092E7] bg-clip-text text-transparent">${word}</span>`;
      el.innerHTML = translation.replace(word, span);
    } else {
      el.textContent = translation;
    }
  });

  document.documentElement.lang = currentLang;
});

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

document.addEventListener("DOMContentLoaded", () => {
  const sectionForm = document.getElementById('section-supabase-form');
  const successState = document.getElementById('success-state');
  const sectionStatus = document.getElementById('section-form-status');
  const resetBtn = document.getElementById('reset-form');
  const submitBtn = document.getElementById('section-submit-btn');
  
  const originalBtnText = submitBtn?.getAttribute('data-en') || 'Send Message';

  // --- LÓGICA DE TURNSTILE ---
  window.onTurnstileSuccess = function(token) {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove('cursor-not-allowed', 'opacity-50');
      submitBtn.classList.add('cursor-pointer', 'opacity-100');
      sectionStatus.textContent = ''; 
    }
  };

  const showForm = () => {
    // Resetear botón a estado bloqueado por seguridad hasta que Turnstile valide de nuevo
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = originalBtnText;
      submitBtn.classList.add('cursor-not-allowed', 'opacity-50');
    }
    
    if (sectionStatus) sectionStatus.textContent = '';
    if (typeof turnstile !== 'undefined') turnstile.reset(); // Reiniciar widget

    successState.classList.add('hidden', 'opacity-0', 'translate-y-4');
    sectionForm.classList.remove('hidden');
    
    setTimeout(() => {
      sectionForm.classList.remove('opacity-0', 'pointer-events-none');
    }, 50);
  };

  sectionForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(sectionForm);
    const turnstileToken = formData.get('cf-turnstile-response');

    if (!turnstileToken) {
      sectionStatus.textContent = 'Security check failed. Please try again.';
      sectionStatus.className = 'text-center text-sm font-medium text-rose-500 mt-4';
      return;
    }

    // Estado de carga
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    sectionStatus.textContent = '';

    const payload = {
      name: formData.get('full_name'),
      email: formData.get('email'),
      message: formData.get('message')
      // Si validas el token en el backend, deberías enviarlo aquí también
    };

    try {
      const { error } = await supabase
        .from('contactos')
        .insert([payload]);

      if (error) throw error;

      // Animación de éxito
      sectionForm.classList.add('opacity-0', 'pointer-events-none');
      
      setTimeout(() => {
        sectionForm.classList.add('hidden');
        successState.classList.remove('hidden');
        
        setTimeout(() => {
          successState.classList.remove('opacity-0', 'translate-y-4');
          successState.classList.add('opacity-100', 'translate-y-0');
        }, 50);
        
        sectionForm.reset();
      }, 500);

    } catch (err) {
      console.error('Error enviando a Supabase:', err.message);
      sectionStatus.textContent = 'Error sending message. Please try again.';
      sectionStatus.className = 'text-center text-sm font-medium text-rose-500 mt-4';
      
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });

  resetBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    showForm();
  });
});

