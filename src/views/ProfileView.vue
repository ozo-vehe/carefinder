<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { useHospitalsStore } from '@/stores/hospital';
import HospitalCard from '@/components/HospitalCard.vue';
import { onBeforeMount, type Ref, ref } from 'vue';
import type { MHospital } from '@/utils/interface';
import { useRouter } from 'vue-router';

const users_store = useUsersStore();
const hospitals_store = useHospitalsStore();
const router = useRouter();
const loading: Ref<boolean> = ref(false);


const { loggedInUser, userLogout } = users_store;
const { userHospitals } = hospitals_store;

const hospitals: Ref<Array<MHospital | undefined>> = ref([]);

const handleLogout = async () => {
  loading.value = true;
  console.log("clicked")
  try {
    const loggedOut = await userLogout();
    loggedOut ? router.push("/") : alert("User not signed in...");
  } catch (error) {
    console.log(error)
  }
  loading.value = false;
}

onBeforeMount(async () => {
  hospitals.value = userHospitals(loggedInUser.id)
  console.log(hospitals.value)
  console.log(userHospitals(loggedInUser.id))
  console.log(loggedInUser.id)
})

</script>

<template>
  <section class="hospital bg-white/90 pb-12">
    <header class="w-full relative h-[300px] py-12 px-5 lg:px-20 md:px-16 sm:px-12">
      <img class="absolute left-20 -bottom-10 bg-green_v_1 w-20 h-20 p-4 object-cover shadow-md rounded-full"
        src="https://img.icons8.com/ios-glyphs/ffffff/90/user--v1.png" alt="user--v1" />

      <button
        class="absolute right-20 -bottom-6 flex items-center justify-center gap-4 shadow-lg bg-green_v_1 text-slate-100 px-4 min-w-[130px] capitalize rounded-[8px] h-[45px]"
        @click="handleLogout">
        logout
        <img class="w-7 h-7 p-[6px] bg-green_v_2 rounded-[3px]"
          src="https://img.icons8.com/ios-glyphs/e9e9e9/90/exit.png" alt="exit" />
      </button>
    </header>

    <div class="profile_details mt-10 pt-2 px-5 lg:px-20 md:px-16 sm:px-12">
      <div class="profile_info">
        <h1 class="text-3xl text-slate-800 font-bold mb-1">{{ loggedInUser.fullname }}</h1>
        <p class="text-md text-slate-400">{{ loggedInUser.email }}</p>
      </div>
    </div>

    <div class="created_hospitals mt-16 pt-4 px-5 lg:px-20 md:px-16 sm:px-12">
      <h2 class="text-[32px] font-bold text-center mb-4">Created Hospitals</h2>
      <div class="hospital_container flex flex-wrap items-center justify-center gap-8 mb-10">
        <template v-if="hospitals.length > 0">
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
</style>