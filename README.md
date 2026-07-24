# BioCare

Biyomedikal / sağlık temalı e-ticaret **frontend** projesi (64 ürün).

Bootstrap 5 + Vue 3 (CDN) ile çok sayfalı bir vitrin. Ürünler `data/products.json` dosyasından gelir; fiyat, görsel ve açıklamaları oradan düzenleyebilirsin.

## Çalıştırma

Tarayıcı `file://` ile JSON fetch’i engelleyebilir. Yerel sunucu aç:

```bash
# Python varsa
python3 -m http.server 5500

# veya VS Code / Cursor Live Server
```

Sonra: [http://localhost:5500](http://localhost:5500)

## Sayfalar

| Dosya | İçerik |
|-------|--------|
| `index.html` | Ana sayfa, hero, kategoriler, vitrin |
| `urunler.html` | Arama / kategori / sıralama |
| `urun.html?id=bc-001` | Ürün detay |
| `sepet.html` | Sepet (localStorage) |
| `hakkimizda.html` | Hakkımızda |
| `iletisim.html` | İletişim formu |

## Ürün ekleme / değiştirme

1. `data/products.json` aç.
2. `products` dizisine yeni obje ekle veya mevcut alanı güncelle.
3. `image` alanına Unsplash / kendi görsel URL’ni yapıştır.
4. Sayfayı yenile.

Örnek alanlar: `id`, `name`, `category`, `price`, `oldPrice`, `rating`, `stock`, `badge`, `image`, `short`, `desc`, `specs`.

Kategoriler aynı dosyadaki `categories` listesinde.

## Teknolojiler (ders uyumu)

- **Bootstrap 5.3** — grid, navbar, form, breadcrumb
- **Vue 3** — listeleme, filtre, sepet state
- **Vanilla JS modülleri** — `js/cart.js`, `js/utils.js`
- **CSS değişkenleri** — `css/main.css` içindeki `:root`
- **a11y** — skip link, `aria-*`, odak halkası, `prefers-reduced-motion`
- **Mobil** — responsive grid ve toolbar

## Klasör yapısı

```
css/main.css
data/products.json
js/cart.js
js/utils.js
js/home.js
js/products.js
js/detail.js
js/cart-page.js
js/static.js
*.html
```

## Not

Fiyatlar ve stoklar örnek veridir. Ödeme entegrasyonu yoktur; sepet demo amaçlıdır.
