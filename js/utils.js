/* Ortak yardımcılar */

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
  const res = await fetch("data/products.json");
  if (!res.ok) throw new Error("Ürün verisi yüklenemedi");
  return res.json();
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function currentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  return path.toLowerCase();
}

/* Ortak header / footer HTML — tek yerden güncellenir */
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
    <nav class="navbar navbar-expand-lg bc-header" aria-label="Ana menü">
      <div class="container">
        <a class="bc-brand navbar-brand" href="index.html">
          <span class="bc-brand__mark" aria-hidden="true">B</span>
          <span>
            <span class="bc-brand__text">BioCare</span>
            <span class="bc-brand__sub">Medikal Market</span>
          </span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bcNav"
          aria-controls="bcNav" aria-expanded="false" aria-label="Menüyü aç">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="bcNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 bc-nav align-items-lg-center gap-lg-1">
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
              <a class="bc-cart-btn" href="sepet.html" aria-label="Sepete git">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                  <path d="M6 6l-1-3H2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <circle cx="9" cy="20" r="1.4" fill="currentColor"/>
                  <circle cx="18" cy="20" r="1.4" fill="currentColor"/>
                </svg>
                Sepet
                <span class="bc-cart-count" data-cart-count>0</span>
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
            <p class="mb-2">Klinik kalitesinde medikal ve sağlık ürünleri. Stoklar düzenli güncellenir; kurumsal siparişler için iletişime geçebilirsiniz.</p>
            <p class="mb-0 small">İTÜ Teknopark, Maslak / İstanbul</p>
          </div>
          <div class="col-6 col-md-3">
            <h2 class="h6 text-white mb-3">Keşfet</h2>
            <ul class="list-unstyled d-grid gap-2 mb-0">
              <li><a href="urunler.html">Tüm ürünler</a></li>
              <li><a href="urunler.html?kat=tani">Tanı &amp; ölçüm</a></li>
              <li><a href="urunler.html?kat=koruyucu">Koruyucu ekipman</a></li>
              <li><a href="sepet.html">Sepetim</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-4">
            <h2 class="h6 text-white mb-3">Destek</h2>
            <ul class="list-unstyled d-grid gap-2 mb-0">
              <li><a href="tel:+902125550147">+90 212 555 0147</a></li>
              <li><a href="mailto:destek@biocare.com.tr">destek@biocare.com.tr</a></li>
              <li><a href="hakkimizda.html">Hakkımızda</a></li>
              <li><a href="iletisim.html">İletişim formu</a></li>
            </ul>
          </div>
        </div>
        <div class="bc-footer__bottom d-flex flex-wrap justify-content-between gap-2">
          <span>© ${new Date().getFullYear()} BioCare Medikal Market</span>
          <span>Öğrenci projesi — İleri Web Tasarımı</span>
        </div>
      </div>
    </footer>
  `;

  updateCartBadges();
  window.addEventListener("biocare:cart-updated", updateCartBadges);
}

function updateCartBadges() {
  const n = window.BioCareCart.cartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(n);
  });
}

/* Ürün kartı HTML şablonu */
function productCardHTML(p, categories) {
  const cat = categoryName(categories, p.category);
  const badgeClass = p.badge && /indirim/i.test(p.badge) ? "is-sale" : "";
  const old = p.oldPrice
    ? `<s>${formatPrice(p.oldPrice)}</s>`
    : "";
  return `
    <article class="bc-product">
      <a class="bc-product__media" href="urun.html?id=${encodeURIComponent(p.id)}" aria-label="${p.name} detayı">
        ${p.badge ? `<span class="bc-product__badge ${badgeClass}">${p.badge}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy" width="800" height="800"
          onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&h=800&q=80'">
      </a>
      <div class="bc-product__body">
        <div class="bc-product__cat">${cat}</div>
        <h3 class="bc-product__name"><a href="urun.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h3>
        <div class="bc-product__meta">
          <div class="bc-price">${old}${formatPrice(p.price)}</div>
          <div class="bc-rating" aria-label="Puan ${p.rating}"><span>★</span> ${p.rating}</div>
        </div>
        <div class="bc-product__actions">
          <button type="button" class="btn btn-bc btn-sm" data-add="${p.id}">Sepete ekle</button>
          <a class="btn btn-bc-ghost btn-sm" href="urun.html?id=${encodeURIComponent(p.id)}">İncele</a>
        </div>
      </div>
    </article>
  `;
}

function bindAddButtons(root = document) {
  root.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-add");
      window.BioCareCart.addToCart(id, 1);
      showToast("Ürün sepete eklendi");
    });
  });
}

window.BioCare = {
  formatPrice,
  categoryName,
  showToast,
  loadCatalog,
  qs,
  currentPage,
  renderShell,
  updateCartBadges,
  productCardHTML,
  bindAddButtons,
};
