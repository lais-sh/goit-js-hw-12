import{a as w,S as b,i as l}from"./assets/vendor-Db2TdIkw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const v="49650117-af312fdd4c8d669445c27b54b",P="https://pixabay.com/api/",S=15;async function q(e,t){return(await w.get(P,{params:{key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:S}})).data}const m=document.querySelector(".gallery"),y=document.querySelector(".loader"),a=document.querySelector(".load-more");let B=new b(".gallery a");function E(e){const t=e.map(r=>r.isPlaceholder?'<li class="gallery-item placeholder"></li>':`
        <li class="gallery-item">
          <a href="${r.largeImageURL}">
            <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p>👍 ${r.likes}</p>
            <p>👁️ ${r.views}</p>
            <p>💬 ${r.comments}</p>
            <p>⬇️ ${r.downloads}</p>
          </div>
        </li>
      `).join("");m.insertAdjacentHTML("beforeend",t),B.refresh()}function M(){m.innerHTML=""}function $(){y.classList.remove("is-hidden")}function h(){y.classList.add("is-hidden")}function A(){a&&a.classList.remove("is-hidden")}function p(){a&&a.classList.add("is-hidden")}const d=document.querySelector(".form");let g="",s=1,u=0;h();d.addEventListener("submit",async e=>{e.preventDefault();const t=d.elements.searchQuery.value.trim();t&&(g=t,s=1,M(),p(),$(),await L())});const f=document.querySelector(".load-more");f&&f.addEventListener("click",async()=>{s+=1,await L()});async function L(){try{const e=await q(g,s);if(u=e.totalHits,e.hits.length===0&&s===1){l.info({title:"😔",message:"No images found. Try a different keyword."});return}const t=x(e.hits);E(t);const r=Math.ceil(u/15);s<r?A():(p(),l.info({title:"📦",message:"We're sorry, but you've reached the end of search results."})),s>1&&I()}catch{l.error({title:"Error",message:"Something went wrong. Please try again."})}finally{setTimeout(()=>{h()},500)}}function I(){const e=document.querySelector(".gallery li");if(!e)return;const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}function x(e){const t=e.length%4;if(t===0)return e;const r=4-t,i=Array.from({length:r},()=>({isPlaceholder:!0}));return[...e,...i]}
//# sourceMappingURL=index.js.map
