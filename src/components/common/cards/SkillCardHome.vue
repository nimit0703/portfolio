<template>
    <div class="mycard d-flex flex-column align-items-center col-5 m-4">
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
        type: String, // Type of the prop (String in this case)
        default: 'bi bi-person-workspace' // Default value for the prop
    },
    title: {
        type: String,
        default: "Skill"
    },
    desc: {
        type: String,
        default: "this is my one of my skill"
    }
});
</script>