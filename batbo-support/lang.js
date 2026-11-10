(function () {
  var root = document.documentElement;
  root.classList.add('js');

  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'en' || q === 'vi') return q;
    try { var s = localStorage.getItem('lang'); if (s === 'en' || s === 'vi') return s; } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('vi') === 0 ? 'vi' : 'en';
  }

  function apply(lang) {
    root.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('on', el.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.value === lang));
    });
    var t = document.querySelector('meta[name="title-' + lang + '"]');
    if (t) document.title = t.content;
    document.querySelectorAll('a[data-keep-lang]').forEach(function (a) {
      a.href = a.getAttribute('href').split('?')[0] + '?lang=' + lang;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(pick());
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        try { localStorage.setItem('lang', b.value); } catch (e) {}
        apply(b.value);
      });
    });
  });
})();
