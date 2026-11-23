// Panel de accesibilidad compartido por el sitio y el panel de EVERIA.
(() => {
  const K = 'everia-acc'; let a = { z: 100, c: [] };
  try { a = { ...a, ...JSON.parse(localStorage.getItem(K)) }; } catch { /* valores iniciales */ }
  const css = document.createElement('style');
  css.textContent = `#acc-b{position:fixed;left:14px;bottom:14px;z-index:99998;min-height:44px;padding:.5rem .9rem;border:2px solid #fff;border-radius:8px;background:#48552f;color:#fff;font:600 15px system-ui;cursor:pointer;box-shadow:0 2px 10px #0005}
#acc-p{position:fixed;left:14px;bottom:70px;z-index:99999;width:270px;max-height:75vh;overflow:auto;background:#fffdf8;color:#222;border:1px solid #777;border-radius:10px;padding:14px;display:grid;gap:8px;font:15px/1.4 system-ui;box-shadow:0 8px 30px #0005}#acc-p[hidden]{display:none}
#acc-p h2{font:600 18px system-ui;margin:0;color:#222}#acc-p button{font:inherit;min-height:42px;border:1px solid #48552f;border-radius:7px;background:#fff;color:#222;cursor:pointer}#acc-p button[aria-pressed=true]{background:#48552f;color:#fff}#acc-p div{display:flex;gap:8px}#acc-p div button{flex:1}#acc-p p{margin:0;font-size:13px}
#acc-b:focus-visible,#acc-p button:focus-visible{outline:3px solid #1a5fb4;outline-offset:2px}
html.acc-contraste body,html.acc-contraste body *:not(img):not(canvas):not(svg):not(svg *):not(option){background-color:#000!important;color:#fff!important;border-color:#fff!important;text-shadow:none!important;box-shadow:none!important;background-image:none!important}
html.acc-contraste body a,html.acc-contraste body a *,html.acc-contraste body button,html.acc-contraste body button *{color:#ffe14d!important}html.acc-contraste #acc-p button[aria-pressed=true]{outline:3px solid #ffe14d}
html.acc-letra body,html.acc-letra body *{font-family:Verdana,Tahoma,sans-serif!important;letter-spacing:.04em!important;word-spacing:.12em!important;line-height:1.7!important}
html.acc-enlaces a{text-decoration:underline!important;text-decoration-thickness:2px!important;background:#ffec8a!important;color:#111!important}html.acc-enlaces a *{color:#111!important}
html.acc-botones button,html.acc-botones .btn,html.acc-botones input,html.acc-botones select{min-height:54px!important;font-size:1.1em!important}
html.acc-quieto *,html.acc-quieto *::before{animation:none!important;transition:none!important;scroll-behavior:auto!important}@media print{#acc-b,#acc-p{display:none!important}}`;
  document.head.append(css);
  const b = document.createElement('button'); b.id = 'acc-b'; b.type = 'button'; b.textContent = 'Accesibilidad'; b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', 'acc-p');
  const p = document.createElement('aside'); p.id = 'acc-p'; p.hidden = true; p.setAttribute('aria-label', 'Opciones de accesibilidad');
  p.innerHTML = '<h2>Accesibilidad</h2><div><button type="button" data-a="-" aria-label="Reducir tamaño">A−</button><button type="button" data-a="+" aria-label="Aumentar tamaño">A+</button></div>' +
    [['contraste', 'Alto contraste'], ['letra', 'Letra más legible'], ['enlaces', 'Resaltar enlaces'], ['botones', 'Botones grandes'], ['quieto', 'Detener animaciones']].map(([k, t]) => `<button type="button" data-a="${k}" aria-pressed="false">${t}</button>`).join('') +
    '<button type="button" data-a="voz">Leer en voz alta</button><button type="button" data-a="r">Restablecer</button><p>Con teclado: Tab avanza, Enter activa y Esc cierra.</p>';
  const aplica = () => {
    const h = document.documentElement; h.style.zoom = a.z === 100 ? '' : a.z / 100;
    ['contraste', 'letra', 'enlaces', 'botones', 'quieto'].forEach((k) => h.classList.toggle(`acc-${k}`, a.c.includes(k)));
    p.querySelectorAll('[aria-pressed]').forEach((x) => x.setAttribute('aria-pressed', String(a.c.includes(x.dataset.a))));
    try { localStorage.setItem(K, JSON.stringify(a)); } catch { /* sin almacenamiento */ }
  };
  const abrir = (v) => { p.hidden = !v; b.setAttribute('aria-expanded', String(v)); };
  b.onclick = () => abrir(p.hidden);
  p.onclick = (e) => {
    const k = e.target.dataset?.a; if (!k) return; const s = window.speechSynthesis;
    if (k === '+') a.z = Math.min(150, a.z + 10); else if (k === '-') a.z = Math.max(90, a.z - 10);
    else if (k === 'r') { a = { z: 100, c: [] }; s?.cancel(); }
    else if (k === 'voz') { if (!s) return; if (s.speaking) return s.cancel(); const u = new SpeechSynthesisUtterance((document.querySelector('main') ?? document.body).innerText.slice(0, 3000)); u.lang = 'es-MX'; s.speak(u); return; }
    else a.c = a.c.includes(k) ? a.c.filter((x) => x !== k) : [...a.c, k];
    aplica();
  };
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !p.hidden) { abrir(false); b.focus(); } });
  const poner = () => { document.body.append(b, p); aplica(); };
  if (document.body) poner(); else addEventListener('DOMContentLoaded', poner);
})();
