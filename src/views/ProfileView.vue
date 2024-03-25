<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { useHospitalsStore } from '@/stores/hospital';
import HospitalCard from '@/components/HospitalCard.vue';
import { onMounted, type Ref, ref, watch } from 'vue';
import type { MHospital } from '@/utils/interface';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

// Initialize necessary variables and hooks
const users_store = useUsersStore(); // Access user store
const hospitals_store = useHospitalsStore(); // Access hospitals store
const router = useRouter(); // Router instance
const route = useRoute(); // Route instance
const loading: Ref<boolean> = ref(false); // Loading state for async operations

// Destructure required properties from stores
const { loggedInUser, userLogout } = users_store; // User related functions
const { m_hospitals } = storeToRefs(hospitals_store); // Hospitals data

// Array to hold user-specific hospitals
const hospitals: Ref<Array<MHospital | undefined>> = ref([]);

// Function to handle user logout
const handleLogout = async () => {
  loading.value = true; // Set loading state
  console.log("clicked"); // Log click event
  try {
    const loggedOut = await userLogout(); // Attempt logout
    loggedOut ? router.push("/login") : alert("User not signed in..."); // Redirect to login if successful
  } catch (error) {
    console.log(error); // Log error if logout fails
  }
  loading.value = false; // Reset loading state
}

// Function to filter hospitals based on user ID
const getUserHospitals = (user_id: string) => {
  let filteredHospitals: any = [];

  // Filter hospitals created by the current user
  m_hospitals?.value.forEach((hospital: MHospital) => {
    console.log(hospital.created_by, user_id); // Log user and hospital creator ID
    hospital.created_by == user_id && filteredHospitals.push(hospital); // Add hospital to filtered list if created by the current user
  });

  hospitals.value = filteredHospitals; // Update hospitals list
}

// Watch for changes in user ID and update hospitals accordingly
watch({ user_id: route.params.user_id }, async (newVal) => {
  getUserHospitals(newVal.user_id as string); // Fetch user-specific hospitals
})

// Fetch user-specific hospitals on component mount
onMounted(async () => {
  console.log("Before mount"); // Log before mount
  getUserHospitals(route.params.user_id as string); // Fetch user-specific hospitals
})
</script>

<template>
  <section class="hospital bg-white/90 pb-12">
    <header class="w-full relative h-[300px] py-12 px-5 lg:px-20 md:px-16 sm:px-12">
      <img
        class="absolute left-5 lg:left-20 md:left-16 sm:left-12 -bottom-10 bg-green_v_1 w-20 h-20 p-4 object-cover shadow-md rounded-full"
        src="https://img.icons8.com/ios-glyphs/ffffff/90/user--v1.png" alt="user--v1" />

      <button
        class="absolute right-5 lg:right-20 md:right-16 sm:right-12 -bottom-6 flex items-center justify-center gap-4 shadow-lg bg-green_v_1 text-slate-100 px-4 min-w-[130px] capitalize rounded-[8px] h-[45px]"
        @click="handleLogout">
        logout
        <img class="w-7 h-7 p-[6px] bg-green_v_2 rounded-[3px]"
          src="https://img.icons8.com/fluency-systems-filled/e9e9e9/96/exit.png" alt="exit" />
      </button>
    </header>

    <div class="profile_details mt-10 pt-2 px-5 lg:px-20 md:px-16 sm:px-12">
      <div class="profile_info">
        <h1 class="text-3xl text-slate-800 font-bold mb-1">{{ loggedInUser.fullname }}</h1>
        <p class="text-md text-slate-400">{{ loggedInUser.email }}</p>
      </div>
    </div>

    <div class="created_hospitals mt-16 pt-4 px-5 lg:px-20 md:px-16 sm:px-12">
      <h2 class="font-bold text-center mb-4">Created Hospitals</h2>
      <div class="hospital_container flex flex-wrap items-center justify-center gap-8 mb-10">
        <template v-if="hospitals && hospitals.length > 0">
          <HospitalCard :markdown="true" :hospital="undefined" :m_hospital="hospital" v-for="hospital in hospitals"
            :key="hospital?.id" />
        </template>
        <div v-else class="text-center mb-10">
          No hospital created yet
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
header {
  background-image: url('@/assets/images/profile.jpeg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* color: #5f8d4e */
}

.created_hospitals>h2 {
  font-size: 32px !important;
}
</style>