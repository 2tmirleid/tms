import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from "@/routers/router.js";
import {createPinia} from "pinia";
import {useAuthStore} from "@/stores/auth.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const auth = useAuthStore();
auth.loadUserFromToken();
app.mount("#app");
