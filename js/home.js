/* Ana sayfa — öne çıkan ürünler ve kategoriler (Vue 3) */

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
      return this.catalog.products
        .filter((p) => p.badge)
        .slice(0, 8);
    },
    newest() {
      if (!this.catalog) return [];
      return [...this.catalog.products].reverse().slice(0, 8);
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
    iconPath(name) {
      const icons = {
        shield: "M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z",
        activity: "M3 12h4l2-6 4 12 2-6h6",
        "plus-circle": "M12 8v8M8 12h8M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        bone: "M7 8a2.5 2.5 0 01-3.5-3.5A2.5 2.5 0 017 8zm10 0a2.5 2.5 0 013.5-3.5A2.5 2.5 0 0117 8zM7 16a2.5 2.5 0 00-3.5 3.5A2.5 2.5 0 007 16zm10 0a2.5 2.5 0 013.5 3.5A2.5 2.5 0 0017 16zM8.5 8.5l7 7M15.5 8.5l-7 7",
        flask: "M9 3h6M10 3v6l-5 9a2 2 0 001.7 3h10.6a2 2 0 001.7-3l-5-9V3",
        home: "M4 10.5L12 4l8 6.5V20H4v-9.5z",
        droplet: "M12 3s6 7 6 11a6 6 0 11-12 0c0-4 6-11 6-11z",
        heart: "M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z",
      };
      return icons[name] || icons.heart;
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
