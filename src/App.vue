<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
import { useUsersStore } from './stores/users';
import { useHospitalsStore } from './stores/hospital';
import { onBeforeMount } from 'vue';

const users_store = useUsersStore();
const hospitals_store = useHospitalsStore();
const { fetchUsers } = users_store;
const { getLocation } = hospitals_store;

onBeforeMount(async () => {
  await fetchUsers()
  await getLocation()
});
</script>

<template>
  <NavBar />
  <RouterView />
  <FooterSection />
</template>

<style scoped>
</style>
