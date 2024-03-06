<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue';
import HospitalCard from '@/components/HospitalCard.vue';
import hospital from '@/assets/images/hospital_01.png';

interface Hospital {
  name: string;
  location: string;
  id: string;
  image: string;
  rating: number;
  phone: string;
  email: string;
  website: string;
}

const hospitals: Array<Hospital> = [
  {
    name: 'St. Mary\'s Hospital',
    location: 'Kisumu, Kenya',
    id: '0',
    image: hospital,
    rating: 4.5,
    phone: '+254 712 345 678',
    email: '',
    website: 'https://stmaryshospital.com',
  },
  {
    name: 'St. Mary\'s Hospital',
    location: 'Kisumu, Kenya',
    id: '1',
    image: hospital,
    rating: 4.5,
    phone: '+254 712 345 678',
    email: '',
    website: 'https://stmaryshospital.com',
  },
  {
    name: 'St. Mary\'s Hospital',
    location: 'Kisumu, Kenya',
    id: '2',
    image: hospital,
    rating: 4.5,
    phone: '+254 712 345 678',
    email: '',
    website: 'https://stmaryshospital.com',
  },
  {
    name: 'St. Mary\'s Hospital',
    location: 'Kisumu, Kenya',
    id: '3',
    image: hospital,
    rating: 4.5,
    phone: '+254 712 345 678',
    email: '',
    website: 'https://stmaryshospital.com',
  },
  {
    name: 'St. Mary\'s Hospital',
    location: 'Kisumu, Kenya',
    id: '4',
    image: hospital,
    rating: 4.5,
    phone: '+254 712 345 678',
    email: '',
    website: 'https://stmaryshospital.com',
  },
]
</script>

<template>
  <HeroSection />

  <section class="hospitals bg-white/70 pb-12 px-5 lg:px-20 md:px-16 sm:px-12 gap-12">
    <header class="flex gap-x-10 gap-y-4 mb-10 flex-wrap justify-center lg:justify-between md:justify-between sm:justify-center items-center">
      <div>
        <h2 class="font-[500] text-[24px]">List of hospitals close to you</h2>
        <p class="text-slate-500">Find the best hospitals in your region</p>
      </div>

      <div>
        <button class="bg-green_v_1 h-[50px] flex items-center justify-center gap-2 text-slate-100 text-sm px-4 rounded-[8px]">
          <div>
            <img class="w-5 h-5" src="https://img.icons8.com/material-rounded/f9f9f9/96/hospital-3.png" alt="hospital-3" />
          </div>
          Add new hospital
        </button>
      </div>
    </header>

    <section class="hospital_container flex flex-wrap items-center justify-center gap-8">
      <HospitalCard :hospital="hospital" v-for="hospital in hospitals" :key="hospital.id" />
    </section>
  </section>
</template>
