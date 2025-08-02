<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Manajemen Bank</h2>

    <!-- Form Tambah Bank -->
    <form @submit.prevent="createBank" class="mb-6 bg-white p-4 rounded border shadow space-y-2">
      <h3 class="font-semibold">Tambah Bank</h3>
      <input v-model="newBank.name" type="text" placeholder="Nama Bank"
             class="w-full px-3 py-2 border rounded" required />
      <input v-model="newBank.account_number" type="text" placeholder="Nomor Rekening"
             class="w-full px-3 py-2 border rounded" required />
      <button type="submit" class="bg-black text-white px-4 py-2 rounded">Tambah</button>
    </form>

    <!-- Tabel Bank -->
    <table class="w-full table-auto border text-sm bg-white shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Nama</th>
          <th class="px-4 py-2 border">Rekening</th>
          <th class="px-4 py-2 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bank in banks" :key="bank.id">
          <td class="border px-4 py-2">{{ bank.id }}</td>
          <td class="border px-4 py-2">{{ bank.name }}</td>
          <td class="border px-4 py-2">{{ bank.account_number }}</td>
          <td class="border px-4 py-2 space-x-2">
            <button @click="deleteBank(bank.id)"
                    class="bg-red-600 text-white px-2 py-1 rounded text-xs">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!banks.length" class="mt-4 text-gray-500">Belum ada bank.</p>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  data() {
    return {
      banks: [],
      newBank: {
        name: '',
        account_number: ''
      }
    };
  },
  async mounted() {
    this.fetchBanks();
  },
  methods: {
    async fetchBanks() {
      try {
        const res = await api.get('/banks/');
        this.banks = res.data;
      } catch (err) {
        console.error('Gagal mengambil data bank:', err);
      }
    },
    async createBank() {
      try {
        await api.post('/banks/', this.newBank, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.newBank = { name: '', account_number: '' };
        this.fetchBanks();
      } catch (err) {
        console.error('Gagal menambahkan bank:', err);
      }
    },
    async deleteBank(id) {
      try {
        await api.delete(`/banks/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchBanks();
      } catch (err) {
        console.error('Gagal menghapus bank:', err);
      }
    }
  }
};
</script>
