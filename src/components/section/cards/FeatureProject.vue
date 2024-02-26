<template>
    <div>
        <div class="container mb-5" v-for="i in 2">
            <div class="row">
                <div class="col-md-5">
                    <div class="img-div">
                        <img src="/images/beach.jpg" class="img-fluid" alt="Project Image">
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="d-flex flex-column">
                        <p class="text-semi-title m-0 p-0">
                            Project domain
                        </p>
                        <p class="text-title">
                            Project domain
                        </p>
                        <p class="text-gray">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis recusandae animi, mollitia illo
                            autem unde dicta ducimus. Vel, nobis perferendis.
                        </p>
                        <p class="tabs text-gradient-gb">
                            <span class="mr-2"> Vue</span>
                            <span class="mr-2"> VueX</span>
                            <span class="mr-2"> Vuetify</span>
                            <span class="mr-2"> Axios</span>
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
  
<script setup lang="ts">

</script>
  