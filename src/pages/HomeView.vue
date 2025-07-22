<template>
  <v-app id="mainContainer">
    <WebGLCanvas/>
    <div id="content-container">
      <HelloWorld />
      <about />
      <skill />
      <blog />
      <acomplishments />
      <!-- <cases /> -->
      <contact />

    </div>
  </v-app>
</template>

<script lang="ts" setup>
import WebGLCanvas from '@/components/webGL/WebGLCanvas.vue';

</script>
