<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Kelola Pengguna</h2>

    <table class="w-full table-auto border border-gray-200 text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Username</th>
          <th class="px-4 py-2 border">Full Name</th>
          <th class="px-4 py-2 border">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="border px-4 py-2">{{ user.id }}</td>
          <td class="border px-4 py-2">{{ user.username }}</td>
          <td class="border px-4 py-2">{{ user.full_name }}</td>
          <td class="border px-4 py-2">{{ user.email }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="!users.length" class="mt-4 text-gray-500">Tidak ada pengguna.</p>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  data() {
    return {
      users: []
    };
  },
  async mounted() {
    try {
      const res = await api.get('/users/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.users = res.data;
    } catch (err) {
      console.error('Gagal mengambil data pengguna:', err);
    }
  }
};
</script>
