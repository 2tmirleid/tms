import MainPage from "@/pages/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ScenariosPage from "@/pages/ScenariosPage.vue";
import TestPlanPage from "@/pages/TestPlanPage.vue";
import LaunchPage from "@/pages/LaunchPage.vue";
import ProjectPage from "@/pages/ProjectPage.vue";
import LaunchScenarioList from "@/components/Launch/Viewer/LaunchScenarioList.vue";
import {useAuthStore} from "@/stores/auth.js";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/project/:id/test-plans',
        component: TestPlanPage
    },
    {
        path: '/project/:id/launches',
        component: LaunchPage,
        props: true,
        children: [
            {
                path: ':launchID',
                component: LaunchScenarioList,
                props: true
            }
        ]
    },
    {
        path: '/project/:id',
        component: ProjectPage
    },
    {
        path: '/project/:id/scenarios',
        component: ProjectPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

// --- Глобальный guard ---
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !auth.isAuth) {
        return next('/');
    }

    next();
});

export default router;