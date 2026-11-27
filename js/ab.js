/* Test A/B : V35 (index.html = a) contre V-test-2 (nouvelle-version.html = b).
   Le tirage 50/50 est fait dans l'en-tête d'index.html ; ici on mesure le temps passé,
   envoyé seulement si le visiteur accepte. Résultats : stats.html */
(function(){
var API="https://abacus.jasoncameron.dev/hit/ac-ab-7q2k9x/",
    v=/nouvelle-version/.test(location.pathname)?"b":"a",
    K="athlea-mesure",ok=null,t=0,s=0,sent=false,d=document;
try{ok=localStorage.getItem(K)}catch(e){}
function hit(k){try{fetch(API+v+"_"+k,{keepalive:true}).catch(function(){})}catch(e){}}
function on(){s=d.visibilityState==="visible"?Date.now():0}
on();
// shortcut: on n'envoie que la première sortie de l'onglet, un retour ensuite n'est pas compté
d.addEventListener("visibilitychange",function(){
  if(d.visibilityState==="visible"){if(!s)s=Date.now();return}
  if(s){t+=Date.now()-s;s=0}
  if(ok!=="oui"||sent)return;sent=true;
  var sec=t/1000,i=[10,30,60,120,300,600].filter(function(x){return sec>=x}).length;
  hit("t"+i);
});
if(ok==="oui"){hit("vues");return}
if(ok==="non")return;
var b=d.createElement("div");
b.setAttribute("role","region");b.setAttribute("aria-label","Mesure d’audience");
b.style.cssText="position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:9999;max-width:34rem;margin:0 auto;padding:1rem 1.1rem;border-radius:14px;background:#1e3d2f;color:#f5ecd7;border:1px solid rgba(245,236,215,.4);font:15px/1.45 'Albert Sans',system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.25)";
b.innerHTML='<p style="margin:0 0 .8rem">Puis-je mesurer, de façon anonyme, combien de temps vous restez sur cette page&nbsp;? Cela m’aide à choisir la meilleure version du site. <a href="index.html#confidentialite" style="color:inherit">En savoir plus</a></p><div style="display:flex;gap:.6rem;flex-wrap:wrap"><button type="button" data-r="non">Refuser</button><button type="button" data-r="oui">Accepter</button></div>';
[].forEach.call(b.querySelectorAll("button"),function(x){
  x.style.cssText="flex:1;min-height:44px;padding:.5rem 1rem;border-radius:99px;border:2px solid #f5ecd7;background:#f5ecd7;color:#1e3d2f;font:inherit;font-weight:600;cursor:pointer";
  x.addEventListener("click",function(){ok=x.dataset.r;try{localStorage.setItem(K,ok)}catch(e){}if(ok==="oui")hit("vues");b.remove()});
});
(d.body?Promise.resolve():new Promise(function(r){d.addEventListener("DOMContentLoaded",r)})).then(function(){d.body.appendChild(b)});
})();
