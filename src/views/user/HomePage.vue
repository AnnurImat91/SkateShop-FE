<template>
  <div>
    <Header :user="user" />
    <Banner />
    <main class="max-w-7xl mx-auto px-4 py-8">
      <PostList />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/home/Header.vue';
import Banner from '../../components/home/Banner.vue';
import PostList from '../../components/postList/PostList.vue';
import Footer from '../../components/home/Footer.vue';
import api from '../../api/api';

export default {
  name: 'HomePage',
  components: { Header, Banner, PostList, Footer },
  data() {
    return { user: null };
  },
  async created() {
    try {
      const res = await api.get('/auth/me');
      this.user = res.data;
    } catch (e) {
      console.warn('Guest user');
    }
  }
};
</script>
