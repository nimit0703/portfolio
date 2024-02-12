<template>
    <div class="">
        <div class="container mb-5">
            <div class="row">
                <div class="col-5 mycard m-3" v-for="i in 4">
                    <div class="d-flex flex-column p-2">
                        <p class="text-title fs-4">
                            Project domain
                        </p>
                        <p class="text-gray">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis recusandae animi, mollitia illo
                            autem unde dicta ducimus. Vel, nobis perferendis.
                        </p>
                        <p class="tabs text-gradient-gb">
                            <span class="mr-2">
                                <img src="/images/vue.svg">
                            </span>
                            <span class="mr-2">
                                <img src="/images/angular.svg">
                            </span>
                            <span class="mr-2">
                                <img src="/images/vuetify.svg">
                            </span>
                            <span class="mr-2">
                                <img src="/images/java.svg">
                            </span>
                            <span class="mr-2">
                                <img src="/images/bootstrap.svg">
                            </span>
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
  
<style scoped>
img {
    width: 30px;
    height: 30px;
}
</style>

<script setup lang="ts">

</script>