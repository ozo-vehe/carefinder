<script setup lang="ts">
import Papa from 'papaparse';
import { useHospitalsStore } from '@/stores/hospital';
import { storeToRefs } from 'pinia';

// Hospital details
interface Hospital {
  id: string
  name: string
  link: string
  location: string
  longitude: string | number,
  latitude: string | number
}

defineProps({
  hospitals: {
    type: Array as () => Array<Hospital>,
    default: () => []
  }
});

const hospitals_store = useHospitalsStore();
const { show_share } = storeToRefs(hospitals_store);

const shareHospital = (hospitals: Array<Hospital>) => {
  const csv = Papa.unparse(hospitals);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  if (!navigator.canShare) {
    alert(`Your browser doesn't support the Web Share API.`)
    return;
  } else {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        // Convert the Blob to a file
        const file = new File([blob], 'hospitals.csv', { type: 'text/csv' });
        // Access the converted file object
        try {
          navigator.share({ files: [file], title: "Files", text: "hospitals.csv shared successfully" });
          alert("successfully shared");
        } catch (err) {
          alert(`Error: ${err}`);
        }
      });
  }
}

const downloadHospitals = async (hospitals: Array<Hospital>) => {
  const csv = Papa.unparse(hospitals);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hospitals.csv';
  a.click();
}

</script>

<template>
  <section v-if="show_share" class="share_hospitals fixed flex flex-col justify-between top-10 left-[50%] max-w-[400px] -translate-x-[50%] bg-white min-h-[150px] gap-2 px-5 lg:px-16 md:px-12 sm:px-12 shadow-[0_0_5px_#d9d9d9] rounded-[8px] pt-4 pb-8">
    <img class="w-5 h-5 hover:scale-105 transition-all duration-300 absolute right-4 top-4 cursor-pointer" src="https://img.icons8.com/pastel-glyph/64/cancel--v1.png" alt="cancel--v1" @click="show_share = !show_share"/>

    <h3 class="font-[500] text-[20px] capitalize underline text-center flex items-center justify-center">
      Share file
    </h3>

    <div class="flex items-center justify-center gap-4">
      <button class="rounded-[3px] px-3 py-2 min-w-[100px] bg-green_v_1 text-slate-100" @click="shareHospital(hospitals || [])">Share</button>
    <button class="rounded-[3px] px-3 py-2 min-w-[100px] bg-green_v_1 text-slate-100" @click="downloadHospitals(hospitals || [])">Download</button>
    </div>
  </section>
</template>
