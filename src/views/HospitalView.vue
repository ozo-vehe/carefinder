<script setup lang="ts">
import { useHospitalsStore } from '@/stores/hospital';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import L from 'leaflet';

const drawMap = () => {
  console.log(hospital.value);
  let map = L.map("map_container").setView([hospital.value.latitude, hospital.value.longitude], 16);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 30,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  L.marker([hospital.value.latitude, hospital.value.longitude]).addTo(map);
}
// Hospital details
interface Hospital {
  id: string
  name: string
  link: string
  location: string
  longitude: number
  latitude: number
}

const route = useRoute();
const hospital_store = useHospitalsStore();

const { getHospital } = hospital_store;
const { params } = route;

const hospital: Ref<Hospital | any> = ref();
const loading: Ref<boolean> = ref(false);

onMounted(async () => {
  console.log(params)
  const id = params.id.toString();
  hospital.value = getHospital(id);
  drawMap();
});
</script>

<template>
  <section class="hospital bg-white/70 py-12 px-5 lg:px-20 md:px-16 sm:px-12">
    <div v-if="loading" class="loader">
    </div>
    <div v-else class="hospital_details_container flex flex-wrap items-start justify-center gap-12">
      <div class="w-full lg:w-[45%] md:w-[45%] sm:w-full order-2 lg:order-1 md:order-1 sm:order-2">
        <header class="">
          <h3 class="font-[500] text-[28px] lg:[text-34px] md:text-[30px] sm:text-[28px] capitalize">{{ hospital?.name }}</h3>
          <p class="text-[16px] lg:[text-18px] md:text-[18px] sm:text-[16px] text-slate-500 font-[400]">{{ hospital?.location }}</p>
        </header>
      </div>

      <div id="map_container"
        class="h-[250px] lg:h-[500px] md:h[350px] sm:h-[250px] rounded-[8px] lg:rounded-[3px] md:rounded-[26px] sm:rounded-[8px] shadow-[0_0_3px_#a9a9a9] overflow-hidden w-full lg:w-[45%] md:w-[45%] sm:w-full order-1 lg:order-2 md:order-2 sm:order-1">
        <p>Map</p>
      </div>
    </div>
  </section>
</template>
