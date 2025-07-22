<template>
    <v-container>
        <div class="flex-column d-sm-flex flex-sm-row offset-md-1 mt-9" data-aos="fade-up" data-aos-offset="50"
            data-aos-delay="1" data-aos-duration="600" data-aos-easing="ease-in-out" data-aos-once="true">
            <v-col cols="12" md="11" sm="12">
                <h1 class="pb-15">Latest Blogs</h1>
                <div class="pb-5">
                    <v-row
                        @click.prevent="redirect('https://medium.com/@nimit0703/failed-to-execute-put-issue-in-vuex-persistent-db-a-developer-s-guide-81025ad3a2fb')">

                        <v-col cols="8">
                            <div class="m-2">
                                <h2>"Failed to Execute" Put Issue in Vuex Persistent DB: A Developer’s Guide</h2>
                            </div>
                            <span class="mt-2"> The issue arises because the vuex-persist-indexeddb library
                                encounters
                                problems when attempting to store non-serializable data in IndexedDB. IndexedDB
                                requires
                                all data to be serializable, and certain data structures (e.g., circular references,
                                functions, or complex objects) cannot be directly stored.</span>
                        </v-col>
                        <v-col cols="4">
                            <v-img :width="150" aspect-ratio="16/9" cover
                                src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*lKRFwtk_jQYqG56kOs8wKw.png"></v-img>

                        </v-col>
                    </v-row>
                </div>

            </v-col>
        </div>
        <v-col cols="12" md="11" sm="12">
            <v-divider id="feelsGoodMan" class="mt-15 offset-md-1" color="#ffffff"></v-divider>
        </v-col>
    </v-container>
</template>

<script setup>
const redirect = (url) => {
    // Use window.location.href to navigate to the URL
    window.open(url, "_blank");
};
</script>


<style scoped>
h1 {
    color: #fff;
    font-weight: 400;
    letter-spacing: 2px;
}

h2,
h1,
span {
    /* cursor: context-menu; */
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
    -webkit-transition: 0.9s ease-in-out;
    transition: 0.4s ease-in-out;
}

/* a:hover {
    opacity: 0.9;
    transition: all 400ms ease-in-out;
    box-shadow: inset 0 -55px 0 0 #536dfe;
} */

#links {
    cursor: pointer;
}

</style>