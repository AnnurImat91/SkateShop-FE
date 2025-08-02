<template>
  <section>
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="Cari produk..."
        class="border px-4 py-2 rounded w-full sm:w-1/3"
      />
      <select v-model="selectedCategory" class="border px-4 py-2 rounded w-full sm:w-1/4">
        <option value="">Semua Kategori</option>
        <option v-for="c in categories" :key="c.id" :value="c.name">{{ c.name }}</option>
      </select>
      <select v-model="sort" class="border px-4 py-2 rounded w-full sm:w-1/4">
        <option value="latest">Terbaru</option>
        <option value="name">Nama A-Z</option>
        <option value="price">Harga Termurah</option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white border rounded-lg shadow-sm p-4 text-center hover:shadow-md transition"
      >
        <img :src="product.image_url || fallback" alt="product" class="w-full h-40 object-cover rounded" />
        <h3 class="text-lg font-semibold mt-2">{{ product.name }}</h3>
        <p class="text-gray-600">Rp {{ product.price.toLocaleString() }}</p>
        <router-link :to="`/product/${product.id}`" class="text-blue-600 hover:underline">
  Lihat Detail
</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../../api/api';

export default {
  data() {
    return {
      products: [],
      categories: [],
      search: '',
      selectedCategory: '',
      sort: 'latest',
      fallback: 'https://via.placeholder.com/300x200?text=Skateboard'
    };
  },
  async created() {
    const [productRes, categoryRes] = await Promise.all([
      api.get('/products/'),
      api.get('/categories/')
    ]);
    this.products = productRes.data;
    this.categories = categoryRes.data;
  },
  computed: {
    filteredProducts() {
      let result = this.products;

      if (this.search) {
        result = result.filter(p =>
          p.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      if (this.selectedCategory) {
        result = result.filter(p => p.category?.name === this.selectedCategory);
      }

      if (this.sort === 'name') {
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sort === 'price') {
        result = [...result].sort((a, b) => a.price - b.price);
      } else if (this.sort === 'latest') {
        result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }

      return result;
    }
  }
};
</script>
