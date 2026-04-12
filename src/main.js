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