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

  // Quiet fade-up on reveal; content stays visible without JS or with reduced motion
  if (rm || !('IntersectionObserver' in window)) return;
  var els = document.querySelectorAll('main > section > *, main > .form-section > *, .thanks-wrap > *');
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
  els.forEach(function(el){ if (el.getBoundingClientRect().top < innerHeight) return; el.classList.add('reveal'); io.observe(el); });
})();
