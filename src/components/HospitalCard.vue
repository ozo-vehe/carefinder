<script setup lang="ts">
import type { PropType } from 'vue';
import image from '@/assets/images/hospital_01.png';

// Hospital details
interface Hospital {
  id: string;
  name: string;
  link: string;
  location: string;
  longitude: string | number;
  latitude: string | number;
}

defineProps({
  hospital: {
    type: Object as PropType<Hospital>,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="{name: 'hospital', params: {id: hospital.id}}"
    class="cursor-pointer bg-[#FAFAFA] hospital_card shadow-[0_0_2px_#e9e9e9] w-[370px] h-[330px] p-4 rounded-[8px] group">
    <div class="hospital_image w-[100%] h-[65%] overflow-hidden rounded-[8px]">
      <img class="w-[100%] h-[100%] object-cover m-auto group-hover:scale-105 transition-all duration-300"
        :src="image" :alt="hospital.name">
    </div>
    <div class="hospital_deta mt-5">
      <h3 class="text-green_v_1 text-[20px] font-[600] capitalize">{{ hospital.name }}</h3>
      <p class="text-slate-400 text-sm">{{ hospital.location }}</p>
    </div>
  </RouterLink>
</template>

<style scoped></style>
