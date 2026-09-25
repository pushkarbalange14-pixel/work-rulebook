document.addEventListener('DOMContentLoaded', function () {
  // Intersection Observer for scroll animations
  const revealEls = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Mobile navigation drawer controls
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      mobile.classList.toggle('open');
    });

    mobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobile.classList.remove('open');
      });
    });
  }

  // Active section tracking in navbar
  const sectionIds = ['general', 'rounds', 'judging', 'awards'];
  const navLinks = document.querySelectorAll('[data-nav]');

  if ('IntersectionObserver' in window && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const isMatch = link.getAttribute('href') === '#' + entry.target.id;
            link.classList.toggle('active', isMatch);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });
  }

  // Back to top floating button
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
