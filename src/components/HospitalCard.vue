<script setup lang="ts">
import type { PropType } from 'vue';

interface Hospital {
  name: string;
  location: string;
  id: string;
  image: string;
  rating: number;
  phone: string;
  email: string;
  website: string;
}

defineProps({
  hospital: {
    type: Object as PropType<Hospital>,
    required: true
  }
})
</script>

<template>
  <RouterLink to="/hospitals" class="cursor-pointer bg-[#FAFAFA] hospital_card shadow-[0_0_2px_#e9e9e9] w-[350px] h-[300px] p-4 rounded-[8px]">
    <img class="w-[100%] h-[70%] object-cover m-auto rounded-[8px]" :src="hospital.image" :alt="hospital.name">
    <div class="hospital_deta mt-5">
      <h3 class="text-green_v_1 text-[20px] font-[600]">{{ hospital.name }}</h3>
      <p class="text-slate-400 text-sm">{{ hospital.location }}</p>
    </div>
  </RouterLink>
</template>

<style scoped></style>
