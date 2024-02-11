<template>
    <div class="sticky-top" :class="currentTheme" >
        <nav class="navbar border-bottom border-1">
            <span class="poppins-regular fs-3" > Nimit</span>
            <div class="d-flex">
                <div class="poppins-light fs-6 p-4" v-for="(tabValue, tabIndex) in tabs" :key="tabIndex">{{ tabValue }}</div>
            </div>
        </nav>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import {useStore } from 'vuex';
const store = useStore();

const props = defineProps(['currentTheme']);



const tabs = ref({
    'homeTab': 'Home',
    'mentorshipTab': "Mentorship",
    'portfolioTab': "Portfolio",
    'sinppetTab': "Snippet",
    'blogTabTab': "Blog"
})

</script>
  