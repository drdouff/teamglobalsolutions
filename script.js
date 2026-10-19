/* =========================================================
   TEAM GLOBAL SOLUTION — script.js
   Vanilla JS — aucune dépendance, aucun localStorage
   ========================================================= */
(function(){
  "use strict";

  /* ---------- Etat global (en mémoire uniquement) ---------- */
  var state = { lang: "fr" };

  /* ---------- 1. Année footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Menu mobile ---------- */
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".main-nav");
  if (burger && nav){
    burger.addEventListener("click", function(){
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    document.querySelectorAll(".main-nav a.nav-link").forEach(function(a){
      a.addEventListener("click", function(){
        if (window.innerWidth <= 1080){ nav.classList.remove("open"); burger.innerHTML = '<i class="fa-solid fa-bars"></i>'; }
      });
    });
    document.querySelectorAll(".has-dropdown > .nav-link").forEach(function(btn){
      btn.addEventListener("click", function(e){
        if (window.innerWidth <= 1080){
          e.preventDefault();
          btn.parentElement.classList.toggle("open");
        }
      });
    });
  }

  /* ---------- 3. Bouton "retour en haut" ---------- */
  var topBtn = document.querySelector(".float-top");
  window.addEventListener("scroll", function(){
    if (topBtn) topBtn.classList.toggle("show", window.scrollY > 600);
    var header = document.querySelector(".site-header");
    if (header) header.style.boxShadow = window.scrollY > 10 ? "0 4px 18px rgba(8,27,51,.08)" : "none";
  });
  if (topBtn) topBtn.addEventListener("click", function(){ window.scrollTo({top:0, behavior:"smooth"}); });

  /* ---------- 4. Reveal au scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold:.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in"); });
  }

  /* ---------- 5. Onglets Services ---------- */
  var serviceTabs = document.querySelectorAll(".service-tab");
  var servicePanels = document.querySelectorAll(".service-panel");
  serviceTabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      var target = tab.getAttribute("data-target");
      serviceTabs.forEach(function(t){ t.classList.toggle("active", t === tab); });
      servicePanels.forEach(function(p){ p.classList.toggle("active", p.id === target); });
      history.replaceState(null, "", "#" + target);
    });
  });

  /* ---------- 6. FAQ catégories + accordéon ---------- */
  var faqCatBtns = document.querySelectorAll(".faq-cat-btn");
  var faqCats = document.querySelectorAll(".faq-cat");
  faqCatBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      var target = btn.getAttribute("data-target");
      faqCatBtns.forEach(function(b){ b.classList.toggle("active", b === btn); });
      faqCats.forEach(function(c){ c.classList.toggle("active", c.id === target); });
    });
  });
  document.querySelectorAll(".faq-q").forEach(function(q){
    q.addEventListener("click", function(){
      var item = q.closest(".faq-item");
      var answer = item.querySelector(".faq-a");
      var willOpen = !item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item").forEach(function(other){
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded","false");
      });
      if (willOpen){
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        q.setAttribute("aria-expanded","true");
      }
    });
  });

  /* ---------- 7. Galerie : filtres + lightbox ---------- */
  var galFilters = document.querySelectorAll(".gallery-filter");
  var galItems = document.querySelectorAll(".gallery-item");
  galFilters.forEach(function(btn){
    btn.addEventListener("click", function(){
      galFilters.forEach(function(b){ b.classList.toggle("active", b === btn); });
      var cat = btn.getAttribute("data-cat");
      galItems.forEach(function(it){
        var show = cat === "all" || it.getAttribute("data-cat") === cat;
        it.style.display = show ? "flex" : "none";
      });
    });
  });
  var lightbox = document.querySelector(".lightbox");
  var lbIcon = document.querySelector(".lightbox-box i.big");
  var lbTitle = document.querySelector(".lightbox-box h3");
  var lbText = document.querySelector(".lightbox-box p");
  galItems.forEach(function(it){
    it.addEventListener("click", function(){
      if (!lightbox) return;
      lbIcon.className = "fa-solid " + (it.getAttribute("data-icon") || "fa-image") + " big";
      lbTitle.textContent = it.getAttribute("data-title") || "";
      lbText.textContent = it.getAttribute("data-desc") || "";
      lightbox.classList.add("open");
    });
  });
  document.querySelectorAll("[data-close-lightbox]").forEach(function(b){
    b.addEventListener("click", function(){ lightbox.classList.remove("open"); });
  });
  if (lightbox) lightbox.addEventListener("click", function(e){ if (e.target === lightbox) lightbox.classList.remove("open"); });

  /* ---------- 8. Témoignages : carrousel ---------- */
  var track = document.querySelector(".testi-track");
  var prevBtn = document.querySelector("[data-testi-prev]");
  var nextBtn = document.querySelector("[data-testi-next]");
  if (track && prevBtn && nextBtn){
    var scrollAmount = function(){ return track.querySelector(".testi-card").offsetWidth + 26; };
    nextBtn.addEventListener("click", function(){ track.scrollBy({left: scrollAmount(), behavior:"smooth"}); });
    prevBtn.addEventListener("click", function(){ track.scrollBy({left: -scrollAmount(), behavior:"smooth"}); });
  }

  /* ---------- 9. Formulaires (Rendez-vous / Candidature / Contact) ---------- */
  var formTabs = document.querySelectorAll(".form-tab");
  var formPanels = document.querySelectorAll(".form-panel");
  formTabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      var target = tab.getAttribute("data-target");
      formTabs.forEach(function(t){ t.classList.toggle("active", t === tab); });
      formPanels.forEach(function(p){ p.classList.toggle("active", p.id === target); });
    });
  });

  function handleForm(formId, successId, subjectPrefix){
    var form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      if (!form.checkValidity()){ form.reportValidity(); return; }
      var data = new FormData(form);
      var lines = [];
      data.forEach(function(value, key){
        if (value && typeof value !== "object") lines.push(key + " : " + value);
      });
      var body = encodeURIComponent(lines.join("\n"));
      var subject = encodeURIComponent(subjectPrefix + " — TEAM GLOBAL SOLUTION");
      var mailLink = "mailto:contact@teamglobalsolution.com?subject=" + subject + "&body=" + body;

      var success = document.getElementById(successId);
      form.style.display = "none";
      if (success) success.classList.add("show");

      // Ouvre le client mail pré-rempli en solution de repli (sans backend).
      // Recommandation : remplacer par Formspree / EmailJS / API interne en production.
      window.location.href = mailLink;
    });
  }
  handleForm("form-rdv", "success-rdv", "Demande de rendez-vous");
  handleForm("form-candidature", "success-candidature", "Nouvelle candidature");
  handleForm("form-contact", "success-contact", "Message de contact");

  /* ---------- 10. i18n FR / DE (sans localStorage, état en mémoire) ---------- */
  var translatable = document.querySelectorAll("[data-fr]");
  var placeholders = document.querySelectorAll("[data-ph-fr]");
  var langButtons = document.querySelectorAll("[data-lang-btn]");

  function applyLang(lang){
    state.lang = lang;
    document.documentElement.setAttribute("lang", lang);
    document.body.classList.toggle("lang-de", lang === "de");
    translatable.forEach(function(el){
      var val = el.getAttribute("data-" + lang);
      if (val !== null) el.textContent = val;
    });
    placeholders.forEach(function(el){
      var val = el.getAttribute("data-ph-" + lang);
      if (val !== null) el.setAttribute("placeholder", val);
    });
    langButtons.forEach(function(b){ b.classList.toggle("active", b.getAttribute("data-lang-btn") === lang); });
  }
  langButtons.forEach(function(btn){
    btn.addEventListener("click", function(){ applyLang(btn.getAttribute("data-lang-btn")); });
  });
  applyLang("fr");

})();