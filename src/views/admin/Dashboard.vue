<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Dashboard Ringkasan</h2>
    <div v-if="summary" class="space-y-4">
      <p><strong>Total Produk:</strong> {{ summary.total_products }}</p>
      <p><strong>Total Pengguna:</strong> {{ summary.total_users }}</p>
      <p><strong>Total Pesanan:</strong> {{ summary.total_orders }}</p>
    </div>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  data() {
    return {
      summary: null
    };
  },
  async mounted() {
    try {
      const res = await api.get('/admin/summary', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.summary = res.data;
    } catch (err) {
      console.error('Gagal mengambil summary:', err);
    }
  }
};
</script>
