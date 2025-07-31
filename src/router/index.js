import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './../views/auth/LoginPage.vue'
import RegisterPage from './../views/auth/RegisterPage.vue'
import Home from './../views/user/HomePage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
      {
        path: 'users',
        name: 'UserManagement',
        component: () => import('@/views/admin/UserManagement.vue'),
      },
      {
        path: 'products',
        name: 'ProductManagement',
        component: () => import('@/views/admin/ProductManagement.vue'),
      },
      {
        path: 'orders',
        name: 'OrderManagement',
        component: () => import('@/views/admin/OrderManagement.vue'),
      },
      {
        path: 'categories',
        name: 'CategoryManagement',
        component: () => import('@/views/admin/CategoryManagement.vue'),
      },
      {
        path: 'banks',
        name: 'BankManagement',
        component: () => import('@/views/admin/BankManagement.vue'),
      },
    ],
  },
  // routes lain nanti ditambah di sini
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
