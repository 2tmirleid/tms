import MainPage from "@/pages/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ScenariosPage from "@/pages/ScenariosPage.vue";
import TestPlanPage from "@/pages/TestPlanPage.vue";

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
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;