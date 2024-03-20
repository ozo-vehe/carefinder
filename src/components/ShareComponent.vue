<script setup lang="ts">
import Papa from 'papaparse';
import { useHospitalsStore } from '@/stores/hospital';
import { ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { Hospital } from '@/utils/interface';
import { SFacebook, STwitter, SWhatsApp } from 'vue-socials'

const windowFeatures = {}
const useNativeBehavior = false;
const onClose = () => { }
const onOpen = () => { }
const onBlock = () => { }
const onFocus = () => { }
let facebookShareOptions: any, twitterShareOptions: any, whatsappShareOptions: any;

// const url = window.location.href;
// const title = "hospitals";
const alt_url: Ref<string> = ref("");
const show_alt_share: Ref<boolean | null> = ref(false);

// const onError = (err: any) => {
//   console.log(err);
// }
// const onSuccess = (succ: any) => {
//   console.log(succ);
// }

defineProps({
  hospitals: {
    type: Array as () => Array<Hospital>,
    default: () => []
  }
});

const hospitals_store = useHospitalsStore();
const { show_share } = storeToRefs(hospitals_store);

const shareHospital = (hospitals: Array<Hospital>) => {
  if (hospitals.length < 1) {
    alert("No hospital list to share");
    return;
  } else {
    const csv = Papa.unparse(hospitals);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    // const file = new File([blob], 'hospitals.csv', { type: 'text/csv' });

    if (!navigator.canShare) {
      alt_url.value = url;
      show_alt_share.value = true;

      facebookShareOptions = {
        url: alt_url.value,
      }
      twitterShareOptions = {
        url: alt_url.value,
        text: 'Download hospitals',
      }
      whatsappShareOptions = {
        text: `click on this link to download the file${alt_url.value}`,
        number: '+2349035842321',
      }
    } else {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          // Convert the Blob to a file
          const file = new File([blob], 'hospitals.csv', { type: 'text/csv' });
          // Access the converted file object
          try {
            navigator.share({ files: [file], title: "Files", text: "hospitals.csv shared successfully" });
          } catch (err) {
            alert(`Error: ${err}`);
          }
        });
    }
  }
}

const downloadHospitals = async (hospitals: Array<Hospital>) => {
  if (hospitals.length < 1) {
    alert("No hospital list to download");
    return;
  }
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
    class="share_hospitals fixed flex items-center justify-center top-0 left-0 w-screen h-screen bg-[#3f3f3f44] min-h-[150px] px-5 lg:px-20 md:px-16 sm:px-12">
    <!-- Normal Sharing Method -->
    <div
      class="share_content bg-white flex flex-col justify-between gap-2 p-5 shadow-[0_0_10px_#4a4a4a] rounded-[8px] relative max-w-[400px]">
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

    <!-- Alternative Sharing Method -->
    <div v-if="show_alt_share"
      class="navigation_share_alt absolute z-10 top-[50%] -translate-y-[50%] bg-white flex flex-col justify-center gap-2 p-5 shadow-[0_0_10px_#4a4a4a] rounded-[8px] max-w-[400px] min-h-[200px]">
      <div class="w-full mb-4 flex items-start justify-between gap-4">
        <h3 class="w-full text-left">Share API not enabled or unsupported by your browser. Use the alternative below
        </h3>
        <img class="w-5 h-5 hover:scale-105 transition-all duration-300 cursor-pointer"
          src="https://img.icons8.com/pastel-glyph/64/cancel--v1.png" alt="cancel--v1"
          @click="show_alt_share = !show_alt_share" />
      </div>
      <div id="share" class="flex items-center gap-4">
        <s-facebook :window-features="windowFeatures" :share-options="facebookShareOptions"
          :use-native-behavior="useNativeBehavior" @popup-close="onClose" @popup-open="onOpen" @popup-block="onBlock"
          @popup-focus="onFocus" style="text-decoration:none"
          class="border w-fit text-white block rounded-full p-2 bg-green_v_1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"
            focusable="false">
            <path
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
              fill="rgb(241 245 249)" />
          </svg>
        </s-facebook>
        <s-twitter class="border w-fit text-white block rounded-full p-2 bg-green_v_1" :window-features="windowFeatures"
          :share-options="twitterShareOptions" :use-native-behavior="useNativeBehavior" @popup-close="onClose"
          @popup-open="onOpen" @popup-block="onBlock" @popup-focus="onFocus" style="text-decoration:none">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"
            focusable="false">
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              fill="rgb(241 245 249)" />
          </svg>
        </s-twitter>

        <s-whats-app class="border w-fit text-white block rounded-full p-2 bg-green_v_1"
          :window-features="windowFeatures" :share-options="whatsappShareOptions"
          :use-native-behavior="useNativeBehavior" @popup-close="onClose" @popup-open="onOpen" @popup-block="onBlock"
          @popup-focus="onFocus" style="text-decoration:none">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"
            focusable="false">
            <path
              d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
              fill="rgb(241 245 249)" />
          </svg>
        </s-whats-app>

      </div>
    </div>
  </section>
</template>
