// Cálculos puros: se usan en la aplicación y en las pruebas.
const EJEMPLO=()=>({nombre:'EVERIA · Exfoliante natural',pres:'Frasco de 30 ml',lote:10,
 mp:[['Arroz',200,'g',4.44,200],['Jabón corporal',30,'ml',4.5,30],['Miel de abeja',10,'g',1.8,10],['Aceite de coco',10,'ml',4.08,10],['Flor de Jamaica',1.2,'g',1.63,1.2],['Frasco 30 ml',10,'pza',20,10],['Etiqueta',10,'pza',1.34,10]].map(([n,c,u,p,q])=>({n,c,u,p,q})),
 mo:[{n:'Elaboración y envasado',h:.75,t:40}],
 gif:[{n:'Energía eléctrica (licuadora)',m:2},{n:'Gas (infusión)',m:3},{n:'Agua y limpieza',m:3},{n:'Desgaste de utensilios',m:2}],
 rent:35,iva:16,op:0,prop:10});
function calcular(d){const s=(a,f)=>a.reduce((x,y)=>x+f(y),0),L=d.lote>0?d.lote:NaN;
 const mp=s(d.mp,x=>x.q>0?x.c*x.p/x.q:0),mo=s(d.mo,x=>x.h*x.t),gif=s(d.gif,x=>x.m);
 const prod=mp+mo+gif,u=prod/L,total=u+d.op,sin=total*(1+d.rent/100),iva=sin*d.iva/100;
 const psin=d.prop/(1+d.iva/100);
 return{mp,mo,gif,prod,primo:mp+mo,conv:mo+gif,ump:mp/L,umo:mo/L,ugif:gif/L,u,total,sin,iva,con:sin+iva,util:sin-total,psin,putil:psin-total,prent:total?(psin-total)/total*100:0};}
// Inventario perpetuo a costo promedio. Cada función devuelve un estado nuevo o lanza un error claro.
const invVacio=()=>({mp:{},pt:{c:0,v:0},mov:[]});
const copia=o=>JSON.parse(JSON.stringify(o));
function comprar(inv,n,c,t){if(!(c>0)||!(t>=0))throw Error('Escribe una cantidad mayor que cero y un costo válido.');
 const r=copia(inv),x=r.mp[n]||{c:0,v:0};x.c+=c;x.v+=t;r.mp[n]=x;r.mov.push({k:'Compra',n,e:c,s:0,v:t,f:Date.now()});return r;}
function producir(inv,d,lotes){if(!Number.isInteger(lotes)||lotes<1)throw Error('El número de lotes debe ser un entero mayor que cero.');
 const req={};d.mp.forEach(m=>req[m.n]=(req[m.n]||0)+m.c*lotes);
 const falta=Object.keys(req).filter(n=>(inv.mp[n]?.c||0)+1e-9<req[n]);
 if(falta.length)throw Error('No alcanza la materia prima: '+falta.join(', ')+'.');
 const r=copia(inv);let mat=0;for(const n in req){if(!req[n])continue;const x=r.mp[n],p=x.v/x.c;mat+=p*req[n];x.v-=p*req[n];x.c-=req[n];if(x.c<1e-9){x.c=0;x.v=0}}
 const k=calcular(d),v=mat+(k.mo+k.gif)*lotes,q=d.lote*lotes;r.pt.c+=q;r.pt.v+=v;r.mov.push({k:'Producción',n:d.nombre,e:q,s:0,v,f:Date.now(),c:r.pt.c,sv:r.pt.v});return r;}
function vender(inv,d,q){if(!Number.isInteger(q)||q<1)throw Error('Escribe un número entero de frascos.');if(q>inv.pt.c)throw Error('Solo hay '+inv.pt.c+' frascos en existencia.');
 const r=copia(inv),v=r.pt.v/r.pt.c*q;r.pt.c-=q;r.pt.v-=v;if(!r.pt.c)r.pt.v=0;r.mov.push({k:'Venta',n:d.nombre,e:0,s:q,v,f:Date.now(),c:r.pt.c,sv:r.pt.v});return r;}
if(typeof module!=='undefined')module.exports={EJEMPLO,calcular,invVacio,comprar,producir,vender};
