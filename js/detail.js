/* Ürün detay sayfası */

const { createApp } = Vue;

createApp({
  data() {
    return {
      catalog: null,
      product: null,
      loading: true,
      error: null,
      activeImage: 0,
      qty: 1,
    };
  },
  computed: {
    related() {
      if (!this.catalog || !this.product) return [];
      return this.catalog.products
        .filter((p) => p.category === this.product.category && p.id !== this.product.id)
        .slice(0, 4);
    },
    catLabel() {
      if (!this.catalog || !this.product) return "";
      return BioCare.categoryName(this.catalog.categories, this.product.category);
    },
  },
  methods: {
    money: BioCare.formatPrice,
    add() {
      BioCareCart.addToCart(this.product.id, this.qty);
      BioCare.showToast(`${this.qty} adet sepete eklendi`);
    },
    bump(delta) {
      this.qty = Math.max(1, Math.min(20, this.qty + delta));
    },
  },
  async mounted() {
    BioCare.renderShell("urunler");
    try {
      this.catalog = await BioCare.loadCatalog();
      const id = BioCare.qs("id");
      this.product = this.catalog.products.find((p) => p.id === id) || null;
      if (!this.product) this.error = "Ürün bulunamadı. Listeye dönüp tekrar deneyin.";
      document.title = this.product
        ? `${this.product.name} | BioCare`
        : "Ürün bulunamadı | BioCare";
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  },
}).mount("#app");
