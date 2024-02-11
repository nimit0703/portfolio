<template>
  <div class="d-flex flex-column">
    <div class="row introDes">
      <h3 class="col-9 text-gradient-gb poppins-medium text-spacing-3">
        {{ intro }}
      </h3>
    </div>
    <div class="row">
      <div class="bio-section col-8">
        <div class="row bio-card col-6">
          <div class="bio-img col-4 d-flex justify-content-center border-5 border-success">
            <img src="/images/avtar_img.png" class="img-logo">
          </div>
          <div class="bio-text col-6 d-flex flex-column">
            <h6>Biography</h6>
            <p class="text-secondary">Lorem iadssdpsum dolor sit amet consectetur adipisicing elit. Culpa, placeat!</p>
          </div>
        </div>
      </div>
      <div class="connect-section d-flex flex-column col-3">
        <h6 class="">Let's connect</h6>
        <div class="d-flex mt-4">
          <i class="bi fs-4 bi-instagram mr-5"></i>
          <i class="bi fs-4 bi-linkedin mr-5"></i>
          <i class="bi fs-4 bi-github mr-5"></i>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { intro } from '@/module/constant/constant.ts'

</script>
  