import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';
import LoginView from '../views/LoginView.vue';
import CoursesView from '../views/CoursesView.vue';
import NotFound from '../views/NotFound.vue';
import UserListEvent from '../views/UserListEvent.vue';
import miFraseView from '../views/miFraseView.vue';



const routes = [
  {
    path: '/:archivoJson?',
    name: 'HomeView',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      const archivoJson = to.params.archivoJson || 'imagenes';
      to.params.archivoJson = archivoJson;
      next();
    }
  },
  { 
    path: "/LoginView",
    name: "LoginView",
    component: LoginView
  },
  {
    path: '/AdminView',
    name: 'AdminView',
    component: AdminView
  },
  {
    path: '/CoursesView',
    name: 'CoursesView',
    component: CoursesView
  },
  {
    path: '/UserListEvent',
    name: 'UserListEvent',
    component: UserListEvent
  },
  {
    path: '/miFraseView',
    name: 'miFraseView',
    component: miFraseView
  },
  { path: '/:catchAll(.*)', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
