/* Digital Monster · sitio: pestañas, idioma (ES/EN), proyectos, formatos, créditos y formulario de contacto. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = function (tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text != null) n.textContent = text;
    return n;
  };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- textos en inglés (el español está en el HTML) ---------- */
  var EN = {
    nav_aria: 'Sections', nav_inicio: 'Home', nav_proyectos: 'Projects', nav_formatos: 'Formats', nav_estudio: 'Studio', nav_contacto: 'Contact',
    hero_eyebrow: 'Production studio · Santiago, Chile', hero_1: 'We make', hero_2: 'Monsters',
    hero_lead: 'We build our own worlds and take them wherever they need to go: video games, comics, novels, board games, animation and merch.',
    hero_cta1: 'See projects', hero_cta2: 'Pitch your project', logo_alt: 'Digital Monster mask',
    slate_prod: 'Prod.', slate_base: 'Base', slate_base_v: 'Santiago, Chile', slate_proj: 'Projects', slate_fmt: 'Formats', slate_fmt_v: '7 fronts',
    proj_aria: 'Projects', spec_format: 'Format', spec_status: 'Status', spec_genre: 'Genre', spec_crew: 'Created by', proj_follow: 'Follow its progress on Instagram →',
    fmt_title: 'One world,<br>seven formats', fmt_intro: 'Ideas aren’t born with a format. Pick one to see how we work on it.', fmt_label: 'Format', fmt_ours: 'Our projects',
    crew_title: 'Credits', crew_intro: 'A small studio, like the ones we admire. Everyone signs their own work.',
    ct_title: 'Got a monster on the loose?',
    ct_intro: 'Write to us the way you’d write to a person. We only need your name, a valid email to reply to and whatever you want to tell us; everything else is optional.',
    l_hello: 'Hi, Digital Monster. My name is', l_name_lbl: 'Your name', l_name_ph: 'your name', l_because: 'and I’m writing because', l_motive_lbl: 'Reason',
    l_called: 'It’s called', l_title_lbl: 'Project name', l_title_ph: 'project name', l_is: 'it’s', l_format_lbl: 'Format', l_now: 'that is currently',
    l_stage_lbl: 'Status', l_want: 'and I’d like', l_help_lbl: 'What you’re looking for', l_see: 'You can see something at', l_link_lbl: 'Link to a sample', l_link_ph: 'a link, if you have one',
    l_body_lbl: 'Everything else, in your own words', l_body_ph: 'Where the idea comes from, who’s behind it, what you imagine, or just a hello.',
    l_reply: 'You can reply to me at', l_email_lbl: 'Your email', l_send: 'Send message',
    pv_aria: 'Email preview', pv_title: 'How it reaches us', pv_from: 'From', pv_to: 'To', pv_subject: 'Subject',
    fj_tag: 'A Digital Monster tool',
    fj_text: 'It’s the platform we use to run our own projects: fairs, grants and open calls in Chile, dates and deadlines. We opened it so you can shape your own monster too.',
    fj_cta: 'Open Forja',
    ct_fine: 'We read everything that comes in. If you tell us about a project, it stays yours until we sign something together. If you’d rather use your own email, write to <span class="sel">contacto@digitalmonster.cl</span>.',
    foot_copy: '© 2026 Digital Monster · Made in Chile'
  };
  var UI = {
    es: { sending: 'Enviando…', sent: 'Enviado. Te responderemos a ', missing: 'Nos falta ', and: ' y ', name: 'tu nombre', email: 'un correo válido', body: 'algo que contarnos',
          fail: 'No se pudo enviar. Escríbenos directo a contacto@digitalmonster.cl.', noName: 'Sin nombre', yourName: 'Tu nombre', bodyPh: 'Aquí va lo que nos quieras contar.',
          st: 'Estado', help: 'Busca', sample: 'Muestra', stillNone: 'Todavía ninguno', title: 'Digital Monster · Estudio de producción' },
    en: { sending: 'Sending…', sent: 'Sent. We’ll reply to ', missing: 'We still need ', and: ' and ', name: 'your name', email: 'a valid email', body: 'something to tell us',
          fail: 'It couldn’t be sent. Write to us at contacto@digitalmonster.cl.', noName: 'Untitled', yourName: 'Your name', bodyPh: 'Whatever you want to tell us goes here.',
          st: 'Status', help: 'Wants', sample: 'Sample', stillNone: 'None yet', title: 'Digital Monster · Production studio' }
  };

  /* ---------- datos ---------- */
  var PROJECTS = [
    { key: 'firelights', name: 'Firelights', ink: '#ffef00', logo: '/assets/Firelights/logo.svg', fmt: 'comic',
      format: { es: 'Webcómic', en: 'Webcomic' },
      pitch: { es: 'Una travesía a través de la fantasía y la ciencia ficción.', en: 'A journey through fantasy and science fiction.' },
      status: { es: 'Prototipo y borrador', en: 'Prototype and draft' },
      genre: { es: 'Fantasía · Ciencia ficción', en: 'Fantasy · Science fiction' }, crew: 'Skynook · Teoc' },
    { key: 'cardgame', name: 'Card Game', ink: '#ff2d95', logo: null, fmt: 'videojuego',
      format: { es: 'Videojuego', en: 'Video game' },
      pitch: { es: 'Un juego de cartas. Card Game es su nombre provisional.', en: 'A card game. Card Game is its working title.' },
      status: { es: 'Próximamente', en: 'Coming soon' },
      genre: { es: 'Por definir', en: 'To be defined' }, crew: 'Digital Monster' }
  ];
  var FORMATS = [
    { key: 'videojuego', bg: '#5c00fe', fg: '#f1edf4', rot: -4, size: 54, name: { es: 'Videojuegos', en: 'Video games' },
      what: { es: 'Diseño de juego, arte, programación y pruebas con jugadores reales.', en: 'Game design, art, programming and testing with real players.' } },
    { key: 'comic', bg: '#ffef00', fg: '#0e0c11', rot: 3, size: 64, name: { es: 'Cómics', en: 'Comics' },
      what: { es: 'Guion, storyboard, entintado y color, publicados en la web y en papel.', en: 'Script, storyboard, inks and color, published online and in print.' } },
    { key: 'novela', bg: '#0e0c11', fg: '#f1edf4', rot: -2, size: 46, name: { es: 'Novelas', en: 'Novels' },
      what: { es: 'Mundos que primero se escriben en prosa y después saltan a otros formatos.', en: 'Worlds written first in prose that later jump to other formats.' } },
    { key: 'mesa', bg: '#ff2d95', fg: '#0e0c11', rot: 5, size: 50, name: { es: 'Juegos de mesa', en: 'Board games' },
      what: { es: 'Prototipos, sesiones de prueba y producción con imprentas y fabricantes de componentes.', en: 'Prototypes, playtests and production with printers and component makers.' } },
    { key: 'series', bg: '#f1edf4', fg: '#0e0c11', rot: -6, size: 42, dashed: true, name: { es: 'Series y cortos', en: 'Series & shorts' },
      what: { es: 'Animación digital: guion, animatic y producción de piezas cortas.', en: 'Digital animation: script, animatic and production of short pieces.' } },
    { key: 'cine', bg: '#6a2bd9', fg: '#f1edf4', rot: 2, size: 48, name: { es: 'Películas', en: 'Films' },
      what: { es: 'Proyectos de largo aliento que se desarrollan con calma, junto a otros estudios.', en: 'Long-haul projects developed slowly, together with other studios.' } },
    { key: 'merch', bg: '#0e0c11', fg: '#ffef00', rot: -3, size: 58, round: true, name: { es: 'Merch', en: 'Merch' },
      what: { es: 'Llaveros, figuras, láminas y stickers de nuestros personajes.', en: 'Keychains, figures, prints and stickers of our characters.' } }
  ];
  var CREW = [
    { key: 'skynook', name: 'Skynook', real: 'Hardy', unit: 'DM-CORE-01', photo: '/assets/equipo/hardy.webp',
      role: { es: 'Dirección de arte', en: 'Art direction' },
      bio: { es: 'Cofundador y director artístico. Co-creador de Firelights. Estudia Animación Digital.', en: 'Co-founder and art director. Co-creator of Firelights. Studies Digital Animation.' } },
    { key: 'teoc', name: 'Teoc', real: 'Tomás', unit: 'DM-CORE-02', photo: '/assets/equipo/tomas.jpg',
      role: { es: 'Dirección de experiencias', en: 'Experience direction' },
      bio: { es: 'Cofundador. Co-creador de Firelights. Estudia Pedagogía en Educación Básica.', en: 'Co-founder. Co-creator of Firelights. Studies Primary Education.' } },
    { key: 'manolo', name: 'Manolo', real: 'Martín', unit: 'DM-UNIT-03', photo: '/assets/equipo/martin.jpg',
      role: { es: 'Arte', en: 'Art' },
      bio: { es: 'Artista chileno buscando su propio estilo. Estética de Pinterest, narrativa de Evangelion.', en: 'Chilean artist finding his own style. Pinterest aesthetics, Evangelion storytelling.' } }
  ];
  /* Las claves viajan al servidor; contacto.php arma el asunto en español para que los filtros del correo no cambien. */
  var MOTIVES = [
    { key: 'proyecto', tag: 'Proyecto', es: 'les quiero presentar un proyecto', en: 'I want to pitch you a project' },
    { key: 'colabora', tag: 'Colaboración', es: 'me gustaría colaborar con ustedes', en: 'I’d like to collaborate with you' },
    { key: 'prensa', tag: 'Prensa', es: 'soy de prensa o de una feria', en: 'I’m from the press or a fair' },
    { key: 'comercial', tag: 'Comercial', es: 'quiero proponerles un trato comercial', en: 'I want to propose a business deal' },
    { key: 'otro', tag: 'Contacto', es: 'quiero contarles otra cosa', en: 'I want to tell you something else' }
  ];
  var F_OPTS = [
    { key: 'videojuego', es: 'un videojuego', en: 'a video game' }, { key: 'comic', es: 'un cómic', en: 'a comic' },
    { key: 'novela', es: 'una novela', en: 'a novel' }, { key: 'mesa', es: 'un juego de mesa', en: 'a board game' },
    { key: 'serie', es: 'una serie o un corto', en: 'a series or a short' }, { key: 'pelicula', es: 'una película', en: 'a film' },
    { key: 'merch', es: 'merch', en: 'merch' }, { key: 'otro', es: 'otra cosa', en: 'something else' }
  ];
  var S_OPTS = [
    { key: 'idea', es: 'como idea escrita', en: 'a written idea' }, { key: 'prototipo', es: 'en prototipo o borrador', en: 'a prototype or draft' },
    { key: 'avanzado', es: 'bastante avanzado', en: 'well underway' }, { key: 'terminado', es: 'terminado', en: 'finished' }
  ];
  var H_OPTS = [
    { key: 'conversar', es: 'conversemos primero', en: 'we talk first' }, { key: 'distribucion', es: 'lo distribuyan', en: 'you distribute it' },
    { key: 'coproduccion', es: 'lo coproduzcamos', en: 'we co-produce it' }, { key: 'produccion', es: 'lo produzcan ustedes', en: 'you produce it' }
  ];

  /* ---------- estado ---------- */
  var VIEWS = ['inicio', 'proyectos', 'formatos', 'estudio', 'contacto'];
  var params = new URLSearchParams(location.search);
  var lang = params.get('lang') || store.get('dm-lang') || ((navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');
  if (lang !== 'es' && lang !== 'en') lang = 'es';
  var cur = { project: 'firelights', format: 'comic', member: 'skynook' };
  var t = function (o) { return o[lang] != null ? o[lang] : o.es; };

  /* ---------- idioma ---------- */
  var ES = {};
  $$('[data-i18n]').forEach(function (n) { ES[n.dataset.i18n] = n.textContent; });
  $$('[data-i18n-html]').forEach(function (n) { ES[n.dataset.i18nHtml] = n.innerHTML; });
  $$('[data-i18n-ph]').forEach(function (n) { ES[n.dataset.i18nPh] = n.getAttribute('placeholder'); });
  $$('[data-i18n-aria]').forEach(function (n) { ES[n.dataset.i18nAria] = n.getAttribute('aria-label'); });
  $$('[data-i18n-alt]').forEach(function (n) { ES[n.dataset.i18nAlt] = n.getAttribute('alt'); });

  function applyLang() {
    var D = lang === 'en' ? EN : ES;
    var pick = function (k) { return D[k] != null ? D[k] : ES[k]; };
    document.documentElement.lang = lang;
    document.title = UI[lang].title;
    $$('[data-i18n]').forEach(function (n) { n.textContent = pick(n.dataset.i18n); });
    $$('[data-i18n-html]').forEach(function (n) { n.innerHTML = pick(n.dataset.i18nHtml); });
    $$('[data-i18n-ph]').forEach(function (n) { n.setAttribute('placeholder', pick(n.dataset.i18nPh)); });
    $$('[data-i18n-aria]').forEach(function (n) { n.setAttribute('aria-label', pick(n.dataset.i18nAria)); });
    $$('[data-i18n-alt]').forEach(function (n) { n.setAttribute('alt', pick(n.dataset.i18nAlt)); });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    $('#c-lang').value = lang;
    renderProjects(); renderFormats(); renderCrew(); fillSelects(); updatePreview();
    if ($('#c-status').dataset.state) setStatus('', '');
  }
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.dataset.lang; store.set('dm-lang', lang);
      var u = new URL(location.href); u.searchParams.set('lang', lang); history.replaceState(null, '', u);
      applyLang();
    });
  });

  /* ---------- pestañas ---------- */
  function show(name, focus) {
    if (VIEWS.indexOf(name) < 0) name = 'inicio';
    $$('.view').forEach(function (v) { v.hidden = v.dataset.name !== name; });
    $$('.tab').forEach(function (a) { if (a.dataset.view === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (focus) window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', function () { show(location.hash.slice(1), true); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-motive]');
    if (a) { $('#c-motivo').value = a.dataset.motive; updatePreview(); }
  });

  /* ---------- proyectos ---------- */
  function renderProjects() {
    var tabs = $('#proj-tabs'); tabs.textContent = '';
    PROJECTS.forEach(function (p) {
      var on = p.key === cur.project;
      var b = el('button', { type: 'button', role: 'tab', class: 'folder', 'aria-selected': String(on), 'aria-controls': 'proj-panel' });
      if (on) { b.style.background = p.ink; b.style.borderColor = p.ink; }
      b.appendChild(el('small', null, t(p.format)));
      b.appendChild(el('strong', null, p.name));
      b.addEventListener('click', function () { cur.project = p.key; renderProjects(); });
      tabs.appendChild(b);
    });
    var p = PROJECTS.filter(function (x) { return x.key === cur.project; })[0];
    var art = $('#proj-art'); art.textContent = '';
    if (p.logo) {
      art.style.background = '#0e0c11';
      art.style.backgroundImage = 'radial-gradient(circle, rgba(255,239,0,.16) 1.1px, transparent 1.6px)';
      art.appendChild(el('img', { src: p.logo, alt: 'Logo ' + p.name, width: '380', height: '380' }));
    } else {
      art.style.background = p.ink;
      art.style.backgroundImage = 'radial-gradient(circle, rgba(14,12,17,.18) 1.1px, transparent 1.6px)';
      art.appendChild(el('span', { class: 'stamp' }, t(p.status)));
    }
    art.style.backgroundSize = '9px 9px';
    $('#proj-panel').style.borderTopColor = p.ink;
    $('#proj-name').textContent = p.name;
    $('#proj-pitch').textContent = t(p.pitch);
    $('#proj-format').textContent = t(p.format);
    $('#proj-status').textContent = t(p.status);
    $('#proj-status').style.color = p.ink;
    $('#proj-genre').textContent = t(p.genre);
    $('#proj-crew').textContent = p.crew;
    $('#slate-count').textContent = String(PROJECTS.length).padStart(2, '0');
  }

  /* ---------- formatos ---------- */
  function renderFormats() {
    var box = $('#stickers'); box.textContent = '';
    FORMATS.forEach(function (f) {
      var on = f.key === cur.format;
      var b = el('button', { type: 'button', class: 'sticker', 'aria-pressed': String(on) }, t(f.name));
      b.style.background = f.bg; b.style.color = f.fg; b.style.fontSize = f.size + 'px';
      b.style.transform = 'rotate(' + (on ? 0 : f.rot) + 'deg)';
      if (f.dashed) b.style.borderStyle = 'dashed';
      if (f.round) b.style.borderRadius = '999px';
      b.addEventListener('click', function () { cur.format = f.key; renderFormats(); });
      box.appendChild(b);
    });
    var f = FORMATS.filter(function (x) { return x.key === cur.format; })[0];
    $('#fmt-name').textContent = t(f.name);
    $('#fmt-what').textContent = t(f.what);
    var ours = PROJECTS.filter(function (p) { return p.fmt === f.key; }).map(function (p) { return p.name + ' · ' + t(p.status); });
    $('#fmt-ours').textContent = ours.length ? ours.join(', ') : UI[lang].stillNone;
  }

  /* ---------- créditos ---------- */
  function renderCrew() {
    var box = $('#credits'); box.textContent = '';
    CREW.forEach(function (c) {
      var b = el('button', { type: 'button', class: 'credit', 'aria-pressed': String(c.key === cur.member) });
      b.appendChild(el('span', null, t(c.role)));
      b.appendChild(el('span', null, c.name));
      var pick = function () { if (cur.member !== c.key) { cur.member = c.key; renderCrew(); } };
      b.addEventListener('click', pick);
      b.addEventListener('mouseenter', pick);
      box.appendChild(b);
    });
    var w = CREW.filter(function (x) { return x.key === cur.member; })[0];
    var img = $('#who-photo');
    if (img.getAttribute('src') !== w.photo) img.setAttribute('src', w.photo);
    img.setAttribute('alt', (lang === 'en' ? 'Portrait of ' : 'Retrato de ') + w.name);
    $('#who-unit').textContent = w.unit;
    $('#who-name').textContent = w.name;
    $('#who-real').textContent = w.real;
    $('#who-bio').textContent = t(w.bio);
  }
  CREW.forEach(function (c) { var i = new Image(); i.src = c.photo; });

  /* ---------- formulario ---------- */
  var form = $('#letter');
  function fill(sel, opts, keep) {
    var s = $(sel), v = keep ? s.value : null;
    s.textContent = '';
    opts.forEach(function (o) { s.appendChild(el('option', { value: o.key }, o[lang])); });
    if (v) s.value = v;
  }
  function fillSelects() {
    var has = !!$('#c-motivo').options.length;
    fill('#c-motivo', MOTIVES, has); fill('#c-formato', F_OPTS, has); fill('#c-estado', S_OPTS, has); fill('#c-ayuda', H_OPTS, has);
    if (!has) $('#c-estado').value = 'prototipo';
  }
  var labelOf = function (list, key) { var o = list.filter(function (x) { return x.key === key; })[0]; return o ? o[lang] : ''; };
  var val = function (id) { return $(id).value.trim(); };
  var emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };

  function updatePreview() {
    var motive = $('#c-motivo').value || 'proyecto';
    var isP = motive === 'proyecto';
    $('#project-lines').hidden = !isP;
    var tag = MOTIVES.filter(function (m) { return m.key === motive; })[0].tag;
    var name = val('#c-nombre'), email = val('#c-correo');
    var subject = '[' + tag + '] ' + (isP
      ? (val('#c-titulo') || UI[lang].noName) + ' · ' + labelOf(F_OPTS, $('#c-formato').value) + ' · ' + labelOf(H_OPTS, $('#c-ayuda').value)
      : (name || UI[lang].yourName));
    $('#pv-from').textContent = (name || UI[lang].yourName) + ' <' + (email || 'tu@correo.cl') + '>';
    $('#pv-subject').textContent = subject;
    var lines = $('#pv-lines'); lines.textContent = '';
    if (isP) {
      var add = function (k, v) { var d = el('div'); d.appendChild(el('span', null, k)); d.appendChild(el('span', null, v)); lines.appendChild(d); };
      add(UI[lang].st, labelOf(S_OPTS, $('#c-estado').value));
      add(UI[lang].help, labelOf(H_OPTS, $('#c-ayuda').value));
      if (val('#c-enlace')) add(UI[lang].sample, val('#c-enlace'));
    }
    $('#pv-body').textContent = val('#c-mensaje') || UI[lang].bodyPh;
  }
  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') === 'true') e.target.removeAttribute('aria-invalid');
    if ($('#c-status').dataset.state === 'ok') { setStatus('', ''); $('#c-send').disabled = false; }
    updatePreview();
  });
  form.addEventListener('change', updatePreview);

  function setStatus(msg, kind) {
    var s = $('#c-status'); s.textContent = msg; s.className = 'status' + (kind ? ' ' + kind : ''); s.dataset.state = kind || '';
  }
  $('#c-t').value = String(Date.now());

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var U = UI[lang], miss = [], first = null;
    var mark = function (id, bad) { var n = $(id); if (bad) { n.setAttribute('aria-invalid', 'true'); first = first || n; } else n.removeAttribute('aria-invalid'); };
    var isP = $('#c-motivo').value === 'proyecto';
    var noName = !val('#c-nombre'), badMail = !emailOk(val('#c-correo')), noBody = !val('#c-mensaje') && !(isP && val('#c-titulo'));
    mark('#c-nombre', noName); mark('#c-correo', badMail); mark('#c-mensaje', noBody);
    if (noName) miss.push(U.name); if (badMail) miss.push(U.email); if (noBody) miss.push(U.body);
    if (miss.length) {
      var last = miss.pop();
      setStatus(U.missing + (miss.length ? miss.join(', ') + U.and : '') + last + '.', 'err');
      if (first) first.focus();
      return;
    }
    var btn = $('#c-send'); btn.disabled = true; setStatus(U.sending, '');
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (res) {
        if (res && res.ok) {
          setStatus(U.sent + val('#c-correo') + '.', 'ok');
          ['#c-titulo', '#c-enlace', '#c-mensaje'].forEach(function (id) { $(id).value = ''; });
          updatePreview();
        } else { setStatus((res && res.error) || U.fail, 'err'); btn.disabled = false; }
      })
      .catch(function () { setStatus(U.fail, 'err'); btn.disabled = false; });
  });

  /* ---------- inicio ---------- */
  applyLang();
  show(location.hash.slice(1), false);
})();
