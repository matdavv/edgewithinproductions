(function(){
  var rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Business: package buttons and #inquire links open the collapsed enquiry form
  var enq = document.getElementById('enquiry-details');
  function openFor(a){
    if (!enq) return;
    var h = a.getAttribute('href') || '';
    if (a.hasAttribute('data-package') || h === '#inquire' || h === '#inquireForm') { enq.open = true; if (a.hasAttribute('data-package') && !a.closest('.hero')) { e_prevent(a); } }
  }
  var lastEvt = null;
  function e_prevent(a){ if (lastEvt) lastEvt.preventDefault(); var t = document.getElementById('inquireForm'); if (t) setTimeout(function(){ t.scrollIntoView({ behavior: rm ? 'auto' : 'smooth', block: 'start' }); }, 30); }
  document.addEventListener('click', function(e){ var a = e.target.closest && e.target.closest('a[href^="#"]'); if (a) { lastEvt = e; openFor(a); lastEvt = null; } }, true);
  if (enq && /^#(inquire|inquireForm)$/.test(location.hash)) enq.open = true;
  if (enq && /[?&]package=/.test(location.search)) enq.open = true;

  // Lazy photos: start fetching once the page has loaded, so no section is ever left blank
  function warm(){ document.querySelectorAll('img[loading="lazy"]').forEach(function(i){ i.loading = 'eager'; }); }
  window.addEventListener('load', function(){ (window.requestIdleCallback || function(f){ setTimeout(f, 300); })(warm); });

  // Quiet fade-up on reveal. Only small text blocks and cards fade; images, video and
  // whole section wrappers never do. Content stays visible without JS or with reduced motion.
  if (rm || !('IntersectionObserver' in window)) return;
  var sel = 'main h2, main .section-header, main .s-kicker, .hiw-steps li, .s-paths > *, .s-quotes > *, .testimonial-card, .tier, .faq-item, .biz-combined > div, .proof-line, .thanks-wrap > *';
  var els = [].slice.call(document.querySelectorAll(sel)).filter(function(el){
    var r = el.getBoundingClientRect();
    return r.height > 0 && r.height < innerHeight * 0.8 && r.top > innerHeight && !el.querySelector('img, video, iframe');
  });
  function show(el){ el.classList.add('in'); }
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ show(e.target); io.unobserve(e.target);} }); }, { rootMargin: '0px 0px -5% 0px', threshold: 0 });
  els.forEach(function(el){ el.classList.add('reveal'); io.observe(el); });
  // Safety net: anything already scrolled past (fast jumps, anchors, restored scroll) or printing shows at once
  function sweep(){ els.forEach(function(el){ if (!el.classList.contains('in') && el.getBoundingClientRect().top < innerHeight) show(el); }); }
  window.addEventListener('scroll', function(){ requestAnimationFrame(sweep); }, { passive: true });
  window.addEventListener('hashchange', sweep);
  window.addEventListener('beforeprint', function(){ els.forEach(show); });
})();
