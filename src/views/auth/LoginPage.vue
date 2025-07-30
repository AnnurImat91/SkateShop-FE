<template>
  <AuthWrapper title="Login">
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username"
             class="w-full mb-3 px-4 py-2 border rounded" required />

      <input v-model="password" type="password" placeholder="Password"
             class="w-full mb-4 px-4 py-2 border rounded" required />

      <button type="submit"
              class="bg-black text-white w-full py-2 rounded hover:bg-gray-800">Login</button>

      <p v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</p>
    </form>

    <template #footer>
      Belum punya akun?
      <router-link to="/register" class="text-blue-600 hover:underline">Daftar</router-link>
    </template>
  </AuthWrapper>
</template>

<script>
import AuthWrapper from '../../components/login/AuthWrapper.vue';
import api from '../../api/api';

export default {
  name: 'LoginPage',
  components: {
    AuthWrapper
  },
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      this.error = '';
      try {
        const res = await api.post(
        '/auth/login',
        qs.stringify({
          username: this.email, // bisa email atau username
          password: this.password,
          grant_type: 'password'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

        localStorage.setItem('token', res.data.access_token);
        this.$router.push('/');
      } catch (err) {
        console.error('LOGIN ERROR:', err.response?.data || err.message);

        const detail = err.response?.data?.detail;
        this.error = Array.isArray(detail)
          ? detail[0]?.msg
          : detail || 'Username atau password salah';
      }
    }
  }
};
</script>
