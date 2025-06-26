import MainPage from "@/pages/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ScenariosPage from "@/pages/ScenariosPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/scenarios',
        component: ScenariosPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;