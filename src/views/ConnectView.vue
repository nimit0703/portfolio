<template>
    <div class="card-container d-flex align-items-center container p-2 border">
      <div class="container">
        <div class="upper-portion row align-items-center mb-3">
          <div class="col-lg-6 col-md-12 mb-3">
            <p class="text-title fs-4">Address</p>
            <p class="text-gray py-0">Sarvam Heights</p>
            <p class="text-gray py-0">Manjalpur, Vadodara</p>
            <p class="text-gray py-0">Gujarat, India</p>
          </div>
          <div class="col-lg-6 col-md-12 mb-3">
            <p class="text-title fs-4">Drop a line </p>
            <p class="text-gray py-0">link.nimit@gmail.com</p>
            <p class="text-title fs-4">Call me</p>
            <p class="text-gray py-0">9106067945</p>
          </div>
        </div>
        <div class="lower-portion">
          <div class="map-container">
            <SimpleMap :height="mapHeight" :width="mapWidth"></SimpleMap>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  p {
    margin-bottom: 0;
  }
  
  .card-container {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .upper-portion .text-title {
    transition: color 0.3s ease;
  }
  
  .upper-portion .text-title:hover {
    color: #1eca1e;
  }
  
  .lower-portion {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .map-container {
    max-width: 100%; /* Ensure the map container is responsive */
  }
  </style>
  
  <script setup lang="ts">
  import SimpleMap from '@/components/common/map/SimpleMap.vue';
  
  const mapHeight = 400; // Set your desired map height
  const mapWidth = 1000; // Set your desired map width
  
  // Replace the following line with your actual GeoJSON data
  const yourGeojsonData = {
    // Your GeoJSON data here
  };
  </script>
  