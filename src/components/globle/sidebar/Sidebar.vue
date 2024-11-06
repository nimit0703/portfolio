<!-- <template>
    <v-app>
        <div class="d-lg-none d-xl-flex">
            <v-app-bar title="">
                <v-app-bar-title>Mobile Navbar</v-app-bar-title>

                <template v-slot:append>
                    <v-btn @click="toggleTheme"
                        :icon="isDarkTheme ? 'mdi-lightbulb-night-outline' : 'mdi-lightbulb-night'"></v-btn>
                    <v-btn icon="mdi-account-multiple"></v-btn>

                    <v-btn icon="mdi-star"></v-btn>
                    <v-avatar image="https://randomuser.me/api/portraits/women/85.jpg" size="small" class="me-2">
                        
                    </v-avatar>

                </template>
            </v-app-bar>
        </div>
        <v-card>
            <v-layout>
                <v-navigation-drawer expand-on-hover @update:rail="toggle" rail>
                    <v-list>
                        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                            subtitle="sandra_a88@gmailcom" title="Sandra Adams"></v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list density="compact" nav>
                        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me"
                            value="shared"></v-list-item>
                        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
                        <v-list-item :prepend-icon="isDarkTheme ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off-outline'"
                            title="Toggle" value="toggle" @click="toggleTheme"></v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main :style="drawer ? 'margin-left:216px' : ''" style="height: 100vh;">
                    <v-alert v-if="alertDetails.showAlert" :closable="alertDetails.closable" :icon="alertDetails.icon"
                        :title="alertDetails.title" :text="alertDetails.text" :variant="alertDetails.variant"
                        :type="alertDetails.type" :color="alertDetails.type" @click:close="closeAlert">
                    </v-alert>
                    <div class="px-5 border overflow-y-scroll no-scrollbar" style="height: inherit;">
                        <router-view class="px-5" />
                    </div>
                </v-main>
            </v-layout>
        </v-card>
    </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify'
import { useStore } from 'vuex';

const store = useStore();
const theme = useTheme()

const drawer = ref(false);
const isDarkTheme = ref('false')

const toggle = () => {
    drawer.value = !drawer.value;
}

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    isDarkTheme.value = theme.global.name.value == 'dark'
}
const alertDetails = computed(() => store.getters.getAlertDetails);

const closeAlert = () => {
    store.dispatch('updateAlertDetails', { showAlert: false });
};
</script>

<style>
.no-scrollbar {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, and Opera */
}
</style> -->
