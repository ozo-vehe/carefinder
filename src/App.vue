<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
import { useUsersStore } from './stores/users';
import { useHospitalsStore } from './stores/hospital';
import { onBeforeMount, ref, watch } from 'vue';

const users_store = useUsersStore();
const hospitals_store = useHospitalsStore();
const { fetchUsers, getSavedUserFromLocalStorage } = users_store;
const { getLocation, getSavedHospitals } = hospitals_store;

let id: any;

onBeforeMount(async () => {
  await fetchUsers()
  await getLocation()
  await getSavedUserFromLocalStorage();
  await getSavedHospitals();
});
const success = () => {
  console.log("success");
}
const error = () => {
  console.log("error");
}

const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

id = navigator.geolocation.watchPosition(success, error)
// const places = ref([]);
// const lat = ref(7.464557);
// const lng = ref(9.031044);

// const findCloseBuyButtonPressed = async () => {
//   console.log("Finding places...");
//   // const { Place } = await google.maps.importLibrary("places");
//   // const service = new google.maps.places.PlacesService(map);
//   // service.nearbySearch(request, callback);
//   // console.log(Place);

//   let map;
//   let service;
//   // // let infowindow;
//   // var pyrmont = new google.maps.LatLng(lat.value, lng.value);

//   // var request = {
//   //   location: pyrmont,
//   //   radius: '2000',
//   //   type: ['hospital']
//   // };

//   // service = new google.maps.places.PlacesService(map);
//   // service.nearbySearch(request, (result :any, status:any) => {
//   //   if (status == google.maps.places.PlacesServiceStatus.OK) {
//   //     for (var i = 0; i < result.length; i++) {
//   //       console.log(result[i]);
//   //     }
//   //   }
//   // });
//   const URL = `https://cors-localhost:5173/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat.value},${lng.value}&type=restaurant&radius=${10 * 1000}&key=AIzaSyA6o9ti7kRgVK195MpqMPKj2ZKBppWZzbo`;

//   try {
//     const req = await fetch(URL)
//     const res = await req.json()
//     console.log(res)
//     // addLocationsToGoogleMaps();
//   } catch (error) {
//     console.log(error);
//   };
// }

// const autoComplete = async () => {
//   const input = document.getElementById('searchTextField');
//   const autocomplete = new google.maps.places.Autocomplete((input), {
//     types: ['geocode']
//   });
//   autocomplete.addListener('place_changed', function () {
//     const place = autocomplete.getPlace();
//     console.log(place.geometry.location);

//     let map = new google.maps.Map(document.getElementById('map'), {
//       center: place.geometry.location,
//       zoom: 15
//     });

//     const service = new google.maps.places.PlacesService(map);
//     console.log(service);
//     service.nearbySearch({
//       location: place.geometry.location,
//       radius: '1000',
//       type: ['hospital']
//     }, (result: any, status: any) => {
//       if (status == google.maps.places.PlacesServiceStatus.OK) {
//         places.value = [];
//         for (var i = 0; i < result.length; i++) {
//           places.value.push(result[i]);
//         }
//         console.log(places.value);
//       }
//     });
//   });

// }
</script>

<template>
  <NavBar />
  <!-- <button>Show places</button>
  <div id="map"></div>
  <div class="map w-[400px] h-[400px]">
    <div v-for="place in places" :key="place.place_id">
      <h3>{{ place.place_id }} - {{ place.name }}</h3>
    </div>
  </div>
  <input @focus="autoComplete" type="text" id="searchTextField"> -->
  <RouterView />
  <FooterSection />
</template>

<style scoped></style>
