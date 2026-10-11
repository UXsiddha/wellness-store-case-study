/* =========================================================================
   page.js: Wellness Store. The motion system is kit.js; this file wires the
   three moments only this story has: the opening phone stepping through
   the real Phase 1 screens, the catalogue collapsing into one storefront,
   and the architecture lighting from catalogue to cart.
   ========================================================================= */
(function () {
  'use strict';
  var K = window.KIT, $ = K.$, $$ = K.$$;

  /* 01 -> 02: the phone steps through the buying journey beside its list */
  var shots = $$('#hero-device .swap img'), rows = $$('#built-asks li');
  if (shots.length && rows.length) K.autoplay($('#top'), rows.length, function (i) {
    rows.forEach(function (li, k) { li.classList.toggle('is-now', k === i); });
    shots.forEach(function (im, k) { im.classList.toggle('is-on', k === i); });
  }, 2600);

  /* C: the line runs between the first and last remaining dots */
  var actC = $('.act-c');
  K.draw(actC, function (p, still) {
    var ol = $('.c-steps', actC), dots = $$('.c-steps li i', actC);
    if (still) { actC.classList.add('is-after'); return; }
    var r = ol.getBoundingClientRect(), a = dots[0].getBoundingClientRect(), b = dots[dots.length - 1].getBoundingClientRect();
    ol.style.setProperty('--ll', (a.left + a.width / 2 - r.left) + 'px');
    ol.style.setProperty('--lr', (r.right - b.left - b.width / 2) + 'px');
    actC.classList.toggle('is-after', p > 0.6);
  });

  /* E: each layer lights, then the line to the next one fills */
  var sysLis = $$('#sys li');
  K.draw($('.act-e'), function (p, still) {
    var k = (still ? 1 : p) * (sysLis.length + 0.4);
    sysLis.forEach(function (li, i) {
      li.classList.toggle('is-on', k >= i + 0.25);
      li.style.setProperty('--f', K.clamp(k - i - 0.45).toFixed(3));
    });
  });

  K.story($('#dec-story'));
  K.start();
})();
