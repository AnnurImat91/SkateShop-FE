<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Manajemen Produk</h2>

    <!-- Form Tambah/Edit Produk -->
    <form @submit.prevent="isEdit ? updateProduct() : createProduct()"
      class="space-y-3 bg-white p-4 rounded border mb-6 shadow">
      <h3 class="font-semibold text-lg">
        {{ isEdit ? 'Edit Produk' : 'Tambah Produk' }}
      </h3>

      <input v-model="form.name" type="text" placeholder="Nama Produk"
        class="w-full px-3 py-2 border rounded" required />

      <textarea v-model="form.description" placeholder="Deskripsi"
        class="w-full px-3 py-2 border rounded" required></textarea>

      <input v-model.number="form.price" type="number" placeholder="Harga"
        class="w-full px-3 py-2 border rounded" required />

      <input v-model="form.image_url" type="text" placeholder="URL Gambar"
        class="w-full px-3 py-2 border rounded" required />

      <input v-model.number="form.stock" type="number" placeholder="Stok"
        class="w-full px-3 py-2 border rounded" required />

      <input v-model.number="form.category_id" type="number" placeholder="ID Kategori"
        class="w-full px-3 py-2 border rounded" required />

      <div class="flex justify-between gap-2">
        <button type="submit" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          {{ isEdit ? 'Update' : 'Tambah' }}
        </button>
        <button type="button" v-if="isEdit" @click="cancelEdit"
          class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          Batal
        </button>
      </div>
    </form>

    <!-- Daftar Produk -->
    <table class="w-full table-auto border text-sm bg-white shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Nama</th>
          <th class="px-4 py-2 border">Harga</th>
          <th class="px-4 py-2 border">Stok</th>
          <th class="px-4 py-2 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td class="border px-4 py-2">{{ p.id }}</td>
          <td class="border px-4 py-2">{{ p.name }}</td>
          <td class="border px-4 py-2">Rp {{ p.price.toLocaleString('id-ID') }}</td>
          <td class="border px-4 py-2">{{ p.stock }}</td>
          <td class="border px-4 py-2 space-x-2">
            <button @click="editProduct(p)" class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
            <button @click="deleteProduct(p.id)" class="bg-red-600 text-white px-2 py-1 rounded text-xs">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!products.length" class="mt-4 text-gray-500">Belum ada produk.</p>
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
        image_url: '',
        stock: 0,
        category_id: 0
      },
      isEdit: false,
      editingId: null
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
        this.resetForm();
      } catch (err) {
        console.error('Gagal menambah produk:', err.response?.data);
      }
    },
    editProduct(p) {
      this.isEdit = true;
      this.editingId = p.id;
      this.form = {
        name: p.name,
        description: p.description,
        price: p.price,
        image_url: p.image_url,
        stock: p.stock,
        category_id: p.category_id
      };
    },
    async updateProduct() {
      try {
        await api.put(`/products/${this.editingId}`, this.form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchProducts();
        this.resetForm();
      } catch (err) {
        console.error('Gagal mengupdate produk:', err.response?.data);
      }
    },
    async deleteProduct(id) {
      if (!confirm('Yakin ingin menghapus produk ini?')) return;
      try {
        await api.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchProducts();
      } catch (err) {
        console.error('Gagal hapus produk:', err.response?.data);
      }
    },
    resetForm() {
      this.form = {
        name: '',
        description: '',
        price: 0,
        image_url: '',
        stock: 0,
        category_id: 0
      };
      this.isEdit = false;
      this.editingId = null;
    },
    cancelEdit() {
      this.resetForm();
    }
  }
};
</script>
