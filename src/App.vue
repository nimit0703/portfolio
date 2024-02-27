<template>
  <v-app :class="`bg-${themedClass}`">
    <div class="container">
      <h1>Nimit testing workflow</h1>
      <Navbar class="mb-5" :currentTheme="themedClass" />
      <div class="mt-5">
        <RouterView class="" />
      </div>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from '@/components/common/nav/Navbar.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const themedClass = computed(() => store.getters.currentTheme);
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Add your responsive styles here */
@media screen and (max-width: 768px) {
  .container {
    padding: 0 10px;
  }
}
</style>
