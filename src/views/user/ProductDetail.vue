<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Gambar Produk -->
      <div>
        <img :src="product.image_url" :alt="product.name"
             class="w-full rounded shadow object-contain h-96 bg-gray-100" />
      </div>

      <!-- Info Produk -->
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
        <p class="text-xl text-gray-800 font-semibold mb-4">
          Rp {{ product.price.toLocaleString('id-ID') }}
        </p>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>
        <p class="text-sm text-gray-500 mb-2">Kategori ID: {{ product.category_id }}</p>
        <p class="text-sm text-gray-500 mb-6">Stok: {{ product.stock > 0 ? product.stock : 'Habis' }}</p>

        <!-- Aksi -->
        <div class="flex space-x-3">
          <button @click="openOrderForm"
            class="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">Order Sekarang</button>
          <button @click="addToWishlist(product)"
            class="border border-gray-800 text-gray-800 px-5 py-2 rounded hover:bg-gray-100">Wishlist</button>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">Memuat detail produk...</div>

    <!-- Modal Form Order -->
    <div v-if="showOrderForm" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
        <h3 class="text-xl font-bold mb-4">Form Pemesanan</h3>
        <form @submit.prevent="submitOrder" class="space-y-3">
          <input v-model="order.customer_name" type="text" placeholder="Nama Lengkap"
            class="w-full px-3 py-2 border rounded" required />
          <input v-model="order.customer_email" type="email" placeholder="Email"
            class="w-full px-3 py-2 border rounded" required />
          <input v-model="order.customer_phone" type="text" placeholder="No HP"
            class="w-full px-3 py-2 border rounded" required />
          <textarea v-model="order.shipping_address" placeholder="Alamat Pengiriman"
            class="w-full px-3 py-2 border rounded" required></textarea>

          <input v-model.number="order.bank_id" type="number" placeholder="ID Bank"
            class="w-full px-3 py-2 border rounded" required />

          <input type="file" @change="handleFileUpload"
            class="w-full border px-3 py-2 rounded" accept="image/*" required />

          <input v-model.number="order.items[0].quantity" type="number" placeholder="Jumlah"
            class="w-full px-3 py-2 border rounded" min="1" required />

          <div class="flex justify-end space-x-2">
            <button type="button" @click="showOrderForm = false"
              class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Batal</button>
            <button type="submit" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Kirim</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  data() {
    return {
      product: null,
      showOrderForm: false,
      order: {
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        shipping_address: '',
        bank_id: 0,
        transfer_proof: '', // base64 string dari file
        items: [
          {
            product_id: 0,
            quantity: 1
          }
        ]
      }
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const res = await api.get(`/products/${id}`);
      this.product = res.data;
      this.order.items[0].product_id = res.data.id;
    } catch (err) {
      console.error('Gagal mengambil detail produk:', err);
    }
  },
  methods: {
    addToWishlist(product) {
      console.log('Wishlist:', product.name);
    },
    openOrderForm() {
      this.showOrderForm = true;
    },
    async handleFileUpload(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.order.transfer_proof = reader.result; // base64
        };
        reader.readAsDataURL(file);
      }
    },
    async submitOrder() {
      try {
        const res = await api.post('/orders/', this.order, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        alert('Pesanan berhasil dibuat!');
        this.showOrderForm = false;
      } catch (err) {
        console.error('Gagal membuat order:', err.response?.data);
        alert('Gagal mengirim order.');
      }
    }
  }
};
</script>
