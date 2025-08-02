<template>
  <swiper :autoplay="{ delay: 3000 }" loop class="h-full md:h-80 lg:h-[400px] z-10">
    <swiper-slide v-for="(banner, i) in banners" :key="i">
      <img :src="banner" class="w-full h-full object-cover" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      banners: [
        '/banner/Gambar1.jpg',   // ✅ benar
        '/banner/Gambar2.jpg',
        '/banner/Gambar3.jpg'
      ]
    };
  }
};
</script>
