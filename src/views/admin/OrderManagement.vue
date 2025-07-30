<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Kelola Pesanan</h2>

    <table class="w-full table-auto border text-sm bg-white shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">User</th>
          <th class="px-4 py-2 border">Total</th>
          <th class="px-4 py-2 border">Status</th>
          <th class="px-4 py-2 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="border px-4 py-2">{{ order.id }}</td>
          <td class="border px-4 py-2">{{ order.user_id }}</td>
          <td class="border px-4 py-2">{{ order.total_price }}</td>
          <td class="border px-4 py-2">{{ order.status }}</td>
          <td class="border px-4 py-2 space-x-2">
            <button
              v-if="order.status !== 'completed'"
              @click="updateStatus(order.id, 'completed')"
              class="bg-green-600 text-white text-xs px-2 py-1 rounded"
            >
              Tandai Selesai
            </button>
            <button
              @click="deleteOrder(order.id)"
              class="bg-red-600 text-white text-xs px-2 py-1 rounded"
            >
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!orders.length" class="mt-4 text-gray-500">Tidak ada pesanan.</p>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  data() {
    return {
      orders: []
    };
  },
  async mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await api.get('/orders/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.orders = res.data;
      } catch (err) {
        console.error('Gagal mengambil pesanan:', err);
      }
    },
    async updateStatus(orderId, status) {
      try {
        await api.put(`/orders/status/${orderId}`, { status }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchOrders();
      } catch (err) {
        console.error('Gagal mengubah status:', err);
      }
    },
    async deleteOrder(orderId) {
      try {
        await api.delete(`/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchOrders();
      } catch (err) {
        console.error('Gagal hapus order:', err);
      }
    }
  }
};
</script>
