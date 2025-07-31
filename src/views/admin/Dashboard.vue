<template>
  <AdminLayout>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Admin Management</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link to="/admin/categories" class="admin-card">Categories</router-link>
        <router-link to="/admin/products" class="admin-card">Products</router-link>
        <router-link to="/admin/orders" class="admin-card">Orders</router-link>
        <router-link to="/admin/banks" class="admin-card">Banks</router-link>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from './AdminLayout.vue'
export default {
  name: 'AdminDashboard',
  components: { AdminLayout },
}
</script>

<style scoped>
.admin-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 0.5rem;
  height: 120px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  transition: background 0.2s;
}
.admin-card:hover {
  background: #e5e7eb;
  color: #2563eb;
  text-decoration: underline;
}
</style>
