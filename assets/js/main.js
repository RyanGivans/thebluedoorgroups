// ===== PART 1 START: MAIN.JS =====
async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  const response = await fetch(file);
  const html = await response.text();
  element.innerHTML = html;
}

Promise.all([
  loadComponent("site-nav", "components/nav.html"),
  loadComponent("site-footer", "components/footer.html")
]).then(() => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});
// ===== PART 1 END =====
