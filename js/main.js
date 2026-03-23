// ============================================
// SCRIPT PREMIUM PARA SITE DA CLÍNICA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // ========== ANO NO RODAPÉ ==========
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ========== MENU MOBILE TOGGLE ==========
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle classes no menu e no botão
      mainNav.classList.toggle('open');
      navToggle.classList.toggle('open');
      
      // Atualizar aria-expanded
      const isNowOpen = navToggle.classList.contains('open');
      navToggle.setAttribute('aria-expanded', String(isNowOpen));
      
      console.log('Menu toggled. Open:', isNowOpen);
    });

    // Fechar menu ao clicar em um link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        console.log('Menu closed via link click');
      });
    });

    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        console.log('Menu closed via ESC');
      }
    });
  }

  // ========== SMOOTH SCROLL PARA LINKS INTERNOS ==========
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Fechar menu mobile se aberto
          if (mainNav && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // ========== REVEAL ANIMATIONS ON SCROLL ==========
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Se já tem classe in-view, já vai passar a animation
        if (entry.target.classList.contains('in-view')) {
          return;
        }
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos que têm animações
  const animatedElements = document.querySelectorAll(
    '.hero-card, .beneficio-card, .area-item, .depoimentos-grid blockquote, .contact-form, .contact-info, .beneficios-section h2, .areas-section h2, .depoimentos-section h2, .contact-section h2, .areas-intro'
  );

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // ========== DATA MÍNIMA PARA INPUT DE DATA ==========
  const dateInput = document.getElementById('contact-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // ========== NAVBAR SCROLLING EFFECT ==========
  const navbar = document.querySelector('.navbar-fixed');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (navbar) {
      if (currentScrollY > 100) {
        navbar.style.boxShadow = '0 10px 40px rgba(44, 62, 80, 0.25)';
      } else {
        navbar.style.boxShadow = '0 8px 32px rgba(44, 62, 80, 0.15)';
      }
    }

    lastScrollY = currentScrollY;
  });

  // ========== FORM CONTACT SUBMIT ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value || '';
      const email = document.getElementById('contact-email')?.value || '';
      const date = document.getElementById('contact-date')?.value || '';
      const message = document.getElementById('contact-message')?.value || '';
      const whatsappNumber = '5527995733565';

      let text = `Olá Etelvina! Meu nome é ${name}. Gostaria de agendar/obter mais informações.`;
      if (date) {
        text += `\nData sugerida: ${new Date(date).toLocaleDateString('pt-BR')}`;
      }
      if (message) {
        text += `\nMensagem: ${message}`;
      }
      if (email) {
        text += `\nEmail: ${email}`;
      }

      const encoded = encodeURIComponent(text);
      const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;

      // Abrir em nova janela e resetar form
      window.open(url, '_blank');
      contactForm.reset();

      // Feedback visual
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mensagem enviada! 🎉';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #67C3A0 0%, #4da37b 100%)';

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      }
    });
  }

  // ========== PARALLAX EFFECT NO HERO ==========
  const hero = document.querySelector('.hero');
  const heroBgOverlay = document.querySelector('.hero-bg-overlay');

  if (hero && heroBgOverlay) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;

      if (scrollY < heroHeight) {
        const parallaxOffset = scrollY * 0.5;
        heroBgOverlay.style.transform = `translateY(${parallaxOffset}px)`;
      }
    });
  }

  // ========== EFEITO DE HOVER NOS CARDS ==========
  const cards = document.querySelectorAll('.hero-card, .beneficio-card, .area-item, .depoimentos-grid blockquote');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      // Adicionar um brilho quando entra
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = '';
      }, 10);
    });
  });

  // ========== BOTÃO WHATSAPP FLUTUANTE INTERATIVO ==========
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    let hideTimeout;

    // Esconder depois de 5 segundos de inatividade e mostrar "Clique aqui!"
    window.addEventListener('mousemove', () => {
      clearTimeout(hideTimeout);
      whatsappFloat.style.opacity = '1';
      whatsappFloat.style.pointerEvents = 'auto';
    });
  }

  // ========== EFEITO DE DIGITAÇÃO NO TÍTULO ==========
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && heroTitle.textContent.length > 0) {
    const originalText = heroTitle.textContent;
    // Efeito já está na animação do CSS, apenas confirmar visibilidade
    heroTitle.style.opacity = '1';
  }
});

// ========== OBSERVER PARA ANIMAÇÕES STAGGERED ==========
document.addEventListener('DOMContentLoaded', () => {
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observar todos os elementos com animação
  document.querySelectorAll('[class*="hero-card"], [class*="beneficio-card"], [class*="area-item"], blockquote').forEach((el) => {
    animationObserver.observe(el);
  });
});

