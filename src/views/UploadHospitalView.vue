<script setup lang="ts">
import image from '@/assets/images/upload.png';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { MdEditor, config, type StaticTextDefaultValue } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useHospitalsStore } from '@/stores/hospital';

config({
  editorConfig: {
    languageUserDefined: { lang: ['en-US'] as StaticTextDefaultValue }
  }
});

// Hospital details
interface Hospital {
  id: string
  name: string
  address: string
  email: string
  image: string
}

interface MHospital {
  id: string,
  content: string,
  markdown: boolean
}

// Initialize router instance
const router = useRouter();

const hospital_store = useHospitalsStore();
const {uploadHospital} =  hospital_store;

const hospital: Ref<Hospital> = ref({
  id: '',
  name: '',
  address: '',
  email: '',
  image: '',
})

const m_hospital: Ref<MHospital> = ref({
  id: '',
  content: '',
  markdown: true
})
const is_checked: Ref<boolean | undefined> = ref(true);

// Loader instance
const loading: Ref<boolean> = ref(false);
// const content: Ref<string> = ref("Hello, start typing here...");

const handleUpload = async () => {
  loading.value = true;
  console.log(hospital.value);
  if(!hospital.value.name || !hospital.value.address || !hospital.value.email || !hospital.value.image) {
    alert("All fields are required")
    return;
  }
  try {
    const upload = await uploadHospital(hospital.value);
    if(upload) alert("Successfull")
    else alert("Error")
  } catch (error) {
    console.log(error)
  }
  loading.value = false;
}

const handleUploadMarkdown = async() => {
  loading.value = true;
  if(!m_hospital.value.content) {
    alert("Fill the markdown editor to upload a hospital")
    loading.value = false;
    return;
  }
  try {
    const upload = await uploadHospital(m_hospital.value);
    if(upload) alert("Successfull")
    else {
    alert("Error")
    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false;
}

const checked = (e: Event) => {
  is_checked.value = (e.target as HTMLInputElement)?.checked;
  console.log(is_checked.value)
}

const createImage = () => {
  console.log("Image")
}

</script>

<template>
  <section class="py-12 px-5 lg:px-20 md:px-16 sm:px-12 flex flex-wrap items-start justify-center gap-12">
    <div
      class="login_imgae h-[300px] lg:h-[600px] md:h-[400px] sm:h-[300px] rounded-[3px] lg:rounded-[8px] md:rounded-[8px] sm:rounded-[3px] overflow-hidden w-full lg:w-[45%] md:w-[45%] sm:w-full">
      <img class="w-full h-full object-cover" :src="image" alt="Login image">
    </div>
    <div class="upload_form w-full lg:w-[45%] md:w-[45%] sm:w-full">
      <header class="">
        <h3 class="font-[500] text-[36px] capitalize">upload a hospital</h3>
        <p class="text-[18px] font-[400]">Continue your journey to accessible healthcare</p>
      </header>

      <div class="min-h-[500px]">
        <div class="flex justify-end gap-2 mt-4">
          Enable markdown
          <input @click="checked" :checked="is_checked" ref="checkbox" type="checkbox" id="music" name="interest"
            value="music" />
        </div>
        <div v-if="is_checked">
          <div class="h-[450px]">
            <MdEditor v-model="m_hospital.content" :onSave="handleUploadMarkdown" class="" />
          </div>
          <button
            @click="handleUploadMarkdown"
            class="border mt-4 flex items-center justify-center w-full h-[55px] text-slate-100 bg-green_v_1/90 rounded-[8px] hover:bg-green_v_1 transition-all duration-300"
            type="submit">
            <img v-if="loading" class="w-8 h-8 animate-spin"
              src="https://img.icons8.com/fluency-systems-filled/f1f5f9/48/spinner-frame-2.png" alt="spinner-frame-2" />
            <span v-else class="capitalize">Upload</span>
          </button>
        </div>

        <form v-else class="mt-8 mb-10 w-[100%] lg:w-[90%] md:w-[90%] sm:w-[100%]" @submit.prevent="handleUpload">
          <div class="hospital_name flex gap-1 flex-col">
            <label for="hospital_name">Name</label>
            <input
              class="bg-[#F7FBFF] border border-slate-200 py-4 pl-4 rounded-[8px] placeholder:text-sm text-slate-800 outline-none"
              type="text" id="hospital_name" required v-model.lazy="hospital.name" />
          </div>

          <div class="hospital_address my-4 flex gap-1 flex-col">
            <label for="hospital_address">Address</label>
            <input
              class="bg-[#F7FBFF] border border-slate-200 py-4 pl-4 rounded-[8px] placeholder:text-sm text-slate-800 outline-none"
              type="text" placeholder="Full address" id="hospital_address" required v-model.lazy="hospital.address" />
          </div>

          <div class="hospital_email my-4 flex gap-1 flex-col">
            <label for="hospital_email">Email</label>
            <input
              class="bg-[#F7FBFF] border border-slate-200 py-4 pl-4 rounded-[8px] placeholder:text-sm text-slate-800 outline-none"
              type="email" id="hospital_email" placeholder="email@gmail.com" required v-model.lazy="hospital.email" />
          </div>

          <div class="hospital_image my-4 flex gap-1 flex-col">
            <label for="hospital_image">Image</label>
            <input
              class="bg-[#F7FBFF] border border-slate-200 py-4 pl-4 rounded-[8px] placeholder:text-sm text-slate-800 outline-none"
              type="file" accept="image/*" id="hospital_image" @change="createImage" required />
          </div>

          <button
            class="border flex items-center justify-center w-full h-[55px] text-slate-100 bg-green_v_1/90 rounded-[8px] hover:bg-green_v_1 transition-all duration-300"
            type="submit">
            <img v-if="loading" class="w-8 h-8 animate-spin"
              src="https://img.icons8.com/fluency-systems-filled/f1f5f9/48/spinner-frame-2.png" alt="spinner-frame-2" />
            <span v-else class="capitalize">Upload</span>
          </button>

        </form>
      </div>

    </div>
  </section>
</template>

<style>
.md-editor {
  height: 100%;
  border-radius: 8px;
}
</style>
