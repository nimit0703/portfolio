<template>
  <v-container>
    <div class="flex-column d-sm-flex flex-sm-row offset-md-1 mt-9" data-aos="fade-up" data-aos-offset="50"
      data-aos-delay="1" data-aos-duration="600" data-aos-easing="ease-in-out" data-aos-once="true">
      <v-col cols="12" md="11" sm="12">
        <h1 class="pb-15">Latest Blogs</h1>

        <div class="pb-5 cursor-pointer mb-5" v-for="(blog, index) in blogs" :key="index">
          <v-row @click.prevent="redirect(blog.link)">
            <v-col cols="8">
              <div class="m-2 mb-4">
                <h2>{{ blog.title }}</h2>
              </div>
              <span class="mt-4">{{ blog.description }}</span>
            </v-col>
            <v-col cols="4">
              <v-img
                v-if="blog.image"
                :width="150"
                aspect-ratio="16/9"
                cover
                :src="blog.image"
              />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </div>

    <v-col cols="12" md="11" sm="12">
      <v-divider id="feelsGoodMan" class="mt-15 offset-md-1" color="#ffffff" />
    </v-col>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const blogs = ref([
  {
    title: `"Failed to Execute" Put Issue in Vuex Persistent DB: A Developer’s Guide`,
    description:
      'The issue arises because the vuex-persist-indexeddb library encounters problems when attempting to store non-serializable data in IndexedDB. IndexedDB requires all data to be serializable, and certain data structures (e.g., circular references, functions, or complex objects) cannot be directly stored.',
    link: 'https://medium.com/@nimit0703/failed-to-execute-put-issue-in-vuex-persistent-db-a-developer-s-guide-81025ad3a2fb',
    image:
      'https://miro.medium.com/v2/resize:fit:828/format:webp/1*lKRFwtk_jQYqG56kOs8wKw.png'
  },
  {
    title: `Understanding watch, watchEffect, computed, and Vuex Getters`,
    description:
      'When building modern applications in Vue.js, reactive data handling is at the heart of creating a seamless user experience. However, developers often get confused about when to use computed, watch, watchEffect, custom watchers, or Vuex getters.',
    link: 'https://nimit0703.medium.com/mastering-reactivity-in-vue-understanding-watch-watcheffect-computed-and-vuex-getters-0f1a56fe3de2',
    image:
      'https://miro.medium.com/v2/resize:fit:720/format:webp/0*yX-t6aaANHC7sjc0.png'
  },
  {
    title: `JavaScript Event Loop : No more confusion`,
    description:
      'The JavaScript Event Loop is a fundamental concept that allows for non-blocking I/O operations. Understanding how the event loop works is crucial for building efficient applications.',
    link: 'https://nimit0703.medium.com/javascript-event-loop-no-more-confusion-5f1a56fe3de2',
    image:''
  },
  // Add more blogs here
]);

const redirect = (url) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
h1 {
  color: #fff;
  font-weight: 400;
  letter-spacing: 2px;
}

h2 {
  font-size: 19px;
  line-height: 1;
  font-weight: 400;
  letter-spacing: 2px;
  font-family: "PT Sans", sans-serif;
}

span {
  color: #fff;
  opacity: 0.5;
  font-size: 13px;
  letter-spacing: 2px;
}

img {
  width: 150px;
  height: 150px;
}

a {
  text-decoration: none;
  color: #fff !important;
  border-bottom: #536dfe solid 1px;
  padding-bottom: 3px;
  padding-top: 1px;
  box-shadow: inset 0 -1px 0 #536dfe;
  padding-left: 3px;
  padding-right: 3px;
  transition: 0.4s ease-in-out;
}

#links {
  cursor: pointer;
}
</style>
