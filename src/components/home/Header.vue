<template>
  <header class="bg-black text-white px-6 py-4 flex justify-between items-center relative z-50">
    <div class="flex items-center space-x-3">
      <img src="" class="w-10 h-10" alt="Logo" />
      <span class="text-xl font-bold">Skateboard</span>
    </div>
    <div class="flex items-center space-x-4">
      <router-link to="/wishlist">🤍</router-link>
      <router-link to="/cart">🛒</router-link>
      <router-link to="/login"> <span class="hidden sm:block">{{ user?.name || 'Guest' }}</span> </router-link>

      <div class="relative group">
        <button class="text-xl">☰</button>
        <div class="absolute right-0 w-40 bg-white text-black shadow-lg hidden group-hover:block">
          <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-100">Setting</router-link>
          <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>
