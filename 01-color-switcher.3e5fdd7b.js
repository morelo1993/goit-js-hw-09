let t;const e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),o=document.body;e.addEventListener("click",(function(){t=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`;o.style.backgroundColor=t}),1e3)})),n.addEventListener("click",(function(){clearInterval(t)}));
//# sourceMappingURL=01-color-switcher.3e5fdd7b.js.map
