<script setup lang="ts">
import google_icon from '@/assets/images/google_logo.png';
import image from '@/assets/images/login_img.png';

const handleLogin = () => {
  console.log('login')
}

const handleGoogleLogin = () => {
  console.log('google login')
}
</script>

<template>
  <section class="login py-12 px-5 lg:px-20 md:px-16 sm:px-12 flex flex-wrap items-start justify-center gap-12">
    <div class="login_form w-full lg:w-[45%] md:w-[45%] sm:w-full order-2 lg:order-1 md:order-1 sm:order-2">
      <header class="">
        <h3 class="font-[500] text-[36px] capitalize">welcome back</h3>
        <p class="text-[20px] font-[500]">Continue your journey to accessible healthcare</p>
      </header>

      <form class="mt-8 mb-10 w-[100%] lg:w-[90%] md:w-[90%] sm:w-[100%]" @submit.prevent="handleLogin">
        <div class="email mb-4 flex gap-1 flex-col">
          <label for="email">Email</label>
          <input
            class="bg-[#F7FBFF] border border-slate-200 py-4 pl-4 rounded-[8px] placeholder:text-sm text-slate-800 outline-none"
            type="email" id="email" placeholder="example@gmail.com" required />
        </div>

        <div class="password flex gap-1 flex-col">
          <label for="password">Password</label>
          <input
            class="bg-[#F7FBFF] border border-slate-200 py-4 pl-4 rounded-[8px] placeholder:text-sm text-slate-800 outline-none"
            type="password" id="password" placeholder="At least 8 characters" required />
        </div>

        <p class="text-green_v_2 capitalize text-right my-4">forgot password?</p>

        <button
          class="border w-full py-3 text-slate-100 bg-green_v_1/90 rounded-[8px] hover:bg-green_v_1 transition-all duration-300"
          type="submit">Login</button>

        <div class="horizontal_line relative my-10 w-full border">
          <span class="absolute -top-[14px] bg-white px-4 capitalize left-[50%] -translate-x-[50%]">or</span>
        </div>

        <button class="google_login border border-slate-200 w-full flex items-center justify-center gap-4 bg-[#F7FBFF] py-3 rounded-[8px]" @click="handleGoogleLogin">
            <img :src="google_icon" alt="Google icon">
            <p>Login with Google</p>
        </button>
      </form>

      <p class="w-full text-center text-sm">Don't have an account? <RouterLink class="text-green_v_2" to="/signup">Sign up</RouterLink>
      </p>
    </div>

    <div class="login_imgae h-[200px] lg:h-fit md:h-fit sm:h-[200px] rounded-[8px] lg:rounded-[26px] md:rounded-[26px] sm:rounded-[8px] shadow-[0_0_3px_#a9a9a9] overflow-hidden w-full lg:w-[45%] md:w-[45%] sm:w-full order-1 lg:order-2 md:order-2 sm:order-1">
      <img class="w-full h-full object-cover" :src="image" alt="Login image">
    </div>
  </section>
</template>

<style>
</style>
