<template>
  <div class="d-flex flex-column">
    <Swiper ref="swiperRef" :loop="true" :loopedSlides="additionalSlides" :slidesPerView="calculateSlidesPerView()"
      :centeredSlides="true" :spaceBetween="30" :navigation="false" :modules="modules" :autoplay="{ delay: 1200 }"
      class="mySwiper">
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <img :src="slide.image"  class="responsive-image" alt="Slide Image">
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

const calculateSlidesPerView = () => {
  // Adjust this logic based on your design preferences
  if (window.innerWidth >= 1200) {
    return 3.5;
  } else if (window.innerWidth >= 768) {
    return 2.5;
  } else {
    return 1.5;
  }
}
</script>
  
  
<style scoped >
/* Default styles */
.responsive-image {
  width: 300px;
  height: auto; /* Maintain aspect ratio */
}

/* Media query for screens with a maximum width of 1200px */
@media screen and (max-width: 1200px) {
  .responsive-image {
    width: 200px;
    height: auto; /* Adjust as needed */
  }
}

/* Media query for screens with a maximum width of 768px */
@media screen and (max-width: 768px) {
  .responsive-image {
    width: 100px;
    height: auto; /* Adjust as needed */
  }
}

</style>