<template>
  <div class="d-flex flex-column">
    <div class="row introDes">
      <h3 class="col-9 text-gradient-gb poppins-medium text-spacing-3">
        {{ intro }}
      </h3>
    </div>
    <div class="row">
      <div class="bio-section col-8">
        <div class="row bio-card col-12">
          <div class="bio-img col-4 d-flex justify-content-center border-5 border-success">
            <img src="/images/avtar_img.png" class="img-logo">
          </div>
          <div class="bio-text col-6 d-flex flex-column">
            <p class="text-title">Biography</p>
            <p class="text-gray">{{ intro }}</p>
          </div>
        </div>
      </div>
      <div class="connect-section d-flex flex-column col-3">
        <h6 class="text-title">Let's connect</h6>
        <div class="d-flex mt-4">
          <i class="bi fs-4 bi-instagram mr-5"></i>
          <i class="bi fs-4 bi-linkedin mr-5"></i>
          <i class="bi fs-4 bi-github mr-5"></i>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-4 d-flex flex-column">
        <div class="">
          <p class="text-title"></p> What i do?
        </div>
        <div class="mt-3">
          <p class="text-gray">
            {{ intro }}
          </p>
        </div>
      </div>
      <div class="col-8 p-2">
        <div class="container">
          <div class="row ">
            <SkillCardHome 
            :icon="'bi bi-github'"
            :title="'front-end'"
            :desc="intro"
            ></SkillCardHome>
            
            <SkillCardHome
            :icon="'bi bi-github'"
            :title="'front-end'"
            :desc="intro"
            ></SkillCardHome>
          </div>
        </div>
      </div>
    </div>

    <!-- <Swiper
      ref="swiperRef"
      :slidesPerView="3.5"
      :centeredSlides="true"
      :spaceBetween="30"
      :navigation="true"
      :modules="modules"
      :autoplay="{
          delay:400,
          disableOnInteraction: false,
        }"
      class="mySwiper"
    >
      <SwiperSlide class="">
        <img src="/images/vue-dot-js.svg">
      </SwiperSlide>
    </Swiper> -->
    <!-- End Swiper component -->

    <!-- <p class="append-buttons"></p> -->
    <SkillsSwiper></SkillsSwiper>
  </div>
</template>
  
<script setup lang="ts">
import { intro } from '@/module/constant/constant.ts'
import SkillCardHome from "@/components/common/cards/SkillCardHome.vue";
import SkillsSwiper from "@/components/common/swiper/SkillsSwiper.vue"
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/assets/style/swiper.css'
import { Pagination, Navigation , Autoplay} from 'swiper/modules';

const modules = [Pagination, Navigation, Autoplay];

</script>
<style>
</style>
  