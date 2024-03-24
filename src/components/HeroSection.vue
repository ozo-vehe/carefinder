<script setup lang="ts">
import { ref, type Ref } from 'vue';
import altschool from '@/assets/images/altschool.webp';
import { useSearch } from '@/composables/search';
import { useRouter } from 'vue-router';

interface Sponsor {
  image: any,
  name: string
}


let search_keyword: Ref<string | null> = ref(null);
let loading: Ref<boolean> = ref(false);
let show_search_list: Ref<boolean> = ref(false);
let search_list: Ref<string[]> = ref([]);

const router = useRouter();

const sponsors: Sponsor[] = [
  { image: altschool, name: 'altschool' }
]

const autocomplete = async () => {
  try {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_FOURSQUARE_API_KEY as string,
      }
    };
    const searchParams = new URLSearchParams({
      query: search_keyword.value as string,
      types: 'geo'
    });


    const req = fetch(`https://api.foursquare.com/v3/autocomplete?${searchParams}`, options)
    const res = await req;
    const data = await res.json();
    console.log(data);

    const search_arr = data.results.map((item: any) => item.text.primary);
    search_list.value = search_arr;
    console.log(search_list.value);
    show_search_list.value = true;

  } catch (err) {
    console.error(err);
  }
}

// async function getAddressDetails() {
//   try {
//     const searchParams = new URLSearchParams({
//       session_token: '92080MAVXRGADMTMKJSADCDQGMT3NDKL',
//     });
//     const results = await fetch(
//       `https://api.foursquare.com/v3/address/555341570000072f2955-5220?${searchParams}`,
//       {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           Authorization: import.meta.env.VITE_FOURSQUARE_ACCESS_TOKEN as string,
//         }
//       }
//     );
//     const data = await results.json();
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// }



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

// A function to change the search keyword from list fo suggested autocomplete options
const changeSearchKeyword = (list: string) => {
  search_keyword.value = list;
  show_search_list.value = false;
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

      <div class="search_bar relative">
        <div
          class="border border-slate-400 bg-white flex items-center justify-between pr-2 h-[50px] gap-2 w-[400px] rounded-full">
          <input class="outline-none h-full text-slate-800 w-full rounded-full pl-4 placeholder:text-sm" type="text"
            v-model.lazy="search_keyword" @change="autocomplete" name="search" id="search" placeholder="City, Country">
          <div class="search_img w-[80px] h-[35px] flex items-center justify-center rounded-full bg-green_v_1">
            <img v-if="loading" class="w-6 h-6 animate-spin"
              src="https://img.icons8.com/fluency-systems-filled/f7f7f7/48/spinner-frame-2.png" alt="spinner-frame-2" />
            <img v-else @click="handleSearch" class="w-6 h-6 cursor-pointer"
              src="https://img.icons8.com/ios/f7f7f7/50/search--v1.png" alt="search--v1" />
          </div>
        </div>

        <div v-if="show_search_list"
          class="autocomplete_section bg-white border border-slate-300 rounded-[8px] top-[52px] absolute w-full z-20">
          <ul class="autocomplete_list text-slate-600">
            <li @click="changeSearchKeyword(list)" v-for="(list, index) in search_list" :key="index"
              class="autocomplete_item p-2 cursor-pointer border-b border-slate-300 hover:bg-slate-100/50 transition-all duration-300 rounded-[8px]">
              {{
            list }}</li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
