# BioCare

Biyomedikal / sağlık temalı e-ticaret **frontend** projesi (64 ürün).

## Masaüstünde nasıl açılır?

### En kolay (sunucu yok)
1. Klasörü Masaüstüne koy / zip’i ayıkla  
2. `index.html` dosyasına **çift tıkla**  
3. Site tarayıcıda açılır  

> Not: Ürünler `js/products-data.js` içinden gelir; çift tıklayınca da çalışır.

### İstersen yerel sunucu (opsiyonel)
Klasörün içinde terminal aç:
```bash
python -m http.server 5500
```
Sonra: http://localhost:5500

Cloud agent’taki `localhost:5500` **senin bilgisayarın değil**. Masaüstünde ayrı açman gerekir.

## Veriler nereden geliyor?

| Veri | Kaynak | Dosya |
|------|--------|--------|
| Ürünler, fiyat, stok, kategori | Yerel JSON / JS | `data/products.json` ve `js/products-data.js` |
| Ürün görselleri | Unsplash (internet) | her ürünün `image` URL’i |
| Sepet | Tarayıcı hafızası | `localStorage` (`js/cart.js`) |
| Yazı tipleri | Google Fonts | Fraunces + Outfit |
| Bootstrap / Vue | CDN | jsDelivr / unpkg |

**Backend / API / veritabanı yok.** Hepsi frontend.

Ürün değiştirmek için `data/products.json` düzenle, sonra:
```bash
python scripts/sync-products.py
```
(veya doğrudan `js/products-data.js` içindeki alanları değiştir)

## Kullanılan teknolojiler

- **HTML5** — sayfa yapısı  
- **CSS3** — `css/main.css` (değişkenler, responsive, a11y)  
- **Bootstrap 5.3** — grid, navbar, form  
- **Vue 3 (CDN)** — ürün listesi, filtre, sepet ekranı  
- **Vanilla JavaScript** — sepet, ortak header/footer, yardımcılar  
- **JSON** — ürün kataloğu  

## Sayfalar

| Dosya | İçerik |
|-------|--------|
| `index.html` | Ana sayfa |
| `urunler.html` | Arama / kategori / sıralama |
| `urun.html?id=bc-001` | Ürün detay |
| `sepet.html` | Sepet |
| `hakkimizda.html` | Hakkımızda |
| `iletisim.html` | İletişim formu |

## Klasör yapısı

```
css/main.css
data/products.json
js/products-data.js   ← ürün verisi (çift tık için)
js/cart.js
js/utils.js
js/home.js
js/products.js
js/detail.js
js/cart-page.js
js/static.js
scripts/sync-products.py
*.html
```

## Not

Fiyatlar ve stoklar örnek. Ödeme yok; sepet demo.
