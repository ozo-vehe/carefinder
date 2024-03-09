<script setup lang="ts">
import { useHospitalsStore } from '@/stores/hospital';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM, TileWMS, XYZ } from 'ol/source';
import 'ol/ol.css';
import L from 'leaflet';


// const map_container: Ref<HTMLElement | string> = ref('');

const drawMap = () => {
  console.log(hospital.value);
  let map = L.map("map_container").setView([hospital.value.latitude, hospital.value.longitude], 16);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
  // L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
  //   layers: 'nexrad-n0r-900913',
  //   format: 'image/png',
  //   transparent: true,
  //   attribution: "Weather data © 2012 IEM Nexrad"
  // }).addTo(map);

  L.marker([hospital.value.latitude, hospital.value.longitude]).addTo(map);
  // let map = new Map({
  //   target: 'map_container',
  //   layers: [
  //     new TileLayer({
  //       source: new OSM()
  //       // source: new XYZ({
  //       // url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
  //     // })
  //     })
  //   ],
  //   view: new View({
  //     center: [0, 0],
  //     zoom: 5,
  //   })
  // })

  // const map = new Map({
  //   target: 'map',
  //   view: new View({
  //     projection: 'EPSG:3857', // here is the view projection
  //     center: [0, 0],
  //     zoom: 2,
  //   }),
  //   layers: [
  //     new TileLayer({
  //       source: new TileWMS({
  //         projection: 'EPSG:4326', // here is the source projection
  //         url: 'https://ahocevar.com/geoserver/wms',
  //         params: {
  //           'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
  //         },
  //       }),
  //     }),
  //   ],
  // });

}
// Hospital details
interface Hospital {
  id: string
  name: string
  link: string
  location: string
  longitude: number
  latitude: number
}

const route = useRoute();
const hospital_store = useHospitalsStore();

const { getHospital } = hospital_store;
const { params } = route;

const hospital: Ref<Hospital | any> = ref();
const loading: Ref<boolean> = ref(false);

onMounted(async () => {
  console.log(params)
  const id = params.id.toString();
  hospital.value = getHospital(id);
  drawMap();
});
</script>

<template>
  <section class="hospital bg-white/70 py-12 px-5 lg:px-20 md:px-16 sm:px-12">
    <div v-if="loading" class="loader">
    </div>
    <div v-else class="hospital_details_container flex flex-wrap items-start justify-center gap-12">
      <div class="w-full lg:w-[45%] md:w-[45%] sm:w-full order-2 lg:order-1 md:order-1 sm:order-2">
        <header class="">
          <h3 class="font-[500] text-[34px] capitalize">{{ hospital?.name }}</h3>
          <p class="text-[18px] text-slate-500 font-[400]">{{ hospital?.location }}</p>
        </header>
      </div>

      <div id="map_container"
        class="h-[200px] lg:h-[500px] md:h-fit sm:h-[200px] rounded-[8px] lg:rounded-[3px] md:rounded-[26px] sm:rounded-[8px] shadow-[0_0_3px_#a9a9a9] overflow-hidden w-full lg:w-[45%] md:w-[45%] sm:w-full order-1 lg:order-2 md:order-2 sm:order-1">
        <p>Map</p>
      </div>
    </div>
  </section>
</template>
