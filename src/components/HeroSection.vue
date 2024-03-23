<script setup lang="ts">
import { ref, type Ref } from 'vue';
import airbnb from '@/assets/images/airbnb.png';
import google from '@/assets/images/google.png';
import microsoft from '@/assets/images/microsoft.png';
import hubspot from '@/assets/images/hubspot.png';
import altschool from '@/assets/images/altschool.webp';
import { useSearch } from '@/composables/search';
import { useRouter } from 'vue-router';

interface Sponsor {
  image: any,
  name: string
}


let search_keyword: Ref<string | null> = ref(null);
let loading: Ref<boolean> = ref(false);

const router = useRouter();

const sponsors: Sponsor[] = [
  // { image: airbnb, name: 'airbnb' },
  // { image: hubspot, name: 'hubspot' },
  // { image: google, name: 'google' },
  // { image: microsoft, name: 'microsoft' },
  { image: altschool, name: 'altschool' }
]

const handleSearch = async () => {
  loading.value = true;
  try {
    const result = await useSearch(search_keyword.value);
    result ? router.push('/hospitals') : new Error("Falied to search")
  } catch (error) {
    console.log(error)
    alert(`Oops, please try searching again`);
  }
  finally {
    loading.value = false;
  }
}

</script>

<template>
  <header class="hero px-5 lg:px-20 md:px-16 sm:px-12 min-h-[600px] flex flex-col items-center justify-evenly">
    <div class="header_text flex flex-col gap-2 items-center justify-center">
      <h1
        class="text-[40px] lg:text-[48px] md:text-[48px] text-slate-800 font-bold capitalize text-center leading-[56px]">
        Empower Your Health Journey with <br><span class="text-green_v_2">CareFinder</span></h1>
      <p class="text-slate-500 max-w-[450px] text-center">Discover, Export, and Share Hospitals in Your
        Region.
        Navigating Wellness Made Simple</p>
    </div>

    <div
      class="header_links flex flex-wrap gap-10 items-end lg:justify-between md:justify-center sm:justify-center justify-center w-full">

      <div class="header_sponsors">
        <h3 class="text-slate-500 mb-4 lg:text-left md:text-left sm:text-center text-center">Trusted by </h3>
        <div class="sponsors flex items-center flex-wrap justify-center gap-6">
          <img class="w-20 h-fit lg:w-24 md:w-24" v-for="sponsor in sponsors" :key="sponsor.name" :src="sponsor.image"
            :alt="sponsor.name">
        </div>
      </div>

      <div
        class="header_search border border-slate-400 bg-white flex items-center justify-between pr-2 h-[50px] gap-2 w-[400px] rounded-full">
        <input class="outline-none h-full text-slate-800 w-full rounded-full pl-4 placeholder:text-sm" type="text"
          v-model.lazy="search_keyword" name="search" id="search" placeholder="City, Country">
        <div class="search_img w-[80px] h-[35px] flex items-center justify-center rounded-full bg-green_v_1">
          <img v-if="loading" class="w-6 h-6 animate-spin"
            src="https://img.icons8.com/fluency-systems-filled/f7f7f7/48/spinner-frame-2.png" alt="spinner-frame-2" />
          <img v-else @click="handleSearch" class="w-6 h-6 cursor-pointer"
            src="https://img.icons8.com/ios/f7f7f7/50/search--v1.png" alt="search--v1" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
