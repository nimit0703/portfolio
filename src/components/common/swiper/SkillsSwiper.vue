<template>
    <div class="d-flex flex-column">
      <Swiper
        ref="swiperRef"
        :loop="true"
        :loopedSlides="additionalSlides"
        :slidesPerView="3.5"
        :centeredSlides="true"
        :spaceBetween="30"
        :navigation="false"
        :modules="modules"
        :autoplay="{ delay: 700 }"
        class="mySwiper"
      >
        <SwiperSlide v-for="(slide, index) in slides" :key="index">
          <img :src="slide.image" alt="Slide Image">
        </SwiperSlide>
      </Swiper>
      <!-- End Swiper component -->
    </div>
  </template>
  
  <script setup lang="ts">
  import 'swiper/css';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  import '@/assets/style/swiper.css'
  import { Pagination, Navigation, Autoplay } from 'swiper/modules';
  
  const modules = [Pagination, Navigation, Autoplay];
  
  const slides = [
  { image: "/images/vue-dot-js.svg" },
  { image: "/images/vuex.svg" },
  { image: "/images/html.svg" },
  { image: "/images/css.svg" },
  { image: "/images/vuetify.svg" },
  { image: "/images/bootstrap.svg" },
  { image: "/images/angular.svg" },
  { image: "/images/bootstrap-vue.png" },
  { image: "/images/java.svg" },
  { image: "/images/jira.svg" },
  // Add more slides with actual image URLs
];
  
  const additionalSlides = slides.length; // Number of additional slides to clone
  
  </script>
  