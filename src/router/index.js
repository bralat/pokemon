import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Details from '../views/Details.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Details',
    path: '/details/:name',
    component: Details,
  },
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
