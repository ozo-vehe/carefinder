<script setup lang="ts">
import HospitalCard from '@/components/HospitalCard.vue';
import { useUsersStore } from '@/stores/users';
import { useHospitalsStore } from '@/stores/hospital';
import { storeToRefs } from 'pinia';
import { onBeforeMount, watch, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSearch } from '@/composables/search';
import ShareComponent from '@/components/ShareComponent.vue';
import {getSavedHospitalsFromFirestore} from '@/utils/firestore_db';

const user_store = useUsersStore();
const hospital_store = useHospitalsStore();
const router = useRouter();

let search_keyword: Ref<string | null> = ref(null);
let loading: Ref<boolean> = ref(false);
let is_error: Ref<boolean> = ref(false);
let error_message: Ref<string> = ref("");

const { loggedIn } = storeToRefs(user_store);
const { fetchHospitals } = hospital_store
const { hospitals, longitude, latitude, show_share } = storeToRefs(hospital_store);

watch([longitude, latitude], async ([newLon, newLat]) => await fetchHospitals());

const m_hospitals = ref();

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

onBeforeMount(async () => {
  const status = await fetchHospitals();
  if(status?.stats === "error") {
    is_error.value = true;
    error_message.value = status.error;
    // alert(status.error);
  } else {
    const res = await getSavedHospitalsFromFirestore()
    console.log(res);
    m_hospitals.value = res;
  }
})



</script>

<template>
  <ShareComponent v-if="show_share" :hospitals="hospitals" />
  <header class="hero px-5 lg:px-20 md:px-16 sm:px-12 min-h-[600px] flex flex-col items-center justify-evenly">
    <div class="header_text flex flex-col gap-2 items-center justify-center">
        <h1
          class="text-[40px] lg:text-[48px] md:text-[48px] text-slate-800 font-bold capitalize text-center leading-[56px]">Unlocking Health at Your Fingertips With<br><span class="text-green_v_2">CareFinder</span></h1>
        <p class="text-slate-500 max-w-[450px] text-center">Discover hospitals in your region with a simple click. Carefinder empowers you to find the healthcare you need, right where you are.</p>
      </div>

    <div class="header_links flex flex-wrap gap-10 items-end justify-center w-full">
      <div
        class="header_search border border-slate-400 bg-white flex items-center justify-between pr-7 h-[50px] gap-2 w-[400px] rounded-full">
        <input class="outline-none h-full text-slate-800 w-full rounded-full pl-4 placeholder:text-sm" type="text"
          v-model.lazy="search_keyword" name="search" id="search" placeholder="Enter a location...">
        <div class="search_imga">
          <img v-if="loading" class="w-6 h-6 animate-spin"
            src="https://img.icons8.com/fluency-systems-filled/48/spinner-frame-2.png" alt="spinner-frame-2" />
          <img v-else @click="handleSearch" class="w-6 h-6 cursor-pointer"
            src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1" />
        </div>
      </div>
    </div>
  </header>

  <section class="hospitals bg-white/70 pb-12 px-5 lg:px-20 md:px-16 sm:px-12 gap-12">
    <header
      class="flex gap-x-10 gap-y-4 mb-10 flex-wrap justify-center lg:justify-between md:justify-between sm:justify-center items-center">
      <div>
        <h2 class="font-[500] text-[24px]">List of hospitals close to you</h2>
        <p class="text-slate-500">Find the best hospitals in your region</p>
      </div>

      <div class="flex gap-2 items-center">
        <RouterLink to="/upload" v-if="loggedIn"
          class="bg-green_v_1 h-[50px] flex items-center justify-center gap-2 text-slate-100 text-sm px-4 rounded-[8px]">
          <div>
            <img class="w-5 h-5" src="https://img.icons8.com/material-rounded/f9f9f9/96/hospital-3.png"
              alt="hospital-3" />
          </div>
          Add new hospital
        </RouterLink>
        <button
          class="bg-green_v_1 h-[50px] flex items-center justify-center gap-2 text-slate-100 text-sm px-4 rounded-[8px]"
          @click="show_share = !show_share">
          Share or Download
        </button>
      </div>
    </header>

    <section class="hospital_container flex flex-wrap items-center justify-center gap-8">
      <template v-if="hospitals.length > 0 && !is_error">
        <HospitalCard :markdown="false" :m_hospital="undefined" :hospital="hospital" v-for="hospital in hospitals" :key="hospital.id" />
      </template>
      <img v-else-if="hospitals.length < 1 && !is_error" class="w-6 h-6 animate-spin"
        src="https://img.icons8.com/fluency-systems-filled/48/spinner-frame-2.png" alt="spinner-frame-2" />
      <p v-else class="text-red-600 bg-red-200 px-4 py-2 rounded-[8px] min-w-[300px] text-center">{{ error_message }}, please try again another time...</p>
    </section>
  </section>
</template>
