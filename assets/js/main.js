// ===== MAIN.JS START =====
const IS_GITHUB_PAGES = window.location.hostname.endsWith("github.io");
const BASE_PATH = IS_GITHUB_PAGES ? "/thebluedoorgroups" : "";

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

function rewriteInternalLinks() {
  document.querySelectorAll('a[href^="/"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (IS_GITHUB_PAGES) {
      if (!href.startsWith(`${BASE_PATH}/`) && href !== BASE_PATH) {
        link.setAttribute("href", `${BASE_PATH}${href}`);
      }
    } else if (href.startsWith("/thebluedoorgroups/")) {
      link.setAttribute("href", href.replace("/thebluedoorgroups", ""));
    }
  });
}

function initializeNavigation() {
  rewriteInternalLinks();

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