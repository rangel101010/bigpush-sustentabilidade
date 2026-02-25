(function(){
  // Ano
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Botão “Topo”
  const toTop = document.querySelector(".to-top");
  const toggleTop = () => {
    if (!toTop) return;
    if (window.scrollY > 450) toTop.classList.add("show");
    else toTop.classList.remove("show");
  };
  window.addEventListener("scroll", toggleTop, { passive: true });
  toggleTop();

  // Drawer mobile
  const menuBtn  = document.getElementById("menuBtn");
  const drawer   = document.getElementById("drawerNav");
  const overlay  = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeBtn");

  function openDrawer(){
    if (!drawer || !overlay || !menuBtn) return;
    drawer.classList.add("open");
    overlay.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer(){
    if (!drawer || !overlay || !menuBtn) return;
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function toggleDrawer(){
    if (!drawer) return;
    const isOpen = drawer.classList.contains("open");
    if (isOpen) closeDrawer();
    else openDrawer();
  }

  if (menuBtn) menuBtn.addEventListener("click", toggleDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  // Fecha drawer ao clicar em link
  if (drawer){
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));
  }

  // ESC fecha drawer
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer && drawer.classList.contains("open")) closeDrawer();
  });

  // Link ativo por página (desktop e drawer)
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  function markActive(selector){
    document.querySelectorAll(selector).forEach(a => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      const page = href.split("#")[0] || "";
      // ativa quando o href aponta para a página atual
      const isActive = (page === "" && current === "index.html") || (page === current);
      a.classList.toggle("active", isActive);
    });
  }
  markActive("#mainNav a");
  markActive(".drawerLinks a");

  // TOC ativo (quando existir na página)
  function setupToc(linkSel, secSel){
    const links = Array.from(document.querySelectorAll(linkSel));
    const secs  = Array.from(document.querySelectorAll(secSel));
    if (!links.length || !secs.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

    secs.forEach(s => obs.observe(s));
  }

  setupToc("[data-toc]", "[data-subsec]");
})();
/* =========================
   Dropdown "Mais" (desktop)
   ========================= */
(function () {
  const dd = document.querySelector("[data-dropdown]");
  if (!dd) return;

  const btn = dd.querySelector("[data-dropbtn]");
  const menu = dd.querySelector("[data-dropmenu]");

  function open() {
    dd.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }
  function close() {
    dd.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  }
  function toggle() {
    dd.classList.contains("open") ? close() : open();
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    toggle();
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!dd.contains(e.target)) close();
  });

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Fecha ao clicar em um item
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", close);
  });
})();
