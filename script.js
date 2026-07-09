
    /* CAMBIO DE TEMA */
    const botonTema   = document.getElementById('botonTema');
    const htmlEl      = document.documentElement;
    const iconos      = { oscuro: '☀️', claro: '🌙' };

    botonTema.addEventListener('click', () => {
      const temaActual  = htmlEl.getAttribute('data-tema');
      const nuevoTema   = temaActual === 'oscuro' ? 'claro' : 'oscuro';
      htmlEl.setAttribute('data-tema', nuevoTema);
      botonTema.textContent = iconos[nuevoTema];
      localStorage.setItem('tema-elbro', nuevoTema);
    });

    /* Recuperar tema guardado */
    const temaGuardado = localStorage.getItem('tema-elbro');
    if (temaGuardado) {
      htmlEl.setAttribute('data-tema', temaGuardado);
      botonTema.textContent = iconos[temaGuardado];
    }

    /* MENU MOVIL */
    const btnHamburger = document.getElementById('btnHamburger');
    const menuMovil    = document.getElementById('menuMovil');
    const btnCerrar    = document.getElementById('btnCerrar');
    const enlacesMovil = menuMovil.querySelectorAll('.enlace-movil');

    btnHamburger.addEventListener('click', () => menuMovil.classList.add('abierto'));
    btnCerrar.addEventListener('click',    () => menuMovil.classList.remove('abierto'));
    enlacesMovil.forEach(a => a.addEventListener('click', () => menuMovil.classList.remove('abierto')));

    menuMovil.addEventListener('click', (e) => {
      if (e.target === menuMovil) menuMovil.classList.remove('abierto');
    });

    /* ANIMACION DE APARICION AL HACER SCROLL — SOLO IMAGENES */
    const imagenesAnimadas = document.querySelectorAll('.img-animar');

    const observadorImg = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observadorImg.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    imagenesAnimadas.forEach(el => observadorImg.observe(el));

    /* EFECTO 3D DE PROFUNDIDAD EN LAS FIGURAS DEL ECOSISTEMA */
    document.querySelectorAll('.figura-escenario').forEach(escenario => {
      escenario.addEventListener('mousemove', (e) => {
        const rect = escenario.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) / (rect.width  / 2);
        const dy   = (e.clientY - cy) / (rect.height / 2);
        escenario.style.transform = `rotateX(${-dy * 8}deg) rotateY(${dx * 10}deg) translateY(-6px)`;
      });

      escenario.addEventListener('mouseleave', () => {
        escenario.style.transform = '';
      });

      /* Toque móvil: pop suave */
      escenario.addEventListener('touchstart', () => {
        escenario.style.transform = 'scale(0.97)';
      }, { passive: true });
      escenario.addEventListener('touchend', () => {
        escenario.style.transform = '';
      });
    });

    /* NAV: SOMBRA AL HACER SCROLL */
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        nav.style.boxShadow = '0 12px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)';
      } else {
        nav.style.boxShadow = '0 8px 40px var(--sombra-glass), inset 0 1px 0 rgba(255,255,255,0.12)';
      }
    }, { passive: true });