<template>
    <div class="mycard d-flex flex-column align-items-center col-lg-4 col-md-6 col-sm-12 m-4">
      <div class="icon-div border-success">
        <i :class="icon" class="fs-2"></i>
      </div>
      <div class="text-title mt-2">{{ title }}</div>
      <div class="text-gray mt-2 p-2 text-center">
        {{ desc }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    icon: {
      type: String,
      default: 'bi bi-person-workspace'
    },
    title: {
      type: String,
      default: 'Skill'
    },
    desc: {
      type: String,
      default: 'This is one of my skills.'
    }
  });
  </script>
  