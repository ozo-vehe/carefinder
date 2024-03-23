import { describe, it, expect, beforeEach } from 'vitest'
import { useHospitalsStore } from '../../stores/hospital'
import { createPinia, setActivePinia } from 'pinia'
import type { MHospital } from '../../utils/interface'
import { v4 } from 'uuid'

describe('Get hospitals from foursquare', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should return an array hospitals in Kaduna', async () => {
    const hospital_store = useHospitalsStore()
    await hospital_store.fetchHospitals('Kaduna, Nigeria')
    expect(hospital_store.hospitals.length).toBeGreaterThan(0)
  })
})

describe('Markdown hospitals', () => {
  let hospital: MHospital
  beforeEach(() => {
    setActivePinia(createPinia())
    hospital = {
      id: v4(),
      content: '# This is a hospital in Kaduna',
      created_by: v4(),
      markdown: true
    }
  })

  it('it should save a markdown hospital to firestore', async () => {
    const hospital_store = useHospitalsStore()
    await hospital_store.uploadHospital(hospital)
    expect(hospital_store.m_hospitals.length).toBeGreaterThan(0)
  })

  it('it should retrieve saved hospitals', async () => {
    const hospital_store = useHospitalsStore()
    await hospital_store.uploadHospital(hospital)
    const hospitals: any = await hospital_store.getSavedHospitals()
    expect(hospitals?.length).toBeGreaterThan(0)
  })
})
