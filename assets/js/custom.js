// Holly Powell Law — Shared JS

document.addEventListener('DOMContentLoaded', function () {

  // --- Preloader ---
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(() => preloader.classList.add('hidden'), 400);
    });
  }

  // --- Sticky Navbar ---
  const navbar = document.querySelector('.navbar-area');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar && navbar.classList.add('sticky');
    } else {
      navbar && navbar.classList.remove('sticky');
    }
  });

  // --- Hamburger / Mobile Menu ---
  const ham = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileNavMenu');
  if (ham && mobileMenu) {
    ham.addEventListener('click', function () {
      ham.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        ham.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // --- Hero Slider ---
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  if (slides.length > 1) {
    let current = 0;
    function showSlide(n) {
      slides.forEach(function (s, i) {
        s.style.display = i === n ? 'flex' : 'none';
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === n);
      });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        current = i;
        showSlide(current);
      });
    });
    showSlide(0);
    setInterval(function () {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 5000);
  }

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // --- Go Top Button ---
  const goTop = document.querySelector('.go-top');
  if (goTop) {
    window.addEventListener('scroll', function () {
      goTop.classList.toggle('visible', window.scrollY > 400);
    });
    goTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Contact Form ---
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const success = document.getElementById('formSuccess');
      if (success) {
        success.style.display = 'block';
        form.reset();
        setTimeout(() => { success.style.display = 'none'; }, 6000);
      }
    });
  }

  // --- Counter Animation ---
  const counters = document.querySelectorAll('.count-up');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(function () {
            count = Math.min(count + step, target);
            el.textContent = count + suffix;
            if (count >= target) clearInterval(timer);
          }, 25);
          cio.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  // Reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.style.opacity = 1; el.style.transform = 'none';
    });
  }
});
