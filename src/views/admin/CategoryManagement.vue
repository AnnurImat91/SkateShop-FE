<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Manajemen Kategori</h2>

    <!-- Form Tambah Kategori -->
    <form @submit.prevent="createCategory" class="mb-6 bg-white p-4 rounded border shadow space-y-2">
      <h3 class="font-semibold">Tambah Kategori</h3>
      <input v-model="newCategory.name" type="text" placeholder="Nama Kategori"
             class="w-full px-3 py-2 border rounded" required />
      <button type="submit" class="bg-black text-white px-4 py-2 rounded">Tambah</button>
    </form>

    <!-- Tabel Kategori -->
    <table class="w-full table-auto border text-sm bg-white shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Nama</th>
          <th class="px-4 py-2 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categories" :key="cat.id">
          <td class="border px-4 py-2">{{ cat.id }}</td>
          <td class="border px-4 py-2">{{ cat.name }}</td>
          <td class="border px-4 py-2 space-x-2">
            <button @click="deleteCategory(cat.id)"
                    class="bg-red-600 text-white px-2 py-1 rounded text-xs">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!categories.length" class="mt-4 text-gray-500">Belum ada kategori.</p>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  data() {
    return {
      categories: [],
      newCategory: {
        name: ''
      }
    };
  },
  async mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const res = await api.get('/categories/');
        this.categories = res.data;
      } catch (err) {
        console.error('Gagal mengambil kategori:', err);
      }
    },
    async createCategory() {
      try {
        await api.post('/categories/', this.newCategory, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.newCategory.name = '';
        this.fetchCategories();
      } catch (err) {
        console.error('Gagal menambah kategori:', err);
      }
    },
    async deleteCategory(id) {
      try {
        await api.delete(`/categories/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchCategories();
      } catch (err) {
        console.error('Gagal menghapus kategori:', err);
      }
    }
  }
};
</script>
