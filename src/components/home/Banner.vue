<template>
  <swiper :autoplay="{ delay: 100 }" loop class="h-full md:h-80 lg:h-[400px] z-10">
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
        '../../../public/banner/Gambar1.jpg',
        '../../../public/banner/Gambar2.jpg',
        '../../../public/banner/Gambar3.jpg',
      ]
    };
  }
};
</script>
