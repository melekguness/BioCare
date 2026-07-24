/* Ortak yardımcılar — Start Bootstrap Shop üzerine BioCare */

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

/**
 * Start Bootstrap Shop Homepage navbar + footer iskeleti
 * https://startbootstrap.com/template/shop-homepage
 */
function renderShell(active) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (!header || !footer) return;

  const links = [
    { href: "index.html", id: "home", label: "Ana Sayfa" },
    { href: "urunler.html", id: "urunler", label: "Ürünler" },
    { href: "hakkimizda.html", id: "hakkimizda", label: "Hakkımızda" },
    { href: "iletisim.html", id: "iletisim", label: "İletişim" },
  ];

  header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light" aria-label="Ana menü">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center" href="index.html">
          <span class="bc-brand-mark" aria-hidden="true">B</span>
          BioCare
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Menüyü aç/kapat">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            ${links
              .map(
                (l) => `
              <li class="nav-item">
                <a class="nav-link ${active === l.id ? "active" : ""}" href="${l.href}"
                  ${active === l.id ? 'aria-current="page"' : ""}>${l.label}</a>
              </li>`
              )
              .join("")}
          </ul>
          <a class="btn btn-outline-dark" href="sepet.html" aria-label="Sepete git">
            <i class="bi-cart-fill me-1" aria-hidden="true"></i>
            Sepet
            <span class="badge bg-dark text-white ms-1 rounded-pill" data-cart-count>0</span>
          </a>
        </div>
      </div>
    </nav>
  `;

  footer.innerHTML = `
    <footer class="py-5 bg-dark">
      <div class="container px-4 px-lg-5">
        <div class="row gy-3 text-white-50">
          <div class="col-md-5">
            <div class="text-white fw-bold mb-2">BioCare</div>
            <p class="small mb-0">Start Bootstrap Shop Homepage şablonu üzerine uyarlanmış medikal e-ticaret vitrini.</p>
          </div>
          <div class="col-6 col-md-3">
            <div class="text-white fw-semibold mb-2">Keşfet</div>
            <ul class="list-unstyled small mb-0">
              <li><a href="urunler.html">Ürünler</a></li>
              <li><a href="urunler.html?kat=tani">Tanı &amp; ölçüm</a></li>
              <li><a href="sepet.html">Sepet</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-4">
            <div class="text-white fw-semibold mb-2">İletişim</div>
            <ul class="list-unstyled small mb-0">
              <li><a href="tel:+902125550147">+90 212 555 0147</a></li>
              <li><a href="mailto:destek@biocare.com.tr">destek@biocare.com.tr</a></li>
              <li><a href="iletisim.html">Form</a></li>
            </ul>
          </div>
        </div>
        <p class="m-0 text-center text-white-50 small mt-4 pt-3 border-top border-secondary">
          © ${new Date().getFullYear()} BioCare · Şablon: Start Bootstrap Shop Homepage (MIT)
        </p>
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
