/* Sepet sayfası */

const { createApp } = Vue;

createApp({
  data() {
    return {
      catalog: null,
      items: BioCareCart.readCart(),
      loading: true,
      error: null,
    };
  },
  computed: {
    rows() {
      if (!this.catalog) return [];
      return this.items
        .map((row) => {
          const product = this.catalog.products.find((p) => p.id === row.id);
          if (!product) return null;
          return { ...row, product, line: product.price * row.qty };
        })
        .filter(Boolean);
    },
    total() {
      return this.rows.reduce((s, r) => s + r.line, 0);
    },
    count() {
      return this.rows.reduce((s, r) => s + r.qty, 0);
    },
  },
  methods: {
    money: BioCare.formatPrice,
    setQty(id, qty) {
      this.items = BioCareCart.setQty(id, qty);
    },
    remove(id) {
      this.items = BioCareCart.removeFromCart(id);
      BioCare.showToast("Ürün sepetten çıkarıldı");
    },
    clear() {
      BioCareCart.clearCart();
      this.items = [];
    },
    checkout() {
      if (!this.rows.length) return;
      BioCare.showToast("Ödeme entegrasyonu demo dışı — sipariş kaydı simüle edildi.");
      this.clear();
    },
  },
  async mounted() {
    BioCare.renderShell("sepet");
    window.addEventListener("biocare:cart-updated", (e) => {
      this.items = e.detail;
    });
    try {
      this.catalog = await BioCare.loadCatalog();
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  },
}).mount("#app");
