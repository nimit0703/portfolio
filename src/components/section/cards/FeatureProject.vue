<template>
    <div>
        <div class="container mb-5" v-for="(project,index) in featuredProjects" >
            <div class="row flex-column-reverse flex-md-row">
                <div class="col-md-5 col-sm-12 order-md-1 order-2">
                    <div class="img-div">
                        <img :src="`/images/${project.img}`" class="img-fluid" alt="Project Image">
                    </div>
                </div>
                <div class="col-md-7 col-sm-12 order-md-2 order-1">
                    <div class="d-flex flex-column">
                        <p class="text-semi-title m-0 p-0">
                            {{project.title}}
                        </p>
                        <p class="text-title">
                            {{project.domain}}
                        </p>
                        <p class="text-gray">
                            {{ project.desc }}
                        </p>
                        <p class="tabs text-gradient-gb">
                            <span class="mr-2" v-for="tag in project.tags"> {{ tag }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="see-more mycard d-flex flex-md-row align-items-center col-12 col-md-3 justify-content-center ml-md-3 p-md-3">
            <i class="bi bi-list"></i>
            <p class="m-0 p-2">See more</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import {featuredProjects} from '@/module/constant/constant'

</script>
  
<style scoped>
/* Add additional responsive styles if needed */
.img-div {
    overflow: hidden;
}

.img-div img {
    width: 100%;
    height: auto;
}

.see-more {
    cursor: pointer;
}

@media screen and (max-width: 767px) {

    /* Adjust styles for small screens if needed */
    .img-div {
        max-width: 100%;
        /* Make the image responsive */
    }
}
</style>
  
  