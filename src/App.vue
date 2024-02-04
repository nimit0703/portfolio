<template>
  <v-app>
    <!-- Your app content -->
    <NavDrawer1></NavDrawer1>
    <!-- <v-switch v-model="selectedTheme" hide-details inset :label="selectedTheme ? 'light' : 'dark'" @change="handleThemeChange"></v-switch> -->
  </v-app>
</template>

<script setup lang="ts">
import NavDrawer1 from '@/components/common/navDrawer/NavDrawer1.vue'
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const selectedTheme = ref(false);
const theme = useTheme();

const handleThemeChange = () => {
  theme.global.name.value = selectedTheme.value ? 'dark' : 'light';
  console.log('Theme switched to:', theme.global.name.value);
};

</script>
