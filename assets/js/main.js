// ===== MAIN.JS START =====
const IS_GITHUB_PAGES = window.location.hostname.endsWith("github.io");
const PREVIEW_BASE = "https://ryangivans.github.io/thebluedoorgroups";
const BASE_PATH = IS_GITHUB_PAGES ? "/thebluedoorgroups" : "";
const COMPONENT_VERSION = "20260610-4";

async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  const separator = file.includes("?") ? "&" : "?";
  const response = await fetch(`${file}${separator}v=${COMPONENT_VERSION}`, {
    cache: "no-store"
  });

  if (!response.ok) throw new Error(`Unable to load ${file}`);
  element.innerHTML = await response.text();
}

function normalizeRoute(pathname) {
  const route = pathname.replace(BASE_PATH, "") || "/";
  return route.endsWith("/") ? route : `${route}/`;
}

function buildHref(route) {
  if (!route || route === "/") return IS_GITHUB_PAGES ? `${PREVIEW_BASE}/` : "/";
  return IS_GITHUB_PAGES ? `${PREVIEW_BASE}${route}` : route;
}

function rewriteInternalLinks() {
  document.querySelectorAll("a[data-route]").forEach((link) => {
    link.setAttribute("href", buildHref(link.dataset.route));
  });

  document.querySelectorAll('a[href^="/thebluedoorgroups/"]').forEach((link) => {
    const relativeRoute = link.getAttribute("href").replace("/thebluedoorgroups", "");
    link.setAttribute("href", buildHref(relativeRoute));
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