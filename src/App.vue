<template>
  <v-app>
    <!-- Your app content -->
    <div class="d-flex flex-column">
      
      <v-switch v-model="selectedTheme" hide-details inset :label="selectedTheme ? 'light' : 'dark'" @change="handleThemeChange"></v-switch>
      <RouterView></RouterView>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const selectedTheme = ref(false);
const theme = useTheme();

const handleThemeChange = () => {
    theme.global.name.value = selectedTheme.value ? 'dark' : 'light';
    console.log('Theme switched to:', theme.global.name.value);
};

</script>
