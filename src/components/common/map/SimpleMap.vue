// YourVueComponent.vue
<template>
    <div style="height:600px; width:800px">
        <p>vue-leaflet SSR Demo</p>
        <l-map :use-global-leaflet="false" :options="mapOptions">
            <l-tile-layer :url="tileLayerUrl" :attribution="tileLayerAttribution" />
            <l-geo-json :geojson="geojson" :options="geojsonOptions" />
        </l-map>
    </div>
</template>
<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { ref, onBeforeMount, onMounted } from 'vue';
import { LMap, LTileLayer, LGeoJson } from '@vue-leaflet/vue-leaflet';
import apiService from '@/module/api/apiService';
import { mapConfig } from '@/module/config/mapConfig';
import { circleMarker } from 'leaflet/dist/leaflet-src.esm';
const geojson = ref(mapConfig.geojson);
const geojsonOptions = ref(mapConfig.geojsonOptions);
const mapOptions = ref(mapConfig.mapOptions);
const tileLayerUrl = mapConfig.tileLayerUrl;
const tileLayerAttribution = mapConfig.tileLayerAttribution;

onBeforeMount(async () => {
    geojsonOptions.value.pointToLayer = (feature: any, latLng: any) =>
        circleMarker(latLng, { radius: 8 });
});

onMounted(() => {
});
</script>

