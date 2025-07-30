<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white p-5">
      <h1 class="text-xl font-bold mb-6">Admin Panel</h1>
      <ul class="space-y-3">
        <li><router-link to="/admin/dashboard" class="hover:underline">Dashboard</router-link></li>
        <li><router-link to="/admin/users" class="hover:underline">Users</router-link></li>
        <li><router-link to="/admin/products" class="hover:underline">Products</router-link></li>
        <li><router-link to="/admin/orders" class="hover:underline">Orders</router-link></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto bg-gray-50">
      <router-view />
    </main>
  </div>
</template>
