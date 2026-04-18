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