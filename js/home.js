/* Ana sayfa — Start Bootstrap Shop Homepage + Vue */

const { createApp } = Vue;

createApp({
  data() {
    return {
      catalog: null,
      loading: true,
      error: null,
    };
  },
  computed: {
    featured() {
      if (!this.catalog) return [];
      const tagged = this.catalog.products.filter((p) => p.badge);
      return (tagged.length ? tagged : this.catalog.products).slice(0, 8);
    },
    categoryCards() {
      if (!this.catalog) return [];
      return this.catalog.categories.map((c) => ({
        ...c,
        count: this.catalog.products.filter((p) => p.category === c.id).length,
      }));
    },
  },
  methods: {
    money: BioCare.formatPrice,
    catName(id) {
      return BioCare.categoryName(this.catalog.categories, id);
    },
    add(id) {
      BioCareCart.addToCart(id, 1);
      BioCare.showToast("Ürün sepete eklendi");
    },
  },
  async mounted() {
    BioCare.renderShell("home");
    try {
      this.catalog = await BioCare.loadCatalog();
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  },
}).mount("#app");
