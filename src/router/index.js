import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
const routes = [
    {
        path: '/',
        component: Home,
    },
    { path: '/parent', name: "parent", component: () => import('@/views/ByValue/Parent.vue') },
    { path: '/borther', name: "brother", component: () => import('@/views/ByValue/Brother.vue') },
    { path: '/son', name: "son", component: () => import('@/views/ByValue/Son.vue') },
    { path: '/hose', name: "hose", component: () => import('@/views/template/Hose.vue') },
    { path: '/person', name: "person", component: () => import('@/views/person/Home.vue') },
    { path: '/screen', name: "screen", component: () => import('@/views/screen_recording/page/ScreenHome.vue') },

];

const router = createRouter({
    history: createWebHistory(),
    history: createWebHashHistory( ),
    routes,
});

export default router;