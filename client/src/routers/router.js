import MainPage from "@/pages/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ScenariosPage from "@/pages/ScenariosPage.vue";
import TestPlanPage from "@/pages/TestPlanPage.vue";
import LaunchPage from "@/pages/LaunchPage.vue";
import ProjectPage from "@/pages/ProjectPage.vue";
import LaunchScenarioList from "@/components/Launch/Viewer/LaunchScenarioList.vue";

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

export default router;