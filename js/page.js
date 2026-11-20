(function(){var d=document,h=d.documentElement,hd=d.querySelector("header.top"),tb=d.getElementById("themebtn"),mb=d.getElementById("menubtn");
function dark(){var t=h.dataset.theme;return t?t==="dark":matchMedia("(prefers-color-scheme:dark)").matches}
function lab(){var l=dark()?"Activer le mode clair":"Activer le mode sombre";tb.setAttribute("aria-label",l);tb.title=l;var m=d.querySelector('meta[name="theme-color"]');if(m)m.content=dark()?"#151c18":"#f2f1e8"}
tb.addEventListener("click",function(){var n=dark()?"light":"dark";h.dataset.theme=n;try{localStorage.setItem("athlea-theme",n)}catch(e){}lab()});lab();
function menu(o){hd.classList.toggle("open",o);mb.setAttribute("aria-expanded",o);mb.setAttribute("aria-label",o?"Fermer le menu":"Ouvrir le menu")}
mb.addEventListener("click",function(){menu(!hd.classList.contains("open"))});
d.addEventListener("keydown",function(e){if(e.key==="Escape"&&hd.classList.contains("open")){menu(false);mb.focus()}});
function sc(){hd.classList.toggle("scrolled",scrollY>10)}addEventListener("scroll",sc,{passive:true});sc()})();
