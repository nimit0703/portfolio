<template>
  <v-app :class="themedClass" >
    <div class="container">   
      <Navbar class="mb-5" :currentTheme="themedClass"/>
      <div class="mt-5">
        <RouterView class=""/>
      </div>
     </div>
  </v-app>
</template><script setup lang="ts">
import Navbar from '@/components/common/nav/Navbar.vue'
import { computed, ref } from 'vue';
import {useStore } from 'vuex';
const store = useStore();

const themedClass = computed(() => `bg-${store.getters.currentTheme}`);
</script>
