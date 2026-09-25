document.addEventListener('DOMContentLoaded', function () {
  // Reveal-on-scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    revealEls.forEach(function (el) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            el.classList.add('visible');
            io.unobserve(el);
          }
        });
      }, { threshold: 0.12 });
      io.observe(el);
    });
  } else {
    // Fallback: no observer support, just show everything
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      mobile.classList.toggle('open');
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobile.classList.remove('open');
      });
    });
  }

  // Active nav link tracking
  var sectionIds = ['general', 'rounds', 'judging', 'awards'];
  var navLinks = document.querySelectorAll('[data-nav]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });
  }

  // Back to top
  var backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      backBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
