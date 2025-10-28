document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const closeMenu = document.getElementById("closeMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!hamburger || !navMenu) return; // Seguridad

  const openMenu = () => {
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeMenuFunc = () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  };

  // Alternar menú
  hamburger.addEventListener("click", () => {
    navMenu.classList.contains("active") ? closeMenuFunc() : openMenu();
  });

  // Botón cerrar (si existe)
  closeMenu?.addEventListener("click", closeMenuFunc);

  // Cerrar al hacer clic en un enlace (modo móvil)
  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) closeMenuFunc();
    })
  );

  // Función para ajustar la posición del buscador
  function adjustSearchPosition() {
    const searchContainer = document.querySelector('.search-container');
    const logo = document.querySelector('.logo');
    const navActions = document.querySelector('.nav-actions');

    if (window.innerWidth <= 768) {
      if (searchContainer && logo && navActions && searchContainer.parentNode === navActions) {
        navActions.removeChild(searchContainer);
        logo.after(searchContainer);
        searchContainer.style.width = '100%';
        searchContainer.style.marginTop = '0.5rem';
      }
    } else {
      if (searchContainer && logo && navActions && searchContainer.parentNode !== navActions) {
        searchContainer.parentNode.removeChild(searchContainer);
        navActions.prepend(searchContainer);
        searchContainer.style.width = '';
        searchContainer.style.marginTop = '';
      }
    }
  }

  // Ajustar posición inicial
  adjustSearchPosition();

  // Cerrar al cambiar a escritorio y ajustar posición en resize
  window.addEventListener(
    "resize",
    () => {
      adjustSearchPosition();
      if (window.innerWidth > 768) closeMenuFunc();
    },
    { passive: true }
  );

  // Cerrar con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenuFunc();
    }
  });
});