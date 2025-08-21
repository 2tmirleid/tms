import MainPage from "@/pages/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ScenariosPage from "@/pages/ScenariosPage.vue";
import TestPlanPage from "@/pages/TestPlanPage.vue";
import LaunchPage from "@/pages/LaunchPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/scenarios',
        component: ScenariosPage
    },
    {
        path: '/test-plans',
        component: TestPlanPage
    },
    {
        path: '/launches',
        component: LaunchPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;