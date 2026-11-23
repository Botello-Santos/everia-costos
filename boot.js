// Activa el servidor del navegador antes de abrir la aplicación.
const base = new URL('.', import.meta.url).href;
const modulo = new URL(import.meta.url).searchParams.get('m');
if (!('serviceWorker' in navigator)) document.body.insertAdjacentHTML('afterbegin', '<p role="alert">Este navegador no permite abrir EVERIA. Usa una ventana normal (no privada) de Chrome, Edge, Firefox o Safari.</p>');
else {
  const cambio = new Promise((ok) => navigator.serviceWorker.addEventListener('controllerchange', ok, { once: true }));
  await navigator.serviceWorker.register(`${base}sw.js`);
  await navigator.serviceWorker.ready;
  if (!navigator.serviceWorker.controller) await Promise.race([cambio, new Promise((ok) => setTimeout(ok, 6000))]);
  if (!navigator.serviceWorker.controller && !sessionStorage.getItem('ev-r')) { sessionStorage.setItem('ev-r', '1'); location.reload(); }
  else { sessionStorage.removeItem('ev-r'); await import(modulo); }
}
