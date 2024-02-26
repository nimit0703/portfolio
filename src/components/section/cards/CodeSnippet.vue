<template>
    <div>
      <div class="container mb-5">
        <div class="row">
          <div class="col-md-5 mycard m-3" v-for="i in 4">
            <div class="d-flex flex-column p-3">
              <p class="text-title fs-5">Project domain</p>
              <p class="text-gray">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis recusandae animi, mollitia illo autem unde dicta ducimus. Vel, nobis perferendis.
              </p>
              <p class="tabs text-gradient-gb">
                <span class="mr-2">
                  <img src="/images/vue.svg" alt="Vue Logo">
                </span>
                <span class="mr-2">
                  <img src="/images/angular.svg" alt="Angular Logo">
                </span>
                <span class="mr-2">
                  <img src="/images/vuetify.svg" alt="Vuetify Logo">
                </span>
                <span class="mr-2">
                  <img src="/images/java.svg" alt="Java Logo">
                </span>
                <span class="mr-2">
                  <img src="/images/bootstrap.svg" alt="Bootstrap Logo">
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="see-more mycard d-flex col-12 col-md-2 justify-content-center align-items-center ml-md-3 p-md-3">
        <i class="bi bi-list"></i>
        <p class="m-0 p-2">See more</p>
      </div>
    </div>
  </template>
  
  <style scoped>
  .img-div {
    overflow: hidden;
  }
  
  .img-div img {
    width: 100%;
    height: auto;
  }
  
  .see-more {
    cursor: pointer;
    border-radius: 8px; /* Add border-radius for a rounded appearance */
  }
  
  img {
    width: 30px;
    height: 30px;
  }
  
  @media screen and (max-width: 767px) {
    /* Adjust styles for small screens if needed */
    .img-div {
      max-width: 100%; /* Make the image responsive */
    }
  }
  </style>
  
  <script setup lang="ts">
  
  </script>
  