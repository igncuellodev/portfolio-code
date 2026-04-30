document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navContainer = document.querySelector(".nav-container");
  // Seleccionamos todos los enlaces dentro del menú móvil
  const navLinks = document.querySelectorAll(".nav-container a");

  const closeMenu = () => {
    hamburger.classList.remove("active");
    navContainer.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  if (hamburger && navContainer) {
    hamburger.addEventListener("click", () => {
      const isActive = navContainer.classList.toggle("active");
      hamburger.classList.toggle("active");
      document.body.style.overflow = isActive ? "hidden" : "auto";
    });

    // Cerrar al clickear cualquier link
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Cerrar si ensanchas la pantalla
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) { // Ajustado a md de Tailwind
        closeMenu();
      }
    });
  }
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
    btnEs.classList.remove('text-black/40');
    // Desactivar EN
    btnEn.classList.remove('bg-[linear-gradient(270deg,#00B277_-0.06%,#0092E7_100%)]', 'text-white-500');
    btnEn.classList.add('text-black/40');
  } else {
    // Activar EN
    btnEn.classList.add('bg-[linear-gradient(270deg,#00B277_-0.06%,#0092E7_100%)]', 'text-white-500');
    btnEn.classList.remove('text-black/40');
    // Desactivar ES
    btnEs.classList.remove('bg-[linear-gradient(270deg,#00B277_-0.06%,#0092E7_100%)]', 'text-white-500');
    btnEs.classList.add('text-black/40');
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

// 1. Inicialización de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

document.addEventListener("DOMContentLoaded", () => {
  const sectionForm = document.getElementById('section-supabase-form');
  const successState = document.getElementById('success-state');
  const sectionStatus = document.getElementById('section-form-status');
  const resetBtn = document.getElementById('reset-form');
  
  // Guardamos el botón y su texto original fuera para acceder fácilmente
  const submitBtn = sectionForm?.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn?.getAttribute('data-en') || 'Send Message';

  // Función para volver al formulario y resetear el botón
  const showForm = () => {
    // 1. Resetear el estado del botón
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
    
    // 2. Limpiar mensajes de error previos
    if (sectionStatus) sectionStatus.textContent = '';

    // 3. Animación de regreso
    successState.classList.add('hidden', 'opacity-0', 'translate-y-4');
    sectionForm.classList.remove('hidden');
    
    setTimeout(() => {
      sectionForm.classList.remove('opacity-0', 'pointer-events-none');
    }, 50);
  };

  sectionForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Estado de carga
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    sectionStatus.textContent = '';

    const formData = new FormData(sectionForm);
    const payload = {
      name: formData.get('full_name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const { error } = await supabase
        .from('contactos')
        .insert([payload]);

      if (error) throw error;

      // --- ANIMACIÓN DE ÉXITO ---
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
      sectionStatus.textContent = 'Hubo un error al enviar.';
      sectionStatus.className = 'text-center text-sm font-medium text-rose-500 mt-4';
      
      // Restaurar botón solo si hay error para permitir reintentar
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });

  resetBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    showForm();
  });
});