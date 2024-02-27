<template>
    <div class="project-view-start">
        <p class="text-title"> Code Snippet</p>
        <div class="search-box">
            <v-autocomplete v-model="searchedRepo" :items="repoNames" append-inner-icon="mdi-magnify" auto-select-first
                class="flex-full-width" density="comfortable" item-props menu-icon=""
                placeholder="Search project from my Github" variant="solo"></v-autocomplete>
        </div>
        <div class="my-gallery row">
            <div class="col-4">
                <div class="px-3 py-2 border my-4  mycard" v-for="(repo, i) in group3" :key="i"
                    @click="redirectToGithub(repo.html_url)">
                    <p class="text-center fs-6">{{ repo.name }}</p>
                    <p class="desc-text text-center" :style="getDescriptionStyle">{{ repo.description ? repo.description :
                        'No description was added' }}</p>
                    <p v-if="repo.topics" class="text-center overflow-hidden">
                        <span v-for="(topic, i) in repo.topics" :key="i" class="mx-2" style="opacity: 0.7;">
                            {{ topic }}</span>
                    </p>
                    <p class="text-center">
                        <i class="bi bi-arrow-up-right-square fs-5"></i>
                    </p>
                </div>
            </div>
            <div class="col-4">

                <div class="px-3 py-2 border my-4  mycard" v-for="(repo, i) in group2" :key="i"
                    @click="redirectToGithub(repo.html_url)">
                    <p class="text-center fs-6">{{ repo.name }}</p>
                    <p class="desc-text text-center" :style="getDescriptionStyle">{{ repo.description ? repo.description :
                        'No description was added' }}</p>
                    <p v-if="repo.topics" class="text-center text-wrap overflow-hidden">
                        <span v-for="(topic, i) in repo.topics" :key="i" class="mx-2" style=" opacity: 0.7;">
                            {{ topic }}</span>
                    </p>
                    <p class="text-center">
                        <i class="bi bi-arrow-up-right-square fs-5"></i>
                    </p>
                </div>
            </div>
            <div class="col-4">

                <div class="px-3 py-2 border my-4  mycard" v-for="(repo, i) in group1" :key="i"
                    @click="redirectToGithub(repo.html_url)">
                    <p class="text-center fs-6">{{ repo.name }}</p>
                    <p class="desc-text text-center" :style="getDescriptionStyle">{{ repo.description ? repo.description :
                        'No description was added' }}</p>
                    <p v-if="repo.topics" class="text-center overflow-hidden">
                        <span v-for="(topic, i) in repo.topics" :key="i" class="mx-2" style="opacity: 0.7;">
                            {{ topic }}</span>
                    </p>
                    <p class="text-center">
                        <i class="bi bi-arrow-up-right-square fs-5"></i>
                    </p>
                </div>
            </div>


        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import store from '@/store/store';

interface Repository {
    id: number;
    name: string;
    topics: string[];
    description: string;
    html_url: string;
    language: string | null; // Assuming language can be null or a string
}
const repoNames = ref([]);
const repos = ref<Repository[]>([]);
const searchedRepo: any = ref();
const group1 = computed(() => splitArrayIntoThreeEqualParts(filteredRepos.value)[0]);
const group2 = computed(() => splitArrayIntoThreeEqualParts(filteredRepos.value)[1]);
const group3 = computed(() => splitArrayIntoThreeEqualParts(filteredRepos.value)[2]);


onMounted(async () => {
    try {
        const response = await axios.get('https://api.github.com/users/nimit0703/repos');
        repos.value = response.data;
        repoNames.value = response.data.map((repo: { name: any; }) => repo.name);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
});

function redirectToGithub(url: string) {
    console.log(url);
    window.open(url, '_blank');
}
function splitArrayIntoThreeEqualParts(arr: Repository[]) {
    const totalLength = arr.length;
    if (totalLength <= 3) {
        return [[], [], arr]
    }

    const partSize = totalLength / 3;
    const firstPart = arr.slice(0, partSize);
    const secondPart = arr.slice(partSize, 2 * partSize);
    const thirdPart = arr.slice(2 * partSize);

    return [firstPart, secondPart, thirdPart];
}
const theme = computed(() => store.getters.currentTheme);

const getDescriptionStyle = computed(() => {
    return {
        color: theme.value === 'dark' ? '#938cc9' : '#8373ff',
    };
})
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
  
<style scoped>
.desc-text {
    color: antiquewhite;
}


i {
    margin-top: -20px;
    visibility: hidden;
}

.mycard:hover i {
    visibility: visible;
}

@media screen and (max-width: 800px) {}

@media screen and (max-width: 600px) {}
</style>
  