<template>
    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
        <v-tab :value="1">Landscape</v-tab>
        <v-tab :value="2">City</v-tab>
        <v-tab :value="3">Abstract</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
        <v-tabs-window-item v-for="n in 3" :key="n" :value="n">
            <v-container fluid>
                <v-row>
                    <v-col v-for="i in 9" :key="i" cols="12" md="4">
                        <v-img :lazy-src="`https://picsum.photos/10/6?random=${i * n * 5 + 10}&grayscale`"
                            :src="`https://picsum.photos/500/300?random=${i * n * 5 + 10}&grayscale`" height="205"
                            cover></v-img>

                    </v-col>
                </v-row>
            </v-container>
        </v-tabs-window-item>
    </v-tabs-window>
</template>
<script setup>
import { ref } from 'vue';
const tab = ref(null)

</script>