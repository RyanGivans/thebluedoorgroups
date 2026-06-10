// ===== MAIN.JS START =====
const BASE_PATH = "/thebluedoorgroups";

async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  const response = await fetch(file);
  if (!response.ok) throw new Error(`Unable to load ${file}`);
  element.innerHTML = await response.text();
}

function normalizeRoute(pathname) {
  const route = pathname.replace(BASE_PATH, "") || "/";
  return route.endsWith("/") ? route : `${route}/`;
}

function initializeNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const currentRoute = normalizeRoute(window.location.pathname);

  document.querySelectorAll(".site-nav a[data-route]").forEach((link) => {
    if (link.dataset.route === currentRoute) link.classList.add("active");
  });

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

Promise.all([
  loadComponent("site-nav", `${BASE_PATH}/components/nav.html`),
  loadComponent("site-footer", `${BASE_PATH}/components/footer.html`)
]).then(initializeNavigation).catch(console.error);
// ===== MAIN.JS END =====