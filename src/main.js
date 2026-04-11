document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navContainer = document.querySelector(".nav-container");
  const navLinks = document.querySelectorAll(".nav-items a, .button-link");

  // Función para cerrar el menú
  const closeMenu = () => {
    hamburger.classList.remove("active");
    navContainer.classList.remove("active");
    document.body.style.overflow = "auto"; // Libera el scroll
  };

  // Toggle del menú
  if (hamburger && navContainer) {
    hamburger.addEventListener("click", () => {
      const isActive = hamburger.classList.toggle("active");
      navContainer.classList.toggle("active");
      
      // Bonus de Rigor: Evita que el usuario scrollee cuando el menú está abierto
      document.body.style.overflow = isActive ? "hidden" : "auto";
    });

    // Cerrar al hacer click en los links (Ideal para anchors #)
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Cerrar si se redimensiona la pantalla (por si Manuel mueve la ventana)
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) { // 1024px es el breakpoint 'lg' de Tailwind
        closeMenu();
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.15 // Se activa cuando el 15% del elemento es visible
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Quitamos los estados iniciales (invisible y abajo)
        // Mantenemos la transición y el delay que ya están en el HTML
        entry.target.classList.remove('opacity-0', 'translate-y-10');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        
        // Dejamos de observar para optimizar memoria
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);

  // Seleccionamos todos los elementos con la clase "reveal"
  const elements = document.querySelectorAll('.reveal');
  elements.forEach(el => observer.observe(el));
});

const lenis = new Lenis({
  duration: 2, // Cuánto dura el deslizamiento (más alto = más "mantequilla")
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de suavizado
  direction: 'vertical',
  gestureDirection: 'vertical',
  smoothHover: true,
  smoothWheel: true,
});

// El motor de la animación
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Sincronización con tu marquesina de frases (opcional pero recomendado)
// Esto hace que el movimiento lateral sea aún más fluido al estar atado a Lenis
lenis.on('scroll', (e) => {
  const scrollContainer = document.getElementById('scrolling-container');
  const section = document.getElementById('phrases-scroll');
  if (section && scrollContainer) {
    const sectionTop = section.offsetTop;
    const movement = (window.scrollY - sectionTop) * -0.4;
    scrollContainer.style.transform = `translateX(${movement}px)`;
  }
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Evitamos el salto brusco nativo

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Usamos el método scrollTo de Lenis
      lenis.scrollTo(targetElement, {
        offset: 0, // Ajusta esto si tienes una navbar fija (ej: -80)
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  });
});