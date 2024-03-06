<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
import { useUsersStore } from './stores/users';
import { onBeforeMount } from 'vue';

const usersStore = useUsersStore();
const { fetchUsers } = usersStore

onBeforeMount(async () => {
  await fetchUsers()
});
</script>

<template>
  <NavBar />
  <RouterView />
  <FooterSection />
</template>

<style scoped>
</style>
