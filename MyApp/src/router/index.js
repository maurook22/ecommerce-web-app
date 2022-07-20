import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import Shop from '../components/Shop.vue';
import Contact from '../components/Contact.vue';
import AboutUs from '../components/AboutUs.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/shop', name: 'Shop', component: Shop },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/aboutus', name: 'AboutUs', component: AboutUs }
  ]
})

export default router
