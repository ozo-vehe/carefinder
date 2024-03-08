import { defineStore } from 'pinia'

// Hospital details
interface Hospital {
  id: string
  name: string
  email: string
  link: string
  location: string
}

export const useHospitalsStore = defineStore('hospitals', {
  state: () => ({
    hospitals: [] as Hospital[],
    longitude: 0,
    latitude: 0
  }),
  getters: {},
  actions: {
    async fetchHospitals(search: string | null = null) {
      this.hospitals = [];
      try {
        let searchParams
        if (search) {
          searchParams = new URLSearchParams({
            near: search,
            categories: '15014'
            // sort: 'DISTANCE'
          })
        } else {
          searchParams = new URLSearchParams({
            ll: `${this.latitude},${this.longitude}`,
            categories: '15014'
            // sort: 'DISTANCE'
          })
        }
        console.log(searchParams)
        const results = await fetch(`https://api.foursquare.com/v3/places/search?${searchParams}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'fsq30mMUwNXDA6UtuxHJnLGvHwaOQa7MleYB6dxnxs1tE6w='
          }
        })
        const data = await results.json()
        console.log(data)
        
        this.latitude = data.context.geo_bounds.circle.center.latitude;
        this.longitude = data.context.geo_bounds.circle.center.longitude;

        const hospitals: Hospital[] = []
        data.results.forEach((result: any) => {
          const hospital: Hospital = {
            id: result.fsq_id,
            name: result.name,
            email: result.email,
            link: result.link,
            location: result.location.formatted_address
          }
          hospitals.push(hospital)
        })

        this.hospitals = hospitals
      } catch (err) {
        console.error(err)
      }
    },
    async searchForHosipitals(search: string | null) {
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
          this.longitude = position.coords.longitude
          this.latitude = position.coords.latitude

          console.log(this.longitude, this.latitude)
        },
        (error) => {
          console.log(error.message)
        }
      )
      // }
    }
  }
})
