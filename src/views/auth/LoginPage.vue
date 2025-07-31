<template>
  <AuthWrapper title="Login">
    <form @submit.prevent="login">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="w-full mb-3 px-4 py-2 border rounded"
        required
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full mb-4 px-4 py-2 border rounded"
        required
      />

      <button type="submit" class="bg-black text-white w-full py-2 rounded hover:bg-gray-800">
        Login
      </button>

      <p v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</p>
    </form>

    <template #footer>
      Belum punya akun?
      <router-link to="/register" class="text-blue-600 hover:underline">Daftar</router-link>
    </template>
  </AuthWrapper>
</template>

<script>
import qs from 'qs'
import api from '../../api/api'
import AuthWrapper from '../../components/login/AuthWrapper.vue'

export default {
  name: 'LoginPage',
  components: {
    AuthWrapper,
  },
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login() {
      this.error = ''
      try {
        const res = await api.post(
          '/auth/login',
          qs.stringify({
            grant_type: 'password',
            username: this.username,
            password: this.password,
            scope: '',
            client_id: 'string',
            client_secret: 'string',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        localStorage.setItem('token', res.data.access_token)
        // Redirect to admin dashboard after login
        this.$router.push('/admin')
      } catch (err) {
        console.error('LOGIN ERROR:', err.response?.data || err.message)
        const detail = err.response?.data?.detail
        this.error = Array.isArray(detail)
          ? detail[0]?.msg
          : detail || 'Username atau password salah'
      }
    },
  },
}
</script>
