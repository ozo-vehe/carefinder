<script setup lang="ts">
import logo from '@/assets/images/logo.png'
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useUsersStore } from '../stores/users';
import { storeToRefs } from 'pinia'

let show_menu = ref(false);

const userStore = useUsersStore()
const { loggedIn, loggedInUser } = storeToRefs(userStore);

</script>

<template>
  <!-- Mobile Navigation -->
  <div class="nav_mobile_menu bg-green_v_3 overflow-hidden flex items-center justify-center transition-all duration-400"
    :class="{ 'h-[200px] py-4': show_menu, 'h-[0px] py-0': !show_menu }">
    <div class="nav_links flex flex-col gap-5 items-center">
      <router-link to="/" class="nav_link"
        :class="{ 'text-[#000]': $route.path === '/', 'text-[#969696]': $route.path !== '/' }" @click="show_menu = !show_menu">Home</router-link>
      <router-link to="/hospitals" class="nav_link"
        :class="{ 'text-[#000]': $route.path === '/hospitals', 'text-[#969696]': $route.path !== '/hospitals' }" @click="show_menu = !show_menu">Hospitals</router-link>

      <RouterLink :to="{ name: 'profile', params: { user_id: loggedInUser.id } }" v-if="loggedIn"
        class="user_profile bg-green_v_1 min-w-[100px] text-[#fff] py-[10px] px-4 h-[50px] rounded-[8px] flex gap-4 items-center justify-center capitalize" @click="show_menu = !show_menu">
        <img class="w-10 h-10 p-[6px] object-cover border-2 border-green_v_2/70 rounded-full"
          src="https://img.icons8.com/ios-glyphs/ffffff/60/user--v1.png" alt="user--v1" />
        <div class="flex items-center justify-center gap-2">
          <p>{{ loggedInUser.fullname }}</p>
          <!-- <img class="cursor-pointer w-7 h-7 bg-green_v_2 p-[6px] rounded-[3px]"
            src="https://img.icons8.com/ios-glyphs/fafafa/60/chevron-down.png" alt="right--v2" /> -->
        </div>
      </RouterLink>

      <router-link to="/login" v-else
        class="nav_link bg-green_v_1 min-w-[100px] text-[#fff] py-[10px] px-4 rounded-[8px] flex gap-4 items-center justify-between capitalize" @click="show_menu = !show_menu">
        <span>get started</span>
        <!-- <img class="w-8 h-8 bg-green_v_2 p-[6px] rounded-[3px]"
          src="https://img.icons8.com/material-sharp/fafafa/right--v2.png" alt="right--v2" /> -->
      </router-link>
    </div>
  </div>


  <!-- Desktop Navigation -->
  <nav class="nav_bar px-5 lg:px-20 md:px-16 sm:px-12 pt-12 pb-2 flex items-end justify-between">
    <div class="nav_logo w-[160px] h-[35px]">
      <RouterLink to="/">
        <img class="w-full h-full object-contain" alt="CareFinder logo" :src="logo" />
      </RouterLink>
    </div>

    <div class="nav_links lg:flex md:flex sm:hidden hidden gap-10 items-center">
      <router-link to="/" class="nav_link"
        :class="{ 'text-[#000]': $route.path === '/', 'text-[#969696]': $route.path !== '/' }">Home</router-link>
      <router-link to="/hospitals" class="nav_link"
        :class="{ 'text-[#000]': $route.path === '/hospitals', 'text-[#969696]': $route.path !== '/hospitals' }">Hospitals</router-link>

      <RouterLink :to="{ name: 'profile', params: { user_id: loggedInUser.id } }" v-if="loggedIn"
        class="user_profile bg-green_v_1 min-w-[100px] text-[#fff] py-[10px] px-4 h-[50px] rounded-[8px] flex gap-4 items-center justify-center capitalize">
        <img class="w-10 h-10 p-[6px] object-cover border-2 border-green_v_2/70 rounded-full"
          src="https://img.icons8.com/ios-glyphs/ffffff/60/user--v1.png" alt="user--v1" />
        <div class="flex items-center justify-center gap-2">
          <p>{{ loggedInUser.fullname }}</p>
          <!-- <img class="cursor-pointer w-7 h-7 bg-green_v_2 p-[6px] rounded-[3px]"
            src="https://img.icons8.com/ios-glyphs/fafafa/60/chevron-down.png" alt="right--v2" /> -->
        </div>
      </RouterLink>

      <router-link to="/login" v-else
        class="nav_link bg-green_v_1 min-w-[100px] text-[#fff] py-[10px] px-4 rounded-[8px] flex gap-4 items-center justify-between capitalize">
        <span>get started</span>
        <!-- <img class="w-8 h-8 bg-green_v_2 p-[6px] rounded-[3px]"
          src="https://img.icons8.com/material-sharp/fafafa/right--v2.png" alt="right--v2" /> -->
      </router-link>
    </div>

    <div class="nav_hamburger visible lg:hidden md:hidden sm:visible">
      <img class="w-8 h-8 cursor" @click="show_menu = !show_menu"
        src="https://img.icons8.com/ios-filled/100/menu--v6.png" alt="menu--v6" />
    </div>

  </nav>
</template>

<style scoped></style>
