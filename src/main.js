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
