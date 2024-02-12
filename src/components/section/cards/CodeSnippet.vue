<template>
    <div class="">
        <div class="container mb-5" v-for="i in 2">
            <div class="row">
                <div class="col-5">
                    <div class="img-div">
                        <img src="/images/goku.jpg">
                    </div>
                </div>
                <div class="col-5">
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
        <div class="see-more mycard d-flex col-1 justify-content-center align-items-center ml-3">
            <i class="bi bi-list"></i>
            <p class="m-0 p-2">See more</p>
        </div>
    </div>
</template>
  
<style scoped></style>

<script setup lang="ts">

</script>