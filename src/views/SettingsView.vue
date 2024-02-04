<template>
    <!-- Your app content -->
    <v-container>
        <v-lable> Change Theme</v-lable>
        <v-switch v-model="selectedTheme" hide-details inset :label="selectedTheme ? 'light' : 'dark'"
            @change="handleThemeChange"></v-switch>
    </v-container>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const selectedTheme = ref(false);
const theme = useTheme();

const handleThemeChange = () => {
    theme.global.name.value = selectedTheme.value ? 'dark' : 'light';
};

</script>
  