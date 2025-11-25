import{a as u,S as d,i as s}from"./assets/vendor-Dtuz2WrL.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const p="https://pixabay.com/api/",m="53390441-690cb9fa742523782d54564fc",h={key:m,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40};function g(n){return u.get(p,{params:{...h,q:n}}).then(r=>r.data).catch(r=>{throw console.error("Помилка запиту до Pixabay:",r),r})}const l=document.getElementById("gallery"),c=document.querySelector(".loader"),f=new d(".gallery a",{captionsData:"alt",captionDelay:250});function y(n){const r=n.map(e=>`
    <li class="gallery__item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes:</b> ${e.likes}</p>
          <p><b>Views:</b> ${e.views}</p>
          <p><b>Comments:</b> ${e.comments}</p>
          <p><b>Downloads:</b> ${e.downloads}</p>
        </div>
      </a>
    </li>`).join("");l.insertAdjacentHTML("beforeend",r),f.refresh()}function b(){l.innerHTML="",f.refresh()}function L(){c.classList.remove("is-hidden")}function w(){c.classList.add("is-hidden")}const E=document.getElementById("search-form"),P=document.getElementById("search-text");E.addEventListener("submit",v);function v(n){n.preventDefault();const r=P.value.trim();if(!r){s.warning({title:"Warning",message:"Please enter a search term.",position:"topRight"});return}b(),L(),g(r).then(e=>{if(!e||!Array.isArray(e.hits)||e.hits.length===0){s.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(e.hits)}).catch(e=>{console.error(e),s.error({title:"Error",message:"Something went wrong while fetching images. Please try again later.",position:"topRight"})}).finally(()=>{w()})}
//# sourceMappingURL=index.js.map
