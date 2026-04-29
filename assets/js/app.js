/* ════════════════════════════════════════
   MULTILOGIN DISCOUNT — Global JavaScript
   app.js — Fixed for GitHub Pages
════════════════════════════════════════ */

/* ── Copy Coupon Code ── */
function copyCode(code, btn) {
  navigator.clipboard.writeText(code).then(function () {
    var orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.style.background = '#005ff9';
    btn.style.color = '#fff';
    btn.style.borderColor = '#005ff9';
    setTimeout(function () {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 1800);
  });
}

/* ── Mobile Menu Toggle ── */
function toggleMobileMenu() {
  var mm = document.getElementById('gh-mobile-menu');
  if (mm) mm.classList.toggle('open');
}

/* ── Scroll Reveal (Intersection Observer) ── */
function initReveal() {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
    observer.observe(el);
  });
}

/* ── Set Active Nav Link based on current filename ── */
function setActiveNav() {
  // Get the current page filename e.g. "review.html" or "index.html"
  var path = window.location.pathname;
  var filename = path.split('/').pop(); // gets "review.html"

  // If empty or just "/" it's the homepage
  if (!filename || filename === '') filename = 'index.html';

  // Map filenames to nav link hrefs (relative — no leading slash)
  var navLinks = document.querySelectorAll('.gh-menu-link');
  navLinks.forEach(function (link) {
    link.classList.remove('active');
    var href = link.getAttribute('href');
    if (!href) return;

    // Get just the filename part of the href
    var hrefFile = href.split('/').pop();
    if (!hrefFile || hrefFile === '') hrefFile = 'index.html';

    // Match current page to nav link
    if (hrefFile === filename) {
      link.classList.add('active');
    }

    // Special case: blog subpages should highlight the Blog nav link
    var blogPages = [
      'how-to-create-browser-profiles.html',
      'web-scraping-without-getting-blocked.html',
      'social-media-automation-guide.html'
    ];
    if (blogPages.indexOf(filename) !== -1 && hrefFile === 'index.html' && href.indexOf('blog') !== -1) {
      link.classList.add('active');
    }
  });
}

/* ── Blog / Archive Filter ── */
function filterCards(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  document.querySelectorAll('#archive-cards .archive-card').forEach(function (card) {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ── Smooth Scroll for In-Page Anchor Links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Init on DOM Ready ── */
document.addEventListener('DOMContentLoaded', function () {
  initReveal();
  setActiveNav();
  initSmoothScroll();
});
