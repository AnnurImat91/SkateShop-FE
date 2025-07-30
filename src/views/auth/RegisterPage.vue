<template>
  <AuthWrapper title="Register">
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Username"
            class="w-full mb-3 px-4 py-2 border rounded" required />

      <input v-model="full_name" type="text" placeholder="Full Name"
            class="w-full mb-3 px-4 py-2 border rounded" required />

      <input v-model="email" type="email" placeholder="Email"
            class="w-full mb-3 px-4 py-2 border rounded" required />

      <input v-model="password" type="password" placeholder="Password"
            class="w-full mb-4 px-4 py-2 border rounded" required />

      <button type="submit" class="bg-black text-white w-full py-2 rounded hover:bg-gray-800">
        Register
      </button>

      <p v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</p>
    </form>

    <template #footer>
      Sudah punya akun?
      <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
    </template>
  </AuthWrapper>

</template>

<script>
import AuthWrapper from './../../components/login/AuthWrapper.vue';
import api from './../../api/api';

export default {
  components: { AuthWrapper },
  data() {
    return {
      username: '',
      full_name: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
  async register() {
    this.error = '';
    try {
      const response = await api.post('/auth/register', {
        username: this.username,
        full_name: this.full_name,
        email: this.email,
        password: this.password
      });

      // Jika berhasil, arahkan ke halaman login
      console.log('Register success:', response.data);
      this.$router.push('/login');
    } catch (err) {
        const res = err.response?.data;
        console.error('REGISTER ERROR:', res); // ← tampilkan di console

        if (Array.isArray(res?.detail)) {
          this.error = res.detail[0]?.msg || 'Terjadi kesalahan saat mendaftar.';
        } else if (typeof res?.detail === 'string') {
          this.error = res.detail;
        } else {
          this.error = 'Gagal mendaftar. Cek console untuk detail.';
        }
      }
    }
  }
};
</script>
