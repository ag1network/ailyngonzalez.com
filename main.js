(function() {
  'use strict';

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Headshot fallback (no inline onerror)
  var img = document.getElementById('headshotImg');
  var fallback = document.getElementById('headshotFallback');
  if (img && fallback) {
    img.addEventListener('error', function() {
      img.hidden = true;
      fallback.hidden = false;
    });
  }

  // Mobile menu
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  var mobileMenu = document.getElementById('mobileMenu');
  var topbar = menuBtn ? menuBtn.closest('.topbar') : null;

  function setMenu(open) {
    if (!topbar) return;
    topbar.classList.toggle('menu-open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      var isOpen = topbar && topbar.classList.contains('menu-open');
      setMenu(!isOpen);
    });
  }

  // Close menu on link click
  if (mobileMenu) {
    var links = mobileMenu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() { setMenu(false); });
    }
  }

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (!topbar || !topbar.classList.contains('menu-open')) return;
    var inside = (nav && nav.contains(e.target)) || (mobileMenu && mobileMenu.contains(e.target));
    if (!inside) setMenu(false);
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && topbar && topbar.classList.contains('menu-open')) {
      setMenu(false);
      if (menuBtn) menuBtn.focus();
    }
  });

  // Fade-in on scroll (IntersectionObserver)
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    var els = document.querySelectorAll('.fade-in');
    for (var j = 0; j < els.length; j++) {
      observer.observe(els[j]);
    }
  } else {
    // Fallback: just show everything
    var allFade = document.querySelectorAll('.fade-in');
    for (var k = 0; k < allFade.length; k++) {
      allFade[k].classList.add('visible');
    }
  }
})();
