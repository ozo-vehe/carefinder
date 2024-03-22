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

describe('Get hospitals from foursquare', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should return an array hospitals in Kaduna', async () => {
    const hospital_store = useHospitalsStore()
    const hospitals = await hospital_store.fetchHospitals('Kaduna, Nigeria')
    expect(hospitals.length).toBeGreaterThan(0)
  })
})

// describe('Get registered users', () => {
//   beforeEach(() => {
//     setActivePinia(createPinia())
//   })

//   const user = {
//     id: '12345678',
//     fullname: 'John Doe',
//     email: 'email.1@gmail.com',
//     password: '123456789'
//   }

//   test('should return users', async () => {
//     const users_store = useUsersStore()
//     const users = await users_store.registerUser(user)
//     expect(users.length).toBeGreaterThan(0)
//   })
// })
