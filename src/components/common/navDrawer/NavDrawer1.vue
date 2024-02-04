<template>
    <v-card>
        <v-layout class="d-flex">
            <v-navigation-drawer expand-on-hover rail class="mr-4">
                <v-list>
                    <v-list-item prepend-avatar="images/goku.jpg" title="Nimit Trevadiya"
                        subtitle="link.nimit@gmailcom"></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-home" 
                                title="Home" 
                                value="home"
                                @click="openHome" >
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
                    <v-list-item prepend-icon="mdi-cog" 
                                title="Settings"
                                value="settings"
                                @click="openSettings">
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main class="overflow-y-auto vh-100 mar-l-15">
                <RouterView></RouterView>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const openSettings= ()=> {
    router.push('/settings')
}
const openHome = () => {
    router.push('/home')

}
</script>
