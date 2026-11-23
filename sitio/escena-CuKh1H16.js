var e=()=>{let e=new Float32Array(16);return e[0]=e[5]=e[10]=e[15]=1,e};function t(e,t){let n=new Float32Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++)n[r*4+i]=e[i]*t[r*4]+e[4+i]*t[r*4+1]+e[8+i]*t[r*4+2]+e[12+i]*t[r*4+3];return n}function n(e,t,n,r){let i=1/Math.tan(e/2),a=new Float32Array(16);return a[0]=i/t,a[5]=i,a[10]=(r+n)/(n-r),a[11]=-1,a[14]=2*r*n/(n-r),a}function r(t,n){let r=t[0]-n[0],i=t[1]-n[1],a=t[2]-n[2],o=Math.hypot(r,i,a);r/=o,i/=o,a/=o;let s=a,c=-r;o=Math.hypot(s,0,c),s/=o,c/=o;let l=i*c-a*0,u=a*s-r*c,d=r*0-i*s,f=e();return f[0]=s,f[4]=0,f[8]=c,f[1]=l,f[5]=u,f[9]=d,f[2]=r,f[6]=i,f[10]=a,f[12]=-(s*t[0]+0*t[1]+c*t[2]),f[13]=-(l*t[0]+u*t[1]+d*t[2]),f[14]=-(r*t[0]+i*t[1]+a*t[2]),f}function i(t){let n=e(),r=Math.cos(t),i=Math.sin(t);return n[0]=r,n[2]=-i,n[8]=i,n[10]=r,n}function a(t){let n=e(),r=Math.cos(t),i=Math.sin(t);return n[5]=r,n[6]=i,n[9]=-i,n[10]=r,n}function o(t,n,r){let i=e();return i[12]=t,i[13]=n,i[14]=r,i}var s=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},c=(e,t,n)=>e+(t-e)*n;function l(e,t,n=-Math.PI){let r=e,i=r.length,a=t+1,o=[],s=[],c=[],l=[],u=[0];for(let e=1;e<i;e++)u.push(u[e-1]+Math.hypot(r[e][0]-r[e-1][0],r[e][1]-r[e-1][1]));for(let e=0;e<i;e++){let l=r[Math.max(0,e-1)],d=r[Math.min(i-1,e+1)],f=d[0]-l[0],p=d[1]-l[1],m=Math.hypot(f,p)||1;f/=m,p/=m;let h=p,g=-f;for(let l=0;l<a;l++){let a=l/t,d=n+a*Math.PI*2,f=Math.sin(d),p=Math.cos(d);o.push(r[e][0]*f,r[e][1],r[e][0]*p),s.push(h*f,g,h*p),c.push(a,u[e]/u[i-1])}}for(let e=0;e<i-1;e++)for(let n=0;n<t;n++){let t=e*a+n,r=t+1,i=t+a,o=i+1;l.push(t,i,r,r,i,o)}let d=o.length/3>65535?Uint32Array:Uint16Array;return{pos:new Float32Array(o),nor:new Float32Array(s),uv:new Float32Array(c),idx:new d(l)}}function u(e,t,n,r,i,a=6){let o=[];for(let s=0;s<=a;s++){let c=r+(i-r)*s/a;o.push([e+Math.cos(c)*n,t+Math.sin(c)*n])}return o}function d(e,t,n,r=10,i=7){let a=[],o=[],s=[],c=[];for(let c=0;c<=i;c++){let l=c/i,u=l*Math.PI;for(let i=0;i<=r;i++){let c=i/r,d=c*Math.PI*2,f=Math.sin(u)*Math.cos(d),p=Math.cos(u),m=Math.sin(u)*Math.sin(d);a.push(f*e,p*t,m*n);let h=f/e,g=p/t,_=m/n,v=Math.hypot(h,g,_);o.push(h/v,g/v,_/v),s.push(c,l)}}for(let e=0;e<i;e++)for(let t=0;t<r;t++){let n=e*(r+1)+t,i=n+1,a=n+r+1,o=a+1;c.push(n,a,i,i,a,o)}return{pos:new Float32Array(a),nor:new Float32Array(o),uv:new Float32Array(s),idx:new Uint16Array(c)}}function f(){let e=[],t=[],n=[],r=[];for(let r=0;r<=8;r++)for(let i=0;i<=8;i++){let a=i/8,o=r/8,s=(a-.5)*.22,c=(o-.5)*.3,l=-.06*(s*s*40)+.03*Math.sin(o*3.1);e.push(s,c,l),t.push(s*.8,0,1),n.push(a,o)}for(let e=0;e<8;e++)for(let t=0;t<8;t++){let n=e*9+t,i=n+1,a=n+8+1,o=a+1;r.push(n,a,i,i,a,o)}let i=new Float32Array(t);for(let e=0;e<i.length;e+=3){let t=Math.hypot(i[e],i[e+1],i[e+2]);i[e]/=t,i[e+1]/=t,i[e+2]/=t}return{pos:new Float32Array(e),nor:i,uv:new Float32Array(n),idx:new Uint16Array(r)}}function p(e){return{pos:new Float32Array([-e,0,-e,e,0,-e,-e,0,e,e,0,e]),nor:new Float32Array([0,1,0,0,1,0,0,1,0,0,1,0]),uv:new Float32Array([0,0,1,0,0,1,1,1]),idx:new Uint16Array([0,2,1,1,2,3])}}var m=1,h=[[0,0],[.8,0],...u(.88,.1,.1,-Math.PI/2,0,5),[m,.4],[m,1.2],[m,1.5],...u(.9,1.52,.1,0,Math.PI/2,5),[.86,1.62],[.88,1.64],[.88,1.8]],g=[[0,.05],[.8,.05],...u(.86,.12,.08,-Math.PI/2,0,4),[.945,.5],[.945,1.38],...u(.84,1.4,.1,0,Math.PI/2,4),[.6,1.52],[.3,1.55],[0,1.53]],_=[[1.006,.28],[1.006,.6],[1.006,1],[1.006,1.32]],v=[[.93,1.6],[1.05,1.6],[1.06,1.63],[1.06,1.8],[1.06,1.98],...u(.98,2,.08,0,Math.PI/2,6),[.6,2.085],[0,2.09]],y=`#version 300 es
layout(location=0) in vec3 aPos; layout(location=1) in vec3 aNor; layout(location=2) in vec2 aUv; layout(location=3) in vec4 aInst;
uniform mat4 uProj, uView, uModel; uniform int uMode; uniform float uTime, uRise;
out vec3 vPos; out vec3 vNor; out vec2 vUv; out float vSeed; out vec3 vLocal;
mat3 rot(vec3 a, float g){ a=normalize(a); float s=sin(g), c=cos(g), o=1.0-c;
  return mat3(o*a.x*a.x+c, o*a.x*a.y+a.z*s, o*a.z*a.x-a.y*s, o*a.x*a.y-a.z*s, o*a.y*a.y+c, o*a.y*a.z+a.x*s, o*a.z*a.x+a.y*s, o*a.y*a.z-a.x*s, o*a.z*a.z+c); }
void main(){
  vec3 p = aPos, n = aNor; vSeed = aInst.w; vUv = aUv; vLocal = aPos;
  if (uMode >= 5) {
    float s = aInst.w;
    mat3 R = rot(vec3(sin(s*12.9), cos(s*78.2), sin(s*37.7)+0.3), uTime*(0.25+fract(s*9.1)*0.5) + s*6.283);
    float k = (uMode == 6) ? 1.0 : 0.6 + fract(s*7.7)*0.8;
    p = R*(p*k); n = R*n;
    vec3 c = aInst.xyz;
    c.y += sin(uTime*0.45 + s*20.0)*0.09 + uRise*(0.5 + fract(s*3.3)*1.2);
    c.x += cos(uTime*0.3 + s*11.0)*0.06;
    p += c;
  } else {
    p = (uModel*vec4(p,1.0)).xyz; n = mat3(uModel)*n;
  }
  vPos = p; vNor = n;
  gl_Position = uProj*uView*vec4(p,1.0);
}`,b=`#version 300 es
precision highp float; precision highp int;
in vec3 vPos; in vec3 vNor; in vec2 vUv; in float vSeed; in vec3 vLocal;
uniform vec3 uCam; uniform int uMode; uniform sampler2D uLabel; uniform float uTime; uniform vec3 uJar;
out vec4 o;
const vec3 L1 = normalize(vec3(-0.55, 0.75, 0.6));  // luz principal (softbox arriba a la izquierda)
const vec3 L2 = normalize(vec3(0.85, 0.25, -0.45)); // contraluz
float h1(vec3 p){ p = fract(p*0.3183099 + 0.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float ruido(vec3 x){ vec3 i = floor(x), f = fract(x); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(h1(i),h1(i+vec3(1,0,0)),f.x), mix(h1(i+vec3(0,1,0)),h1(i+vec3(1,1,0)),f.x), f.y),
             mix(mix(h1(i+vec3(0,0,1)),h1(i+vec3(1,0,1)),f.x), mix(h1(i+vec3(0,1,1)),h1(i+vec3(1,1,1)),f.x), f.y), f.z); }
vec3 lin(vec3 c){ return pow(c, vec3(2.2)); }
vec3 entorno(vec3 r){
  vec3 base = mix(vec3(0.42,0.38,0.33), vec3(1.0,0.96,0.9), smoothstep(-0.35, 0.6, r.y));
  float caja = smoothstep(0.82, 0.97, dot(r, normalize(vec3(-0.6,0.6,0.55))));
  float az = atan(r.x, r.z);
  float tira = smoothstep(0.14, 0.04, abs(az-1.25)) * smoothstep(-0.4, 0.0, r.y) * smoothstep(0.85, 0.5, r.y);
  float tira2 = smoothstep(0.1, 0.03, abs(az+2.2)) * smoothstep(-0.2, 0.2, r.y) * smoothstep(0.9, 0.6, r.y);
  return base*0.75 + vec3(1.0,0.97,0.92)*(caja*3.2 + tira*2.2) + vec3(0.9,0.75,0.8)*tira2*0.9;
}
vec3 iluminar(vec3 alb, vec3 N, vec3 V, float rugosidad, float brillo, float envolver){
  float d1 = max((dot(N,L1)+envolver)/(1.0+envolver), 0.0);
  float d2 = max(dot(N,L2), 0.0);
  vec3 hemi = mix(vec3(0.33,0.29,0.26), vec3(0.95,0.93,0.9), N.y*0.5+0.5);
  vec3 H = normalize(L1+V);
  float sh = mix(220.0, 12.0, rugosidad);
  float esp = pow(max(dot(N,H),0.0), sh) * (sh+8.0)/25.0 * brillo;
  float fr = 0.04 + 0.96*pow(1.0-max(dot(N,V),0.0), 5.0);
  vec3 refl = entorno(reflect(-V,N)) * fr * brillo * (1.0-rugosidad*0.85);
  return alb*(d1*vec3(1.0,0.96,0.9)*1.15 + d2*vec3(0.75,0.7,0.85)*0.35 + hemi*0.42) + vec3(1.0,0.97,0.93)*esp + refl;
}
vec3 tono(vec3 x){ x *= 1.05; return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0.0, 1.0); }
vec3 srgb(vec3 c){ return pow(tono(c), vec3(1.0/2.2)); }
void main(){
  vec3 N = normalize(vNor); if (!gl_FrontFacing && uMode != 3) N = -N;
  vec3 V = normalize(uCam - vPos);
  vec3 col; float a = 1.0;
  if (uMode == 0) {            // exfoliante: lila de Jamaica con granos de arroz molido
    vec3 q = vLocal*46.0;
    float g = ruido(q), g2 = ruido(q*2.3+7.0);
    vec3 alb = lin(vec3(0.80,0.69,0.77));
    alb = mix(alb, lin(vec3(0.94,0.90,0.92)), smoothstep(0.7, 0.86, g2)*0.6);
    alb *= 0.9 + 0.14*g;
    vec3 Np = normalize(N + 0.35*vec3(g-0.5, g2-0.5, ruido(q+3.0)-0.5));
    col = iluminar(alb, Np, V, 0.85, 0.15, 0.6);
  } else if (uMode == 1) {     // etiqueta de papel
    vec3 t = texture(uLabel, vUv).rgb;
    float fibra = ruido(vec3(vUv*vec2(900.0,160.0), 1.0));
    col = iluminar(lin(t)*(1.12+0.06*fibra), N, V, 0.9, 0.12, 0.55);
  } else if (uMode == 2) {     // tapa blanca con estrías laterales
    vec3 Nt = N;
    if (abs(N.y) < 0.5) { float ang = atan(vLocal.x, vLocal.z); Nt = normalize(N + vec3(cos(ang),0.0,-sin(ang))*sin(ang*120.0)*0.12); }
    col = iluminar(lin(vec3(0.95,0.94,0.92)), Nt, V, 0.32, 0.55, 0.2);
  } else if (uMode == 3) {     // vidrio (dos caras, mezcla premultiplicada)
    float nv = abs(dot(N,V));
    float fr = 0.05 + 0.95*pow(1.0-nv, 4.0);
    vec3 Nr = gl_FrontFacing ? N : -N;
    vec3 refl = entorno(reflect(-V, Nr));
    vec3 H = normalize(L1+V);
    float esp = pow(max(dot(Nr,H),0.0), 300.0)*6.0;
    col = refl*fr + vec3(esp);
    a = clamp(fr*0.85 + 0.035 + esp*0.3, 0.0, 0.95);
    o = vec4(srgb(col/max(a,0.001))*a, a); return;
  } else if (uMode == 4) {     // suelo: solo sombra suave (el fondo es la página)
    vec2 d = vPos.xz - uJar.xz;
    float r = length(d*vec2(1.0,1.15));
    float sombra = (1.0 - smoothstep(0.65, 2.4, r))*0.34 + (1.0 - smoothstep(0.85, 1.12, r))*0.32;
    vec2 dl = d - vec2(0.55,-0.5);
    sombra += (1.0 - smoothstep(0.3, 2.3, length(dl*vec2(0.8,1.0))))*0.12;
    a = clamp(sombra, 0.0, 0.62);
    o = vec4(vec3(0.24,0.2,0.16)*a, a); return;
  } else if (uMode == 5) {     // grano de arroz
    vec3 alb = lin(vec3(0.96,0.94,0.89))*(0.92+0.1*fract(vSeed*13.0));
    col = iluminar(alb, N, V, 0.45, 0.35, 0.7) + lin(vec3(1.0,0.95,0.85))*0.08;
  } else {                     // pétalo seco de Jamaica
    vec2 p = vUv - vec2(0.5, 0.0);
    float ancho = sin(clamp(vUv.y,0.0,1.0)*3.14159)*0.5*(0.55+0.45*vUv.y);
    if (abs(p.x) > ancho) discard;
    float vena = smoothstep(0.03, 0.0, abs(p.x))*0.25 + (1.0-smoothstep(0.0,0.02,abs(fract(p.x*9.0)-0.5)))*0.08;
    vec3 alb = mix(lin(vec3(0.42,0.06,0.15)), lin(vec3(0.66,0.13,0.27)), vUv.y);
    alb *= 1.0 - vena;
    col = iluminar(alb, N, V, 0.55, 0.3, 0.5);
    col += lin(vec3(0.8,0.15,0.3))*max(dot(-N,L1),0.0)*0.35;   // luz que atraviesa el pétalo
  }
  o = vec4(srgb(col), a);
}`;function x(e,t,n,r,i){e.save(),e.translate(t,n),e.scale(r,r),e.strokeStyle=i,e.fillStyle=i,e.lineWidth=2.2,e.lineCap=`round`,e.beginPath(),e.moveTo(0,60),e.bezierCurveTo(4,30,12,0,30,-40),e.stroke();let a=(t,n,r,i)=>{e.save(),e.translate(t,n),e.rotate(r),e.beginPath(),e.moveTo(0,0),e.bezierCurveTo(i*.3,-i*.28,i*.75,-i*.25,i,0),e.bezierCurveTo(i*.75,i*.2,i*.3,i*.22,0,0),e.globalAlpha=.18,e.fill(),e.globalAlpha=1,e.lineWidth=1.6,e.stroke(),e.beginPath(),e.moveTo(0,0),e.lineTo(i*.9,0),e.lineWidth=.9,e.stroke();for(let t=1;t<5;t++)e.beginPath(),e.moveTo(i*t*.18,0),e.lineTo(i*t*.18+i*.08,-i*.08),e.moveTo(i*t*.18,0),e.lineTo(i*t*.18+i*.08,i*.07),e.stroke();e.restore()};a(6,34,Math.PI*1.05,52),a(9,18,-.45,58),a(18,-6,Math.PI*1.12,48),a(22,-14,-.7,50),a(30,-40,-1.45,46),e.restore()}function S(e,t){let n=t,r=Math.round(t/6.32),i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`),o=r/324,s=a.createLinearGradient(0,0,0,r);s.addColorStop(0,`#efe6d3`),s.addColorStop(1,`#e6dcc6`),a.fillStyle=s,a.fillRect(0,0,n,r);for(let e=0;e<n*r*.0025;e++)a.fillStyle=`rgba(90,80,50,${Math.random()*.05})`,a.fillRect(Math.random()*n,Math.random()*r,1.5*o,1.5*o);let c=`#4b5433`,l=`"Palatino Linotype","Book Antiqua",Palatino,"Iowan Old Style",Constantia,Georgia,serif`,u=n/2;a.textAlign=`center`,a.textBaseline=`alphabetic`,a.fillStyle=c,a.strokeStyle=c,a.lineWidth=1.4*o,a.beginPath(),a.arc(u,r*.53,r*.43,Math.PI*1.08,Math.PI*1.92),a.stroke(),a.beginPath(),a.arc(u,r*.53,r*.43,Math.PI*.12,Math.PI*.88),a.stroke(),x(a,u-6*o,r*.27,.9*o,c),a.font=`${Math.round(78*o)}px ${l}`,`letterSpacing`in a&&(a.letterSpacing=`${Math.round(10*o)}px`),a.fillText(e.toUpperCase().slice(0,14),u+5*o,r*.63),a.font=`${Math.round(17*o)}px "Segoe UI",system-ui,sans-serif`,`letterSpacing`in a&&(a.letterSpacing=`${Math.round(5*o)}px`),a.fillText(`EXFOLIANTE NATURAL`,u+2*o,r*.72),a.lineWidth=1*o,a.beginPath(),a.moveTo(u-70*o,r*.775),a.lineTo(u-14*o,r*.775),a.moveTo(u+14*o,r*.775),a.lineTo(u+70*o,r*.775),a.stroke(),a.beginPath(),a.ellipse(u,r*.775,6*o,3*o,-.6,0,Math.PI*2),a.fill(),`letterSpacing`in a&&(a.letterSpacing=`0px`),a.font=`italic ${Math.round(21*o)}px ${l}`,a.fillText(`Naturaleza que inspira tu cuidado`,u,r*.86),a.font=`${Math.round(11*o)}px "Segoe UI",system-ui,sans-serif`,a.fillText(`CONT. NET. 30 ml`,u,r*.95),x(a,u-300*o,r*.62,1.15*o,`rgba(75,84,51,0.75)`),x(a,u+300*o,r*.62,1.15*o,`rgba(75,84,51,0.75)`);let d=(e,t,n)=>{a.textAlign=`left`,a.font=`600 ${Math.round(15*o)}px "Segoe UI",system-ui,sans-serif`,`letterSpacing`in a&&(a.letterSpacing=`${Math.round(3*o)}px`),a.fillText(t,e,r*.24),`letterSpacing`in a&&(a.letterSpacing=`0px`),a.font=`${Math.round(16*o)}px ${l}`,n.forEach((t,n)=>a.fillText(t,e,r*.36+n*25*o))};return d(u-960*o,`INGREDIENTES`,[`Arroz molido`,`Jabón corporal`,`Miel de abeja`,`Aceite de coco`,`Té de Jamaica`]),d(u+610*o,`MODO DE USO`,[`Sobre piel húmeda,`,`masajea en círculos`,`suaves y enjuaga con`,`agua tibia. Después,`,`hidrata.`]),a.globalAlpha=.25,a.fillRect(0,0,2*o,r),a.globalAlpha=1,i}function C(u,m){let x=u.getContext(`webgl2`,{alpha:!0,antialias:!0,premultipliedAlpha:!0,powerPreference:`high-performance`});if(!x)return m.alFallar(`Este navegador no tiene WebGL2.`),null;let C=x,w=(e,t)=>{let n=C.createShader(e);if(C.shaderSource(n,t),C.compileShader(n),!C.getShaderParameter(n,C.COMPILE_STATUS))throw Error(C.getShaderInfoLog(n)||`shader`);return n},T;try{if(T=C.createProgram(),C.attachShader(T,w(C.VERTEX_SHADER,y)),C.attachShader(T,w(C.FRAGMENT_SHADER,b)),C.linkProgram(T),!C.getProgramParameter(T,C.LINK_STATUS))throw Error(C.getProgramInfoLog(T)||`link`)}catch(e){return console.warn(`[escena] shader`,e),m.alFallar(`No se pudo preparar el 3D en este equipo.`),null}let E=e=>C.getUniformLocation(T,e),D={proj:E(`uProj`),view:E(`uView`),model:E(`uModel`),mode:E(`uMode`),time:E(`uTime`),rise:E(`uRise`),cam:E(`uCam`),label:E(`uLabel`),jar:E(`uJar`)},O=[],k=(e,t)=>{let n=C.createVertexArray();C.bindVertexArray(n);let r=(e,t,n)=>{let r=C.createBuffer();O.push(r),C.bindBuffer(C.ARRAY_BUFFER,r),C.bufferData(C.ARRAY_BUFFER,t,C.STATIC_DRAW),C.enableVertexAttribArray(e),C.vertexAttribPointer(e,n,C.FLOAT,!1,0,0)};r(0,e.pos,3),r(1,e.nor,3),r(2,e.uv,2),t?(r(3,t,4),C.vertexAttribDivisor(3,1)):C.vertexAttrib4f(3,0,0,0,0);let i=C.createBuffer();return O.push(i),C.bindBuffer(C.ELEMENT_ARRAY_BUFFER,i),C.bufferData(C.ELEMENT_ARRAY_BUFFER,e.idx,C.STATIC_DRAW),C.bindVertexArray(null),{vao:n,n:e.idx.length,tipo:e.idx instanceof Uint32Array?C.UNSIGNED_INT:C.UNSIGNED_SHORT,inst:t?t.length/4:void 0}},A=Math.min(window.innerWidth,window.innerHeight)<700,j=A?72:112,ee=k(l(h,j)),te=k(l(g,j)),ne=k(l(_,j)),re=k(l(v,j)),M=k(p(6)),N=(()=>{let e=7;return()=>(e=e*16807%2147483647)/2147483647})(),P=(e,t,n,r,i)=>{let a=new Float32Array(e*4);for(let o=0;o<e;o++){let e=N()*Math.PI*2;Math.abs(Math.sin(e))<.35&&Math.cos(e)>0&&(e+=Math.PI*.5);let s=c(t,n,Math.sqrt(N()));a.set([Math.sin(e)*s,c(r,i,N()),Math.cos(e)*s*.9,N()*10+.01],o*4)}return a},ie=k(d(.03,.03,.085,8,6),P(A?70:150,1.45,3.4,-.1,2.9)),ae=k(f(),P(A?9:16,1.6,3.2,.2,2.6)),F=C.createTexture();C.bindTexture(C.TEXTURE_2D,F),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,!0),C.texImage2D(C.TEXTURE_2D,0,C.RGBA,C.RGBA,C.UNSIGNED_BYTE,S(m.nombre,A?2048:3072)),C.generateMipmap(C.TEXTURE_2D),C.texParameteri(C.TEXTURE_2D,C.TEXTURE_MIN_FILTER,C.LINEAR_MIPMAP_LINEAR),C.texParameteri(C.TEXTURE_2D,C.TEXTURE_WRAP_S,C.REPEAT),C.texParameteri(C.TEXTURE_2D,C.TEXTURE_WRAP_T,C.CLAMP_TO_EDGE);let I=C.getExtension(`EXT_texture_filter_anisotropic`);I&&C.texParameterf(C.TEXTURE_2D,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(8,C.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));let L=0,R=0,z=0,B=0,V=!1,H=0,U=0,oe=0,W=0,G=0,K=!0,q=!0,J=0,se=performance.now(),Y=0,X=performance.now(),ce=e=>{if(e.pointerType===`mouse`&&(U=e.clientX/window.innerWidth*2-1,oe=e.clientY/window.innerHeight*2-1),V){let t=e.clientX-H;H=e.clientX,z+=t*.01,B=t*.01,$()}},le=e=>{V=!0,H=e.clientX,B=0,u.setPointerCapture?.(e.pointerId)},Z=()=>{V=!1};window.addEventListener(`pointermove`,ce,{passive:!0}),u.addEventListener(`pointerdown`,le),window.addEventListener(`pointerup`,Z),u.addEventListener(`pointercancel`,Z);let ue=new IntersectionObserver(([e])=>{K=e.isIntersecting,K&&$()},{threshold:0});ue.observe(u);let de=()=>{document.hidden||(X=performance.now(),$())};document.addEventListener(`visibilitychange`,de);let fe=e=>{e.preventDefault(),q=!1,cancelAnimationFrame(J),m.alFallar(`El 3D se detuvo para ahorrar memoria.`)};u.addEventListener(`webglcontextlost`,fe);function pe(){let e=Math.min(window.devicePixelRatio||1,A?1.5:1.75),t=Math.max(1,Math.round(u.clientWidth*e)),n=Math.max(1,Math.round(u.clientHeight*e));return u.width!==t||u.height!==n?(u.width=t,u.height=n,!0):!1}let Q=(e,t,n)=>{C.uniform1i(D.mode,t),C.uniformMatrix4fv(D.model,!1,n),C.bindVertexArray(e.vao),e.inst?C.drawElementsInstanced(C.TRIANGLES,e.n,e.tipo,0,e.inst):C.drawElements(C.TRIANGLES,e.n,e.tipo,0)};function me(l){if(J=0,!q)return;let d=Math.min(.05,(l-X)/1e3);X=l,m.reducido||(Y=(l-se)/1e3),pe(),R+=(L-R)*(m.reducido?1:Math.min(1,d*6)),W+=(U-W)*Math.min(1,d*3),G+=(oe-G)*Math.min(1,d*3),V||(z+=B,B*=.92,Math.abs(B)<1e-4&&(B=0));let f=R,p=u.width/u.height,h=p<.9,g=-.35+f*Math.PI*1.15+z+(m.reducido?0:Math.sin(Y*.35)*.12),_=s(.3,.72,f)*.5,v=s(.3,.72,f)*.28,y=h?0:c(1.3,.95,s(0,.8,f)),b=h?-.15:0,x=(h?9.4:7.6)-f*1.2,S=[y*.15+W*.45,(h?1.9:1.6)-f*.25-G*.25,x],w=[y*.15,h?2.35-f*.5:1.15,0];C.viewport(0,0,u.width,u.height),C.clearColor(0,0,0,0),C.clear(C.COLOR_BUFFER_BIT|C.DEPTH_BUFFER_BIT),C.useProgram(T),C.uniformMatrix4fv(D.proj,!1,n(h?.62:.5,p,.1,60)),C.uniformMatrix4fv(D.view,!1,r(S,w)),C.uniform3f(D.cam,S[0],S[1],S[2]),C.uniform1f(D.time,Y),C.uniform1f(D.rise,f*1.4),C.uniform3f(D.jar,y,b,0),C.activeTexture(C.TEXTURE0),C.bindTexture(C.TEXTURE_2D,F),C.uniform1i(D.label,0);let E=t(o(y,b,0),i(g));C.enable(C.DEPTH_TEST),C.depthMask(!0),C.disable(C.CULL_FACE),C.enable(C.BLEND),C.blendFunc(C.ONE,C.ONE_MINUS_SRC_ALPHA),C.depthMask(!1),Q(M,4,o(0,b,0)),C.depthMask(!0),Q(te,0,E),Q(ne,1,E);let O=t(E,t(o(0,1.6+_,0),t(a(-v),t(i(_*.9),o(0,-1.6,0)))));Q(re,2,O),Q(ie,5,e()),Q(ae,6,e()),C.depthMask(!1),Q(ee,3,E),C.depthMask(!0),C.bindVertexArray(null);let k=!m.reducido||Math.abs(L-R)>.001||B!==0||Math.abs(U-W)>.001;K&&!document.hidden&&k&&$()}function $(){!J&&q&&(J=requestAnimationFrame(me))}let he=()=>$();return window.addEventListener(`resize`,he),$(),{progreso(e){L=Math.min(1,Math.max(0,e)),$()},destruir(){q=!1,cancelAnimationFrame(J),ue.disconnect(),window.removeEventListener(`pointermove`,ce),window.removeEventListener(`pointerup`,Z),window.removeEventListener(`resize`,he),document.removeEventListener(`visibilitychange`,de),u.removeEventListener(`webglcontextlost`,fe),O.forEach(e=>C.deleteBuffer(e)),[ee,te,ne,re,M,ie,ae].forEach(e=>C.deleteVertexArray(e.vao)),C.deleteTexture(F),C.deleteProgram(T)}}}export{C as crearEscena};