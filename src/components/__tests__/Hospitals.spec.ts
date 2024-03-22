import { describe, it, expect, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Hero from '../HeroSection.vue'
import { useHospitalsStore } from '../../stores/hospital'
import { useUsersStore } from '../../stores/users'
import { createPinia, setActivePinia } from 'pinia'

describe('Hero', () => {
  it('renders properly', () => {
    const wrapper = mount(Hero)
    expect(wrapper.text()).toContain('Empower Your Health Journey with')
  })
})

// describe('Get hospitals from foursquare', () => {
//   beforeEach(() => {
//     setActivePinia(createPinia())
//   })

// test('should return an array hospitals in Kaduna', async () => {
//   const hospital_store = useHospitalsStore()
//   // const { fetchHospitals } = hospital_store
//   await hospital_store.fetchHospitals('Kaduna, Nigeria')
//   console.log(hospital_store.hospitals)
//   expect(hospital_store.hospitals.length).toBeGreaterThan(0)
// })

// test('should return users', async () => {
//   const users_store = useUsersStore()
//   // const { fetchHospitals } = hospital_store
//   const users = await users_store.fetchUsers()
//   expect(users).toBeGreaterThan(0)
// }, 60000)
// })
