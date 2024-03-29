import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import HospitalsView from '@/views/HospitalsView.vue';
import HospitalView from '@/views/HospitalView.vue';
import UploadHospitalView from '@/views/UploadHospitalView.vue';
import ProfileView from '@/views/ProfileView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/hospitals',
      name: 'hospitals',
      component: HospitalsView
    },
    {
      path: '/hospital/:id',
      name: 'hospital',
      component: HospitalView
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadHospitalView
    },
    {
      path: '/profile/:user_id',
      name: 'profile',
      component: ProfileView
    }
  ]
})

export default router
