import { defineStore } from 'pinia';
import { v4 } from 'uuid';
import { getSavedHospitalsFromFirestore, saveHospitalToFirestore } from '@/utils/firestore_db';
import type {Hospital, MHospital} from '@/utils/interface';

export const useHospitalsStore = defineStore('hospitals', {
  state: () => ({
    hospitals: [] as Hospital[],
    m_hospitals: [] as MHospital[],
    longitude: 0,
    latitude: 0,
    get_location: {status: "", location: false} as {status: string, location: boolean},
    show_share: false,
  }),
  getters: {
    getHospital: (state): ((id: string) => Hospital | undefined) => (id) => {
      return state.hospitals.find((hos: Hospital) => hos.id === id)
    },
    getMHospital: (state): ((id: string) => MHospital | undefined) => (id) => {
      return state.m_hospitals.find((hos: MHospital) => hos.id === id)
    },
    userHospitals: (state): ((id: string) => Array<MHospital | undefined>) => (id) => {
      console.log(id)
      const hospitals = state.m_hospitals.filter((hos: MHospital) => hos.created_by === id)
      console.log(hospitals)
      return hospitals;
    }
  },
  actions: {
    async fetchHospitals(search: string | null = null) {
      this.hospitals = [];
      // const hospitals = sessionStorage.getItem('hospitals');
      // if (hospitals) {
      //   this.hospitals = JSON.parse(hospitals) as Hospital[];
      //   return;
      // }
      try {
        let searchParams
        if (search) {
          searchParams = new URLSearchParams({
            near: search,
            categories: '15014',
            sort: 'DISTANCE'
          })
        } else {
          console.log(this.latitude, this.longitude);
          searchParams = new URLSearchParams({
            ll: `${this.latitude},${this.longitude}`,
            categories: '15014',
            sort: 'DISTANCE'
          })
        }
        console.log(searchParams)
        const results = await fetch(`https://api.foursquare.com/v3/places/search?${searchParams}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: import.meta.env.VITE_FOURSQUARE_API_KEY as string,
          }
        })
        console.log(results)
        const data = await results.json()
        console.log(data)

        // Change this to a more specific error handling
        if(data.results.length > 0) this.get_location = {status: "success", location: true};
        
        this.latitude = data.context.geo_bounds.circle.center.latitude;
        this.longitude = data.context.geo_bounds.circle.center.longitude;

        const hospitals: Hospital[] = []
        data.results.forEach((result: any) => {
          const hospital: Hospital = {
            id: result.fsq_id,
            name: result.name,
            image: result.image,
            email: result.contact?.email,
            link: result.link,
            address: result.location.formatted_address,
            longitude: result.geocodes.main.longitude,
            latitude: result.geocodes.main.latitude,
          }
          hospitals.push(hospital)
          sessionStorage.setItem('hospitals', JSON.stringify(hospitals));
        })

        this.hospitals = hospitals
      } catch (err: any) {
        console.error(err)
        return {stats: "error", error: err};
      }
    },
    async searchForHospitals(search: string | null) {
      // await this.getLocation(search)
      this.fetchHospitals(search)
    },
    async getLocation() {
      // if (location) {
      //   console.log(location)
      //   const req = await fetch(
      //     `https://nominatim.openstreetmap.org/?addressdetails=1&q=${location}&format=json&limit=1`
      //   )
      //   const res = await req.json()
      //   console.log(res)
      //   this.longitude = res[0].lon
      //   this.latitude = res[0].lat
      // } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.get_location = {status: "success" , location: true};
          this.longitude = position.coords.longitude
          this.latitude = position.coords.latitude
        },
        (error) => {
          console.log(error.message)
          this.get_location = {status: error.message, location: false};
        }
      )
      // }
    },
    async uploadHospital(hospital: any) {
      console.log(hospital);
      const id = v4();
      hospital.id = id;

      if (hospital.markdown) {
        console.log(hospital);
        await saveHospitalToFirestore(hospital, hospital.id);
        const m_hospitals = await getSavedHospitalsFromFirestore();
        
        if (m_hospitals) {
          this.m_hospitals = m_hospitals as { id: string; content: string; markdown: boolean; created_by: string }[];
        }
      } else {
        console.log(hospital);
      }
      return true
    },
    async getSavedHospitals() {
      const m_hospitals = await getSavedHospitalsFromFirestore();
      if (m_hospitals) {
        this.m_hospitals = m_hospitals as { id: string; content: string; markdown: boolean; created_by: string }[];
      }
    }
  }
})
