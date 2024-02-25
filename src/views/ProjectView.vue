<template>
    <div class="project-view-start">
        <p class="text-title"> Code Snippet</p>
        <div class="search-box">
            <v-autocomplete v-model="searchedRepo" :items="repoNames" append-inner-icon="mdi-magnify" auto-select-first
                class="flex-full-width" density="comfortable" item-props menu-icon=""
                placeholder="Search project from my Github" variant="solo"></v-autocomplete>
            <div class="searched-card">
                <div class="repo-desc d-flex flex-wrap justify-content-around">
                    <div class="repo col-3 mt-5 mr-5 mycard px-5 d-flex flex-column " v-for="repo in filteredRepos" :key="repo.name">
                        <div class="fs-4 mt-2">{{ repo.name }}</div>
                        <div class="text-gray mt-2 p-2">
                            {{ repo.description }}
                        </div>
                        <ul>
                            <li v-for="(topic, i) in repo.topics" :key="i">
                                {{ topic }}
                            </li>
                        </ul>
                         language : {{ repo.language }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const repoNames = ref([]);
const repos = ref([]);
const searchedRepo: any = ref();

onMounted(async () => {
    try {
        const response = await axios.get('https://api.github.com/users/nimit0703/repos');
        repos.value = response.data;
        repoNames.value = response.data.map((repo: { name: any; }) => repo.name);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
});

// Create a computed property for filtered repos based on the search term
const filteredRepos = computed(() => {
    if (!searchedRepo.value) {
        // If no search term, display all repos
        return repos.value;
    } else {
        // If there is a search term, filter repos based on the search
        return repos.value.filter((repo: any) => repo.name.includes(searchedRepo.value));
    }
});
</script>
  
<style scoped></style>
  