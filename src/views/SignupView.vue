<script setup lang="ts">
import google_icon from '@/assets/images/google_logo.png';
import image from '@/assets/images/login_img.png';
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users';

// User details
interface User {
  id: string;
  fullname: string | null;
  email: string | null;
  password: string | null;
}
// Initialize router instance
const router = useRouter();

// Create the user store instance
const userStore = useUsersStore()

// Get the register user function
const {signUpWithGoogle, signUpWithEmailPassword} = userStore

// Loader instance
const loading: Ref<boolean> = ref(false);
const google_loading: Ref<boolean> = ref(false);
// Is password the same
const is_the_same: Ref<boolean> = ref(false);
  
// Confirm password
const c_password: Ref<string> = ref('');

const user: User = reactive({
  id: '',
  fullname: '',
  email: '',
  password: ''
});

const handleCreateUser = async () => {
  loading.value = true;
  // Check if the passwords are the same
  is_the_same.value = user.password === c_password.value && user.password.length > 7;
  // const user_exist = user.email === saved_user.email

  if (user.email && user.fullname && is_the_same.value) {
    // Register the user
    const isRegistered = await signUpWithEmailPassword(user);

    isRegistered && router.push('./hospitals');
  } else {
    alert("Make sure details are correct");
  }

  loading.value = false;
}

const handleGoogleCreateUser = async () => {
  console.log('google login')
  google_loading.value = true;

  const isRegistered = await signUpWithGoogle();
  if (isRegistered) {
    // Redirect to the hospitals page
    router.push('/hospitals');
  } else {
    alert(`This email address has already been used, please login`);
    // router.push('/login');
  }

  google_loading.value = false;
}
</script>

<template>
  <section class="login py-12 px-5 lg:px-20 md:px-16 sm:px-12 flex flex-wrap items-start justify-center gap-12">
    <div class="login_form w-full lg:w-[45%] md:w-[45%] sm:w-full order-2 lg:order-1 md:order-1 sm:order-2">
      <header>
        <h3 class="font-[500] text-[36px] capitalize">welcome to CareFinder</h3>
        <p class="text-[20px] font-[500]">Create an account to explore, export, and share hospitals seamlessly.</p>
      </header>

      <form class="mt-8 mb-10 w-[100%] lg:w-[90%] md:w-[90%] sm:w-[100%]" @submit.prevent="handleCreateUser">
        <div class="email flex gap-1 flex-col">
          <label for="name">Fullname</label>
          <input
            class="bg-[#F7FBFF] border border-slate-200 py-4 pl-4 rounded-[8px] placeholder:text-sm text-slate-800 outline-none"
            type="text" id="name" placeholder="Firstname, Lastname" required v-model.lazy="user.fullname" />
        </div>

        <div class="email my-4 flex gap-1 flex-col">
          <label for="email">Email</label>
          <input
            class="bg-[#F7FBFF] border border-slate-200 py-4 pl-4 rounded-[8px] placeholder:text-sm text-slate-800 outline-none"
            type="email" id="email" placeholder="example@gmail.com" required v-model.lazy="user.email" />
        </div>

        <div class="password my-4 flex gap-1 flex-col">
          <label for="password">Password</label>
          <input
            class="bg-[#F7FBFF] border border-slate-200 py-4 pl-4 rounded-[8px] placeholder:text-sm text-slate-800 outline-none"
            type="password" id="password" placeholder="At least 8 characters" required v-model="user.password" />
        </div>

        <div class="password mb-4 flex gap-1 flex-col">
          <label for="c_password">Confirm Password</label>
          <input
            class="bg-[#F7FBFF] border border-slate-200 py-4 pl-4 rounded-[8px] placeholder:text-sm text-slate-800 outline-none"
            type="password" id="c_password" placeholder="At least 8 characters" required v-model="c_password" />
          <p v-if="c_password !== user.password" class="text-red-400 text-[12px] -mt-1 ml-1">Not the same</p>
          <p v-if="c_password !== '' && c_password.length < 7" class="text-red-400 text-[12px] -mt-1 ml-1">Password should be 8 characters or more</p>
        </div>

        <button
          class="border flex items-center justify-center w-full h-[55px] text-slate-100 bg-green_v_1/90 rounded-[8px] hover:bg-green_v_1 transition-all duration-300"
          type="submit">
          <img v-if="loading" class="w-8 h-8 animate-spin"
            src="https://img.icons8.com/fluency-systems-filled/f1f5f9/48/spinner-frame-2.png" alt="spinner-frame-2" />
          <span v-else class="capitalize">Sign up</span>
        </button>

        <div class="horizontal_line relative my-10 w-full border">
          <span class="absolute -top-[14px] bg-white px-4 capitalize left-[50%] -translate-x-[50%]">or</span>
        </div>
      </form>

      <button
        class="w-[100%] lg:w-[90%] md:w-[90%] sm:w-[100%] google_login h-[55px] border border-slate-200 flex items-center justify-center gap-4 bg-[#F7FBFF] rounded-[8px]"
        @click="handleGoogleCreateUser">
        <img v-if="google_loading" class="w-8 h-8 animate-spin"
          src="https://img.icons8.com/fluency-systems-filled/000000/48/spinner-frame-2.png" alt="spinner-frame-2" />

        <div v-else class="flex items-center justify-center gap-4">
          <img :src="google_icon" alt="Google icon">
          <p>Sign up with Google</p>
        </div>
      </button>

      <p class="w-[100%] lg:w-[90%] md:w-[90%] mt-4 sm:w-[100%] text-center text-sm">Have an account? <RouterLink class="text-green_v_2" to="/login">Login
        </RouterLink>
      </p>
    </div>

    <div
      class="login_imgae h-[200px] lg:h-fit md:h-fit sm:h-[200px] rounded-[8px] lg:rounded-[26px] md:rounded-[26px] sm:rounded-[8px] shadow-[0_0_3px_#a9a9a9] overflow-hidden w-full lg:w-[45%] md:w-[45%] sm:w-full order-1 lg:order-2 md:order-2 sm:order-1">
      <img class="w-full h-full object-cover" :src="image" alt="Login image">
    </div>
  </section>
</template>

<style>
</style>
