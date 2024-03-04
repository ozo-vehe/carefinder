<script setup lang="ts">
import logo from '@/assets/images/logo.png';
import instagram from '@/assets/images/instagram.png';
import dribble from '@/assets/images/dribble.png';
import x from '@/assets/images/x.png';
import youtube from '@/assets/images/youtube.png';

const socials = [instagram, dribble, x, youtube];
</script>

<template>
  <footer class="footer px-5 lg:px-20 md:px-16 sm:px-12 pt-16 pb-10 bg-green_v_3/70">
    <div class="flex gap-12 flex-wrap items-start justify-between w-full mb-20">
      <div class="footer_logo w-[170px]">
        <img class="w-full" :src="logo" alt="Logo">
      </div>

      <div class="footer_links flex justify-center gap-x-12 gap-y-10">
        <div class="links">
          <h3 class="font-[500] text-[18px] lg:text-[20px] md:text-[20px] mb-4">Product</h3>
          <ul class="text-md capitalize text-slate-500 flex flex-col gap-2">
            <li>overview</li>
            <li>features</li>
            <li>tutorials</li>
            <li>pricing</li>
            <li>releases</li>
          </ul>
        </div>

        <div class="links">
          <h3 class="font-[500] text-[18px] lg:text-[20px] md:text-[20px] mb-4">Company</h3>
          <ul class="text-md capitalize text-slate-500 flex flex-col gap-2">
            <li>about</li>
            <li>press</li>
            <li>careers</li>
            <li>contact</li>
            <li>partners</li>
          </ul>
        </div>

        <div class="links">
          <h3 class="font-[500] text-[18px] lg:text-[20px] md:text-[20px] mb-4">Support</h3>
          <ul class="text-md capitalize text-slate-500 flex flex-col gap-2">
            <li>help center</li>
            <li>terms of service</li>
            <li>legal</li>
            <li>privacy policy</li>
            <li>status</li>
          </ul>
        </div>
      </div>
    </div>


    <div
      class="copywrite flex gap-5 flex-wrap items-center justify-center lg:justify-between md:justify-between w-full">
      <p class="text-sm text-slate-500">© 2024 CareFinder. All rights reserved</p>
      <div class="footer_socials flex flex-wrap justify-center gap-6">
        <img class="cursor-pointer w-6" v-for="(social, index) in socials" :key="index" :src="social" :alt="social">
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
