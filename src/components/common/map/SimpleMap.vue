<!-- YourVueComponent.vue -->
<template>
    <div :style="{ height: `${height}px`, width: `${width}px` }">
      <l-map :use-global-leaflet="false" :options="mapOptions">
        <l-tile-layer :url="tileLayerUrl" :attribution="tileLayerAttribution" />
        <l-geo-json :geojson="geojson" :options="geojsonOptions" />
        
        <!-- Add LMarker for the marker -->
        <l-marker :lat-lng="[markerLat, markerLng]">
          <l-popup> <!-- Optionally, you can add a popup to the marker -->
            Marker Content
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </template>
  
  <style>
    @import 'leaflet/dist/leaflet.css';
    /* Other styles if needed */
  </style>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue';
  import { LMap, LTileLayer, LGeoJson, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
  import { mapConfig } from '@/module/config/mapConfig';
  import { circleMarker } from 'leaflet';
  
  const props = defineProps(['geojson', 'height', 'width']); // Specify the props your component expects
  
  const geojson = ref(props.geojson);
  const geojsonOptions = ref(mapConfig.geojsonOptions);
  const mapOptions = ref(mapConfig.mapOptions);
  const tileLayerUrl = mapConfig.tileLayerUrl;
  const tileLayerAttribution = mapConfig.tileLayerAttribution;
  
  geojsonOptions.value.pointToLayer = (feature: any, latLng: any) =>
    circleMarker(latLng, { radius: 8 });
  
  // Add coordinates for the marker
  const markerLat = 22.273440 ;
  const markerLng = 73.196980;
  </script>
  