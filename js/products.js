/* Ürün listesi — arama, kategori, sıralama */

const { createApp } = Vue;

createApp({
  data() {
    return {
      catalog: null,
      loading: true,
      error: null,
      query: "",
      category: BioCare.qs("kat") || "all",
      sort: "popular",
    };
  },
  computed: {
    filtered() {
      if (!this.catalog) return [];
      let list = [...this.catalog.products];

      if (this.category !== "all") {
        list = list.filter((p) => p.category === this.category);
      }

      const q = this.query.trim().toLocaleLowerCase("tr");
      if (q) {
        list = list.filter((p) => {
          const hay = `${p.name} ${p.short} ${p.desc}`.toLocaleLowerCase("tr");
          return hay.includes(q);
        });
      }

      switch (this.sort) {
        case "price-asc":
          list.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          list.sort((a, b) => b.price - a.price);
          break;
        case "name":
          list.sort((a, b) => a.name.localeCompare(b.name, "tr"));
          break;
        default:
          list.sort((a, b) => b.rating - a.rating);
      }
      return list;
    },
    categoryCards() {
      if (!this.catalog) return [];
      return this.catalog.categories;
    },
  },
  methods: {
    money: BioCare.formatPrice,
    catName(id) {
      return BioCare.categoryName(this.catalog.categories, id);
    },
    setCategory(id) {
      this.category = id;
      const url = new URL(window.location.href);
      if (id === "all") url.searchParams.delete("kat");
      else url.searchParams.set("kat", id);
      history.replaceState({}, "", url);
    },
    add(id) {
      BioCareCart.addToCart(id, 1);
      BioCare.showToast("Ürün sepete eklendi");
    },
  },
  async mounted() {
    BioCare.renderShell("urunler");
    try {
      this.catalog = await BioCare.loadCatalog();
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  },
}).mount("#app");
