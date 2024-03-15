<script setup lang="ts">
import type { PropType } from 'vue';
import image from '@/assets/images/hospital_01.png';
import type { Hospital, MHospital } from '@/utils/interface';
import { MdPreview } from 'md-editor-v3';
import MarkdownRenderer from './MarkdownRenderer.vue';
import 'md-editor-v3/lib/style.css';

// Hospital details
// interface Hospital {
//   id: string;
//   name: string;
//   link: string;
//   email: string;
//   address: string;
//   longitude: string | number;
//   latitude: string | number;
// }

defineProps({
  hospital: {
    type: Object as PropType<Hospital | undefined>,
    required: true
  },
  markdown: {
    type: Boolean as PropType<boolean>,
    required: true
  },
  m_hospital: {
    type: Object as PropType<MHospital | undefined>,
    required: true
  },
})
</script>

<template>
  <RouterLink v-if="markdown" :to="{name: 'hospital', params: {id: m_hospital?.id}}"
    class="cursor-pointer bg-[#FAFAFA] hospital_card shadow-[0_0_2px_#e9e9e9] w-[370px] h-[330px] p-4 rounded-[8px] group">
    <div class="hospital_image w-[100%] h-[65%] overflow-hidden rounded-[8px]">
      <img class="w-[100%] h-[100%] object-cover m-auto group-hover:scale-105 transition-all duration-300"
        :src="image" :alt="hospital?.name">
    </div>

    <div class="hospital_data mt-5">
      <!-- <MdPreview :modelValue="m_hospital?.content" /> -->
      <MarkdownRenderer :source="m_hospital?.content" />
    </div>
  </RouterLink>

  <RouterLink v-else :to="{name: 'hospital', params: {id: hospital?.id}}"
    class="cursor-pointer bg-[#FAFAFA] hospital_card shadow-[0_0_2px_#e9e9e9] w-[370px] h-[330px] p-4 rounded-[8px] group">
    <div class="hospital_image w-[100%] h-[65%] overflow-hidden rounded-[8px]">
      <img class="w-[100%] h-[100%] object-cover m-auto group-hover:scale-105 transition-all duration-300"
        :src="image" :alt="hospital?.name">
    </div>
    <div class="hospital_data mt-5">
      <h3 class="text-green_v_1 text-[20px] font-[600] capitalize">{{ hospital?.name }}</h3>
      <p class="text-slate-400 text-sm">{{ hospital?.address }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
</style>
