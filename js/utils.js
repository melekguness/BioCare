/* BioCare helpers */

function formatPrice(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function categoryName(categories, id) {
  const found = categories.find((c) => c.id === id);
  return found ? found.name : id;
}

function showToast(message) {
  let wrap = document.querySelector(".bc-toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "bc-toast-wrap";
    wrap.setAttribute("aria-live", "polite");
    document.body.appendChild(wrap);
  }
  const el = document.createElement("div");
  el.className = "bc-toast";
  el.setAttribute("role", "status");
  el.textContent = message;
  wrap.appendChild(el);
  setTimeout(() => {
    el.remove();
    if (!wrap.children.length) wrap.remove();
  }, 2400);
}

async function loadCatalog() {
  if (window.BIOCARE_DATA) return window.BIOCARE_DATA;
  const res = await fetch("data/products.json");
  if (!res.ok) throw new Error("Ürün verisi yüklenemedi");
  return res.json();
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function updateCartBadges() {
  const n = window.BioCareCart.cartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(n);
  });
}

function renderShell(active) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (!header || !footer) return;

  const links = [
    { href: "index.html", id: "home", label: "Ana Sayfa" },
    { href: "urunler.html", id: "urunler", label: "Koleksiyon" },
    { href: "hakkimizda.html", id: "hakkimizda", label: "Hakkımızda" },
    { href: "iletisim.html", id: "iletisim", label: "İletişim" },
  ];

  header.innerHTML = `
    <nav class="navbar navbar-expand-lg bc-nav" aria-label="Ana menü">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          BioCare <span>Klinik</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Menüyü aç/kapat">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
            ${links
              .map(
                (l) => `
              <li class="nav-item">
                <a class="nav-link ${active === l.id ? "active" : ""}" href="${l.href}"
                  ${active === l.id ? 'aria-current="page"' : ""}>${l.label}</a>
              </li>`
              )
              .join("")}
            <li class="nav-item ms-lg-2">
              <a class="bc-cart" href="sepet.html" aria-label="Sepete git">
                <i class="bi-bag" aria-hidden="true"></i>
                Sepet
                <span class="badge rounded-pill" data-cart-count>0</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  footer.innerHTML = `
    <footer class="bc-footer">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-5">
            <div class="bc-footer__brand">BioCare</div>
            <p class="mb-0">Klinik standartlarda seçilmiş medikal ve sağlık ürünleri. Sessiz lüks, net işlev.</p>
          </div>
          <div class="col-6 col-md-3">
            <div class="text-white fw-semibold mb-2">Keşfet</div>
            <ul class="list-unstyled small mb-0 d-grid gap-2">
              <li><a href="urunler.html">Koleksiyon</a></li>
              <li><a href="urunler.html?kat=tani">Tanı &amp; ölçüm</a></li>
              <li><a href="sepet.html">Sepet</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-4">
            <div class="text-white fw-semibold mb-2">İletişim</div>
            <ul class="list-unstyled small mb-0 d-grid gap-2">
              <li><a href="tel:+902125550147">+90 212 555 0147</a></li>
              <li><a href="mailto:destek@biocare.com.tr">destek@biocare.com.tr</a></li>
              <li><a href="iletisim.html">Form</a></li>
            </ul>
          </div>
        </div>
        <div class="bc-footer__bottom d-flex flex-wrap justify-content-between gap-2">
          <span>© ${new Date().getFullYear()} BioCare</span>
          <span>Bootstrap 5 · Start Bootstrap Shop Homepage üzerine</span>
        </div>
      </div>
    </footer>
  `;

  updateCartBadges();
  window.addEventListener("biocare:cart-updated", updateCartBadges);
}

window.BioCare = {
  formatPrice,
  categoryName,
  showToast,
  loadCatalog,
  qs,
  renderShell,
  updateCartBadges,
};
