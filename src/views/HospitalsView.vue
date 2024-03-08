<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue';
import HospitalCard from '@/components/HospitalCard.vue';
import { useUsersStore } from '@/stores/users';
import { useHospitalsStore } from '@/stores/hospital';
import { storeToRefs } from 'pinia';
import { onBeforeMount, watch } from 'vue';

const user_store = useUsersStore();
const hospital_store = useHospitalsStore();

const { loggedIn } = storeToRefs(user_store);
const { fetchHospitals } = hospital_store
const { hospitals, longitude, latitude } = storeToRefs(hospital_store);

watch([longitude, latitude], async ([newLon, newLat]) => await fetchHospitals())

onBeforeMount(async () => await fetchHospitals())
</script>

<template>
  <HeroSection />

  <section class="hospitals bg-white/70 pb-12 px-5 lg:px-20 md:px-16 sm:px-12 gap-12">
    <header
      class="flex gap-x-10 gap-y-4 mb-10 flex-wrap justify-center lg:justify-between md:justify-between sm:justify-center items-center">
      <div>
        <h2 class="font-[500] text-[24px]">List of hospitals close to you</h2>
        <p class="text-slate-500">Find the best hospitals in your region</p>
      </div>

      <div v-if="loggedIn">
        <button
          class="bg-green_v_1 h-[50px] flex items-center justify-center gap-2 text-slate-100 text-sm px-4 rounded-[8px]">
          <div>
            <img class="w-5 h-5" src="https://img.icons8.com/material-rounded/f9f9f9/96/hospital-3.png"
              alt="hospital-3" />
          </div>
          Add new hospital
        </button>
      </div>
    </header>

    <section class="hospital_container flex flex-wrap items-center justify-center gap-8">
      <template v-if="hospitals.length > 0">
        <HospitalCard :hospital="hospital" v-for="hospital in hospitals" :key="hospital.id" />
      </template>
      <img v-else class="w-6 h-6 animate-spin"
        src="https://img.icons8.com/fluency-systems-filled/48/spinner-frame-2.png" alt="spinner-frame-2" />
    </section>
  </section>
</template>
