<template>
    <div class="sticky-top" :class="`bg-${currentTheme}`">
        <nav class="navbar border-bottom border-1">
            <span class="poppins-regular fs-3"> Nimit Trevadiya</span>
            <div class="d-flex">
            <router-link 
                v-for="(tabValue, tabIndex) in tabs" 
                :key="tabIndex" 
                :to="{ name: tabValue.toLowerCase() }" 
                :class="currentTheme=='dark'?'text-light':'text-dark'"
                class="poppins-light fs-6 p-4">
                {{ tabValue }}
            </router-link>
                <div class="d-flex align-items-center justify-content-between">
                    <i class="bi mr-2 fs-4" :class="currentTheme == 'light' ? 'bi-sun-fill' : 'bi-moon-stars-fill'"></i>
                    <v-switch v-model="selectedTheme" 
                    hide-details inset 
                    class="mr-3" @change="handleThemeChange">
                    </v-switch>
                </div>
            </div>
        </nav>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useTheme } from 'vuetify';
const store = useStore();
const props = defineProps(['currentTheme']);

const selectedTheme = ref(false);
const theme = useTheme();

const handleThemeChange = () => {
    theme.global.name.value = selectedTheme.value ? 'light' : 'dark';
    store.commit('changeTheme', theme.global.name.value);
};

const tabs = ref({
    'homeTab': 'Home',
    'projectsTab': "Projects",
    'connectTab': "Connect",
})

</script>
  