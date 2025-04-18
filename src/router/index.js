import { createRouter, createWebHistory } from 'vue-router';
import Home from "../views/Home.vue";
import LoginView from '../views/LoginView.vue';
import { auth } from '../firebase';
import RegisterView from "../views/RegisterView.vue";

const routes = [
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView, meta: { requiresGuest: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Защита маршрутов
router.beforeEach((to, from, next) => {
    const user = auth.currentUser

    if (to.meta.requiresAuth && !user) {
        next('/login')
    } else if (to.meta.requiresGuest && user) {
        next('/')
    } else {
        next()
    }
});

export default router;
