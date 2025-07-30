<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Kelola Produk</h2>

    <!-- Form Tambah Produk -->
    <form @submit.prevent="createProduct" class="space-y-2 bg-white p-4 rounded border mb-6 shadow">
      <h3 class="font-semibold">Tambah Produk</h3>
      <input v-model="form.name" type="text" placeholder="Nama Produk" class="w-full px-3 py-2 border rounded" required />
      <input v-model="form.category_id" type="number" placeholder="ID Kategori" class="w-full px-3 py-2 border rounded" required />
      <input v-model="form.price" type="number" placeholder="Harga" class="w-full px-3 py-2 border rounded" required />
      <input v-model="form.image" type="text" placeholder="URL Gambar" class="w-full px-3 py-2 border rounded" required />
      <textarea v-model="form.description" placeholder="Deskripsi" class="w-full px-3 py-2 border rounded" required></textarea>
      <button type="submit" class="bg-black text-white px-4 py-2 rounded">Tambah</button>
    </form>

    <!-- Daftar Produk -->
    <table class="w-full table-auto border text-sm bg-white shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Nama</th>
          <th class="px-4 py-2 border">Harga</th>
          <th class="px-4 py-2 border">Stock</th>
          <th class="px-4 py-2 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td class="border px-4 py-2">{{ p.id }}</td>
          <td class="border px-4 py-2">{{ p.name }}</td>
          <td class="border px-4 py-2">{{ p.price }}</td>
          <td class="border px-4 py-2">{{ p.stock }}</td>
          <td class="border px-4 py-2 space-x-2">
            <button @click="restockProduct(p.id)" class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Restock</button>
            <button @click="deleteProduct(p.id)" class="bg-red-600 text-white px-2 py-1 rounded text-xs">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!products.length" class="mt-4 text-gray-500">Tidak ada produk.</p>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  data() {
    return {
      products: [],
      form: {
        name: '',
        description: '',
        price: 0,
        category_id: '',
        image: ''
      }
    };
  },
  async mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await api.get('/products/');
        this.products = res.data;
      } catch (err) {
        console.error('Gagal mengambil produk:', err);
      }
    },
    async createProduct() {
      try {
        await api.post('/products/', this.form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchProducts();
        this.form = { name: '', description: '', price: 0, category_id: '', image: '' };
      } catch (err) {
        console.error('Gagal menambah produk:', err);
      }
    },
    async deleteProduct(id) {
      try {
        await api.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchProducts();
      } catch (err) {
        console.error('Gagal hapus produk:', err);
      }
    },
    async restockProduct(id) {
      try {
        await api.put(`/products/${id}/restock`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchProducts();
      } catch (err) {
        console.error('Gagal restock:', err);
      }
    }
  }
};
</script>
