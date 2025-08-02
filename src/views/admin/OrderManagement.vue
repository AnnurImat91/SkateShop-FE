<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Manajemen Pesanan</h2>

    <div class="overflow-auto bg-white rounded shadow">
      <table class="min-w-full border text-sm">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="px-4 py-2 border">ID</th>
            <th class="px-4 py-2 border">Customer</th>
            <th class="px-4 py-2 border">Kontak</th>
            <th class="px-4 py-2 border">Alamat</th>
            <th class="px-4 py-2 border">Bank</th>
            <th class="px-4 py-2 border">Status</th>
            <th class="px-4 py-2 border">Tanggal</th>
            <th class="px-4 py-2 border">Item</th>
            <th class="px-4 py-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 border">{{ order.id }}</td>
            <td class="px-4 py-2 border">
              {{ order.customer_name }}
            </td>
            <td class="px-4 py-2 border">
              {{ order.customer_email }}<br />
              {{ order.customer_phone }}
            </td>
            <td class="px-4 py-2 border">{{ order.shipping_address }}</td>
            <td class="px-4 py-2 border">
              {{ order.bank?.name }}<br />
              {{ order.bank?.account_number }}
            </td>
            <td class="px-4 py-2 border">
              <span class="inline-block px-2 py-1 bg-gray-200 text-xs rounded">{{ order.status }}</span>
            </td>
            <td class="px-4 py-2 border">{{ formatDate(order.created_at) }}</td>
            <td class="px-4 py-2 border">
              <ul class="list-disc list-inside space-y-1">
                <li v-for="item in order.items" :key="item.id">
                  ID: {{ item.product_id }} — Qty: {{ item.quantity }} — Rp {{ item.price_at_order.toLocaleString('id-ID') }}
                </li>
              </ul>
            </td>
            <td class="px-4 py-2 border space-y-1">
              <button
                class="bg-blue-600 text-white px-2 py-1 rounded text-xs w-full hover:bg-blue-700"
                @click="updateStatus(order.id)"
              >
                Tandai Selesai
              </button>
              <button
                class="bg-red-600 text-white px-2 py-1 rounded text-xs w-full hover:bg-red-700"
                @click="deleteOrder(order.id)"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="!orders.length" class="mt-6 text-gray-500 text-center">Belum ada pesanan.</p>
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
    async updateStatus(id) {
      try {
        await api.put(`/orders/status/${id}`, {
          status: 'Selesai'
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchOrders();
      } catch (err) {
        console.error('Gagal mengubah status:', err);
      }
    },
    async deleteOrder(id) {
      if (!confirm('Yakin ingin menghapus pesanan ini?')) return;
      try {
        await api.delete(`/orders/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.fetchOrders();
      } catch (err) {
        console.error('Gagal menghapus pesanan:', err);
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    }
  }
};
</script>
