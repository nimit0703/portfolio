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
          <p class="text-title">What i do?</p> 
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
    <SkillsSwiper></SkillsSwiper>
    <p class="text-title mt-5 mb-5">Featured Projects</p>
    <feature-project></feature-project>
    <p class="text-title mt-5 mb-5">Code Snippet</p>
  </div>
</template>
  
<script setup lang="ts">
import { intro } from '@/module/constant/constant.ts'
import SkillCardHome from "@/components/common/cards/SkillCardHome.vue";
import SkillsSwiper from "@/components/common/swiper/SkillsSwiper.vue"
import FeatureProject from "@/components/section/cards/FeatureProject.vue";
</script>
<style>
</style>
  