<template>
  <v-app id="mainContainer">
    <WebGLCanvas v-if="showWebGL"/>
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
// import WebGLCanvas from '@/components/webGL/WebGLCanvas.vue';
import { ref, onMounted } from 'vue';

const showWebGL = ref(false);

onMounted(() => {
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  showWebGL.value = hasFinePointer;
});
</script>
