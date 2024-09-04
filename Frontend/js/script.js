// carousel
document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
  carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
          carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
          carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
  });
});

// nav 

document.addEventListener('DOMContentLoaded', function () {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.navmenu ul');
    const dropdownLink = document.querySelector('.dropdown > a');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Alterna el menú en dispositivos móviles y cambia el ícono
    mobileNavToggleBtn.addEventListener('click', function () {
        navMenu.classList.toggle('d-none');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
    });

    // Alterna el submenú al hacer clic en el ícono de perfil
    dropdownLink.addEventListener('click', function (e) {
        e.preventDefault(); // Previene la acción por defecto del enlace
        dropdownMenu.classList.toggle('show'); // Alterna la visibilidad del submenú
    });

    // Cierra el submenú al hacer clic fuera del menú
    document.addEventListener('click', function (e) {
        if (!dropdownLink.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show'); // Oculta el submenú
        }
    });

    // Evita que el submenú se oculte al hacer clic dentro del mismo
    dropdownMenu.addEventListener('click', function (e) {
        e.stopPropagation(); // Previene que el clic dentro del submenú lo oculte
    });

    // Ajusta el menú cuando se cambia el tamaño de la pantalla
    window.addEventListener('resize', function () {
        if (window.innerWidth > 991) {
            navMenu.classList.remove('d-none'); // Asegura que el menú esté visible en pantallas grandes
            mobileNavToggleBtn.classList.add('bi-list');
            mobileNavToggleBtn.classList.remove('bi-x');
            dropdownMenu.classList.remove('show'); // Oculta el dropdown del perfil por defecto
        } else {
            navMenu.classList.add('d-none'); // Oculta el menú por defecto en pantallas pequeñas
            dropdownMenu.classList.remove('show'); // Oculta el dropdown del perfil por defecto
        }
    });

    // Ejecuta la función al cargar para asegurar el estado inicial correcto
    window.dispatchEvent(new Event('resize'));
});

// Swiper
document.addEventListener('DOMContentLoaded', function() {
    const swiperConfigScript = document.querySelector('.swiper-config');
    const swiperConfig = JSON.parse(swiperConfigScript.textContent);

    swiperConfig.autoplay = swiperConfig.autoplay || {
        delay: 5000, // Cambia cada 5 segundos
        disableOnInteraction: false // Continúa el autoplay incluso si el usuario interactúa
    };
    const swiper = new Swiper('.init-swiper', swiperConfig);
});
