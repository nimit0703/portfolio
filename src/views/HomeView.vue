<template>
    <div>
      <v-switch
        v-model="selectedTheme"
        hide-details
        inset
        :label="selectedTheme ? 'light' : 'dark'"
        @change="handleThemeChange"
      ></v-switch>
      <v-btn>
        Button
      </v-btn>
      <simple-map></simple-map>
    </div>
  </template>
  
  <script setup lang="ts">
  import SimpleMap from '@/components/common/map/SimpleMap.vue';
  import { ref, onMounted, computed, watch } from 'vue';
  import { useTheme } from 'vuetify';


  const selectedTheme = ref(false);
  const theme = useTheme();

  const handleThemeChange = () => {
      // Perform tasks based on the selected theme
      theme.global.name.value = selectedTheme.value ? 'dark' : 'light';
      console.log('handle Theme:', theme.global.name.value);
  };

  onMounted(() => {
      // Access Vuetify theme
      console.log('Current Theme:', theme);
  });


  </script>
  