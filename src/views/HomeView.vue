<template>
  <div>
    <v-expansion-panels class="no-active">
      <v-expansion-panel title="Title"
        text="This is map component">
      </v-expansion-panel>
    </v-expansion-panels>
    <simple-map></simple-map>
  </div>
</template>
  
<script setup lang="ts">
import SimpleMap from '@/components/common/map/SimpleMap.vue';

</script>
  