const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const P=x=>Number.isFinite(x)?x.toLocaleString('es-MX',{style:'currency',currency:'MXN'}):'—',N=x=>(+x).toLocaleString('es-MX',{maximumFractionDigits:2});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const lee=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch{return d}},graba=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
let D=lee('ev-d',EJEMPLO()),I=lee('ev-i',invVacio()),A=lee('ev-a',{z:100,c:[]});
const campo=(k,t,min=0,step='any')=>`<label>${t}<input data-d="${k}" ${typeof D[k]=='number'?`type="number" min="${min}" step="${step}"`:''} value="${esc(D[k])}"></label>`;
const cel=(g,i,k,t)=>`<td><input aria-label="${t}, renglón ${i+1}" data-g="${g}" data-i="${i}" data-k="${k}" ${typeof D[g][i][k]=='number'?'type="number" min="0" step="any"':''} value="${esc(D[g][i][k])}"></td>`;
const quita=(g,i)=>`<td><button class="x" data-del="${g}" data-i="${i}" aria-label="Quitar ${esc(D[g][i].n)}">×</button></td>`;
function form(){
 $('#fProd').innerHTML=campo('nombre','Nombre')+campo('pres','Presentación')+campo('lote','Frascos por lote',1,1);
 $('#fPre').innerHTML=campo('rent','Rentabilidad sobre costo (%)')+campo('iva','IVA (%)')+campo('op','Gastos de operación por pieza ($)')+campo('prop','Precio propuesto con IVA ($)');
 $('#tMP').innerHTML='<thead><tr><th>Concepto<th>Usa por lote<th>Unidad<th>Precio de compra<th>Cantidad comprada<th>Costo<th>Quitar</tr></thead><tbody>'+D.mp.map((x,i)=>'<tr>'+cel('mp',i,'n','Concepto')+cel('mp',i,'c','Consumo')+cel('mp',i,'u','Unidad')+cel('mp',i,'p','Precio')+cel('mp',i,'q','Cantidad comprada')+`<td class="n" data-t="mp${i}"></td>`+quita('mp',i)+'</tr>').join('');
 $('#tMO').innerHTML='<thead><tr><th>Actividad<th>Horas por lote<th>Tarifa por hora<th>Costo<th>Quitar</tr></thead><tbody>'+D.mo.map((x,i)=>'<tr>'+cel('mo',i,'n','Actividad')+cel('mo',i,'h','Horas')+cel('mo',i,'t','Tarifa')+`<td class="n" data-t="mo${i}"></td>`+quita('mo',i)+'</tr>').join('');
 $('#tGIF').innerHTML='<thead><tr><th>Concepto<th>Importe por lote<th>Quitar</tr></thead><tbody>'+D.gif.map((x,i)=>'<tr>'+cel('gif',i,'n','Concepto')+cel('gif',i,'m','Importe')+quita('gif',i)+'</tr>').join('');pinta();}
const lin=(a,b,c='')=>`<div class="lin ${c}"><span>${a}</span><b>${b}</b></div>`;
function pinta(){const k=calcular(D);
 D.mp.forEach((x,i)=>$(`[data-t=mp${i}]`).textContent=P(x.q>0?x.c*x.p/x.q:0));D.mo.forEach((x,i)=>$(`[data-t=mo${i}]`).textContent=P(x.h*x.t));
 $('#resCosto').innerHTML='<h2>Resultado</h2>'+lin('Costo unitario',P(k.u),'gran')+'<h3>Por frasco</h3>'+lin('<i class="m1"></i>Materia prima',P(k.ump))+lin('<i class="m2"></i>Mano de obra',P(k.umo))+lin('<i class="m3"></i>Gastos indirectos',P(k.ugif))+
 `<div class="barra" aria-hidden="true"><i style="flex:${k.mp}"></i><i style="flex:${k.mo}"></i><i style="flex:${k.gif}"></i></div>`+
 `<h3>Por lote de ${N(D.lote)}</h3>`+lin('Costo primo',P(k.primo))+lin('Costo de conversión',P(k.conv))+lin('Costo de producción',P(k.prod));
 $('#resPre').innerHTML='<h2>Precios por frasco</h2>'+lin('Precio sin IVA',P(k.sin),'gran')+lin('IVA',P(k.iva))+lin('Precio con IVA',P(k.con),'gran')+lin('Costo total unitario',P(k.total))+lin('Utilidad por frasco',P(k.util));
 $('#compara').innerHTML='<div class="desliza"><table><thead><tr><th>Concepto<th class="n">Precio calculado<th class="n">Precio propuesto</tr></thead><tbody>'+[['Precio con IVA',P(k.con),P(D.prop)],['Precio sin IVA',P(k.sin),P(k.psin)],['Costo total unitario',P(k.total),P(k.total)],['Utilidad por frasco',P(k.util),P(k.putil)],['Rentabilidad sobre costo',N(D.rent)+' %',N(k.prent)+' %']].map(r=>'<tr>'+r.map((c,i)=>`<td${i?' class="n"':''}>${c}</td>`).join('')+'</tr>').join('')+'</tbody></table></div>';
 $('#resumen').innerHTML=[['Costo unitario',P(k.u)],['Precio sin IVA',P(k.sin)],['Precio con IVA',P(k.con)],['Frascos en existencia',N(I.pt.c)]].map(([a,b])=>`<div><b>${b}</b><span>${a}</span></div>`).join('');inv();}
function inv(){const sel=$('#fCompra select'),prev=sel.value,ns=[...new Set([...D.mp.map(x=>x.n),...Object.keys(I.mp)])];sel.innerHTML=ns.map(n=>`<option>${esc(n)}</option>`).join('');if(ns.includes(prev))sel.value=prev;
 $('#notaProd').textContent=`Cada lote da ${N(D.lote)} frascos y consume la receta de Costos.`;$('#notaVenta').textContent=`Disponibles: ${N(I.pt.c)} frascos.`;
 let val=0;const fil=ns.map(n=>{const x=I.mp[n]||{c:0,v:0},r=D.mp.find(m=>m.n==n),lot=r&&r.c?x.c/r.c:null;val+=x.v;return `<tr><td>${esc(n)}<td class="n">${N(x.c)} ${esc(r?.u||'')}<td class="n">${x.c?P(x.v/x.c):'—'}<td class="n">${P(x.v)}<td>${lot==null?'—':lot<1-1e-9?'<strong class="mal">Resurtir</strong>':'Alcanza para '+Math.floor(lot+1e-9)+' lote(s)'}</tr>`}).join('');
 val+=I.pt.v;$('#tInv').innerHTML='<thead><tr><th>Artículo<th class="n">Existencia<th class="n">Costo promedio<th class="n">Valor<th>Estado</tr></thead><tbody>'+fil+`<tr class="tot"><td>Producto terminado<td class="n">${N(I.pt.c)} frascos<td class="n">${I.pt.c?P(I.pt.v/I.pt.c):'—'}<td class="n">${P(I.pt.v)}<td>${I.pt.c<5?'<strong class="mal">Producir</strong>':'Suficiente'}</tr><tr class="tot"><td colspan="3">Valor total del inventario<td class="n">${P(val)}<td></tr>`;
 const m=I.mov.filter(x=>x.k!='Compra');$('#tKar').innerHTML='<thead><tr><th>Fecha<th>Movimiento<th class="n">Entra<th class="n">Sale<th class="n">Existencia<th class="n">Costo<th class="n">Saldo</tr></thead><tbody>'+(m.map(x=>`<tr><td>${new Date(x.f).toLocaleDateString('es-MX')}<td>${x.k}<td class="n">${x.e||''}<td class="n">${x.s||''}<td class="n">${x.c}<td class="n">${P(x.v)}<td class="n">${P(x.sv)}</tr>`).join('')||'<tr><td colspan="7">Todavía no hay movimientos. Registra una compra y después una producción.</tr>');}
document.addEventListener('input',e=>{const t=e.target,v=t.type=='number'?Math.max(0,+t.value||0):t.value;
 if(t.dataset.d)D[t.dataset.d]=t.dataset.d=='lote'?Math.max(1,Math.round(v)):v;else if(t.dataset.g)D[t.dataset.g][t.dataset.i][t.dataset.k]=v;else return;graba('ev-d',D);pinta();});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.add){D[b.dataset.add].push({mp:{n:'Nuevo material',c:0,u:'pza',p:0,q:1},mo:{n:'Nueva actividad',h:0,t:0},gif:{n:'Nuevo gasto',m:0}}[b.dataset.add]);graba('ev-d',D);form();}
 if(b.dataset.del){D[b.dataset.del].splice(b.dataset.i,1);graba('ev-d',D);form();}
 if(b.dataset.acc)acc(b.dataset.acc);});
const baja=(n,f)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['﻿'+f.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\r\n')],{type:'text/csv'}));a.download=n;a.click();};
$('#csv').onclick=()=>{const k=calcular(D),r=x=>x.toFixed(2);baja('hoja_de_costos.csv',[['Elemento','Por lote','Por frasco'],['Materia prima',r(k.mp),r(k.ump)],['Mano de obra',r(k.mo),r(k.umo)],['Gastos indirectos',r(k.gif),r(k.ugif)],['Costo de producción',r(k.prod),r(k.u)],['Precio sin IVA','',r(k.sin)],['IVA','',r(k.iva)],['Precio con IVA','',r(k.con)]])};
$('#csvInv').onclick=()=>baja('movimientos.csv',[['Fecha','Movimiento','Artículo','Entra','Sale','Valor'],...I.mov.map(x=>[new Date(x.f).toISOString(),x.k,x.n,x.e,x.s,x.v.toFixed(2)])]);
$('#imprimir').onclick=()=>print();$('#reset').onclick=()=>{if(confirm('¿Reemplazar tus datos de costos por los del ejemplo?')){D=EJEMPLO();graba('ev-d',D);form()}};
$('#limpInv').onclick=()=>{if(confirm('¿Borrar existencias y movimientos?')){I=invVacio();graba('ev-i',I);pinta()}};
const op=(f,ok)=>{const a=$('#aviso');try{I=f();graba('ev-i',I);a.className='ok';a.textContent=ok;pinta()}catch(x){a.className='mal';a.textContent=x.message}};
$('#fCompra').onsubmit=e=>{e.preventDefault();const f=e.target;op(()=>comprar(I,f.i.value,+f.c.value,+f.t.value),'Compra guardada.')};
$('#fProdu').onsubmit=e=>{e.preventDefault();op(()=>producir(I,D,+e.target.n.value),'Producción registrada.')};
$('#fVenta').onsubmit=e=>{e.preventDefault();op(()=>vender(I,D,+e.target.n.value),'Venta registrada.')};
$('#fPru').onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target)),k=calcular(D);
 $('#comp').innerHTML=`<article class="comp"><img src="img/logo.webp" alt="Logotipo de EVERIA" width="90" height="90"><div><h2>Comprobante de prueba</h2><p><b>${esc(f.nombre)}</b><br>${esc(f.carrera)} ${esc(f.grupo)}</p><p>Tareas completadas: 3 de 3. Facilidad: ${esc(f.fac)}/5. Claridad: ${esc(f.cla)}/5.</p><p>${esc(f.com)}</p><p>Costo unitario obtenido: <b>${P(k.u)}</b>. Precio con IVA: <b>${P(k.con)}</b>.</p><p>${new Date().toLocaleString('es-MX')}</p></div></article><button onclick="print()">Imprimir comprobante</button>`;$('#comp').scrollIntoView()};
function acc(k){if(k=='mas')A.z=Math.min(160,A.z+10);else if(k=='menos')A.z=Math.max(90,A.z-10);else if(k=='limpiar'){A={z:100,c:[]};window.speechSynthesis?.cancel()}else if(k=='voz'){const s=window.speechSynthesis;if(!s)return alert('Este navegador no permite leer en voz alta.');if(s.speaking)return s.cancel();const v=$('.vista:not([hidden])'),u=new SpeechSynthesisUtterance(v.innerText.slice(0,3500));u.lang='es-MX';s.speak(u);return}else A.c=A.c.includes(k)?A.c.filter(x=>x!=k):[...A.c,k];graba('ev-a',A);aplica();}
function aplica(){document.documentElement.style.fontSize=A.z+'%';document.body.className=A.c.join(' ');$$('[data-acc][aria-pressed]').forEach(b=>b.setAttribute('aria-pressed',A.c.includes(b.dataset.acc)))}
const tog=v=>{$('#panelAcc').hidden=!v;$('#abrirAcc').setAttribute('aria-expanded',v)};$('#abrirAcc').onclick=()=>tog($('#panelAcc').hidden);
document.addEventListener('keydown',e=>{if(e.key=='Escape'&&!$('#panelAcc').hidden){tog(false);$('#abrirAcc').focus()}});
function ruta(){let h=location.hash.slice(1);if(h=='contenido'){$('#contenido').focus();return}if(!$$('.vista').some(v=>v.id==h))h='inicio';$$('.vista').forEach(v=>v.hidden=v.id!=h);$$('nav a').forEach(a=>a.getAttribute('href')=='#'+h?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));scrollTo(0,0);window.speechSynthesis?.cancel()}
addEventListener('hashchange',ruta);aplica();form();ruta();
