<script setup lang="ts">
import { ref } from 'vue';

const user_email = ref('');

const handleNewsLetter = () => {
  console.log('newsletter submitted');
}
</script>

<template>
  <section
    class="newsletter px-5 lg:px-20 md:px-16 sm:px-12 py-16 flex gap-8 flex-col items-center justify-center">
    <div class="text-center">
      <p class="text-md text-green_v_2">Stay up to date</p>
      <h2 class="text-[32px] font-bold capitalize text-green_v_1">join our newsletter</h2>
    </div>

    <form class="flex flex-wrap items-center justify-center gap-4" @submit.prevent="handleNewsLetter">
      <input class="w-[300px] border border-slate-300 placeholder:text-slate-400 placeholder:text-sm pl-3 py-3 rounded-[8px] outline-none" type="email" placeholder="Enter your email..." v-model="user_email" required>
      <button type="submit" class="bg-green_v_1/90 px-5 py-3 rounded-[8px] text-slate-100 w-[130px] hover:bg-green_v_1 transition-all duration-300">Submit</button>
    </form>

    <p class="text-sm text-slate-500">*You can unsubscribe anytime</p>
  </section>
</template>

<style scoped></style>
