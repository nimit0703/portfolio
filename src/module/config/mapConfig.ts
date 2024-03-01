// mapConfig.ts
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export const mapConfig = {
  vadodaraLatitude: 22.3072,
  vadodaraLongitude: 73.1812,
  geojson: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [22.3072, 73.1812],
        },
      },
    ],
  },
  geojsonOptions: {
    pointToLayer: (feature: any, latLng: any) => L.circleMarker(latLng, { radius: 8 }),
  },
  mapOptions: {
    center: [22.3072, 73.1812], // Center on Vadodara
    zoom: 10, // Adjust the zoom level as needed
    zoomControl: false
  },
  tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileLayerAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
