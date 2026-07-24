# BioCare

Biyomedikal e-ticaret **frontend** projesi.

## Bootstrap şablonu

Temel şablon:

**[Start Bootstrap — Shop Homepage](https://startbootstrap.com/template/shop-homepage)** (Bootstrap 5, MIT)

Ürün detay sayfası aynı ailenin **Shop Item** düzenine göre uyarlandı.

Üzerine BioCare (medikal) içerik, Vue 3 ile dinamik katalog ve özel renkler eklendi (`css/styles.css`).

## Açılış

- `index.html` çift tık **veya**
- `baslat.bat` **veya**
- VS Code → Live Server (`index.html` sağ tık → Open with Live Server)

## Teknolojiler

| Katman | Ne |
|--------|----|
| Şablon | Start Bootstrap Shop Homepage (BS5) |
| UI | Bootstrap 5.3 + Bootstrap Icons |
| JS çerçeve | Vue 3 (CDN) |
| Veri | `data/products.json` / `js/products-data.js` |
| Sepet | `localStorage` |

Backend yok.

## Sayfalar

`index.html` · `urunler.html` · `urun.html` · `sepet.html` · `hakkimizda.html` · `iletisim.html`

## Ürün değiştirme

`data/products.json` düzenle → `python scripts/sync-products.py`
