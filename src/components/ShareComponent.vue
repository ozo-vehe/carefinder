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
  <section v-if="show_share"
    class="share_hospitals fixed flex items-center justify-center top-0 left-0 w-screen h-screen bg-[#3f3f3f44] min-h-[150px]">
    <div class="share_content bg-white flex flex-col justify-between gap-2 p-5 shadow-[0_0_10px_#4a4a4a] rounded-[8px] relative max-w-[400px]">
      <img class="w-5 h-5 hover:scale-105 transition-all duration-300 absolute right-6 top-6 cursor-pointer"
        src="https://img.icons8.com/pastel-glyph/64/cancel--v1.png" alt="cancel--v1"
        @click="show_share = !show_share" />
      <div class="w-full mb-4">
        <h3 class="font-[500] text-[20px] capitalize underline">
          Share file
        </h3>
        <p class="text-sm text-slate-500 font-[400]">Empower others with the gift of information. Share this hospital
          file effortlessly using the options below</p>
      </div>

      <div class="flex items-center gap-4">
        <button
          class="rounded-[3px] flex items-center justify-center gap-2 px-3 py-2 min-w-[120px] bg-green_v_1 text-slate-100"
          @click="shareHospital(hospitals || [])">
          <img class="w-4 h-4" src="https://img.icons8.com/material-rounded/f9f9f9/96/share.png" alt="share" />
          Share
        </button>
        <button
          class="rounded-[3px] flex items-center justify-center gap-2 px-3 py-2 min-w-[120px] bg-green_v_1 text-slate-100"
          @click="downloadHospitals(hospitals || [])">
          <img class="w-4 h-4" src="https://img.icons8.com/material-rounded/f9f9f9/96/download--v1.png"
            alt="download--v1" />
          Download
        </button>
      </div>
    </div>
  </section>
</template>
