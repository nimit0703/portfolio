<template>
  <v-app :class="`bg-${currentTheme}`" class="">
    <div class="container">   
      <Navbar/>
      <div class="">
        <RouterView class=""/>
      </div>
     </div>
  </v-app>
</template><script setup lang="ts">
import Navbar from '@/components/common/nav/Navbar.vue'
import {useStore } from 'vuex';
const store = useStore();

const currentTheme = store.getters.currentTheme;
</script>
