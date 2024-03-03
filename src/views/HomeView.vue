<template>
  <div class="d-flex flex-column">
    <div class="row introDes">
      <h2 class="col-lg-11 col-md-11 col-12 text-gradient-gb poppins-medium text-spacing-3" style="letter-spacing: 1px;">
        {{ intro }}
      </h2>
    </div>
    <div class="row">
      <div class="bio-section col-lg-8 col-md-8 col-12">
        <div class="row bio-card col-12">
          <div class="bio-img col-4 d-flex justify-content-center border-5 border-success">
            <img src="/images/my-avtar3.png" class="img-logo">
          </div>
          <div class="bio-text col-6 d-flex flex-column">
            <p class="text-title">Biography</p>
            <p class="text-gray">{{ intro }}</p>
          </div>
        </div>
      </div>
      <div class="connect-section d-flex flex-column col-lg-3 col-md-3 col-12">
        <h6 class="text-title">Let's connect</h6>
        <div class="d-flex mt-4 connection-icons">
          <i class="bi fs-4 bi-instagram mr-5" @click="redirectToSpecificUrl('https://www.instagram.com/nimit.trevadiya3/')"></i>
          <i class="bi fs-4 bi-linkedin mr-5" @click="redirectToSpecificUrl('https://www.linkedin.com/in/nimittrevadiya/')"></i>
          <i class="bi fs-4 bi-github mr-5" @click="redirectToSpecificUrl('https://github.com/nimit0703')"></i>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-md-4 col-12 d-flex flex-column">
        <div class="">
          <p class="text-title">What i do?</p> 
        </div>
        <div class="mt-3">
          <p class="text-gray">
            {{ intro }}
          </p>
        </div>
      </div>
      <div class="col-lg-8 col-md-8 col-12 p-2">
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
    <code-snippet></code-snippet>
  </div>
</template>
  
<script setup lang="ts">
import { intro } from '@/module/constant/constant.ts'
import SkillCardHome from "@/components/common/cards/SkillCardHome.vue";
import SkillsSwiper from "@/components/common/swiper/SkillsSwiper.vue"
import FeatureProject from "@/components/section/cards/FeatureProject.vue";
import CodeSnippet from '@/components/section/cards/CodeSnippet.vue';

const redirectToSpecificUrl = (specificUrl:string) => {
    window.open(specificUrl, '_blank');
}
</script>
<style>
</style>
  