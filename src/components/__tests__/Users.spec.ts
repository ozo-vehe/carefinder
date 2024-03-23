import { describe, it, expect, beforeEach } from 'vitest'
import { useUsersStore } from '../../stores/users'
import { createPinia, setActivePinia } from 'pinia'
import type { User } from '@/utils/interface'

describe('Get registered users', () => {
  let user: User
  beforeEach(() => {
    setActivePinia(createPinia())
    user = {
      id: '12345678',
      fullname: 'John Doe',
      email: 'email.1@gmail.com',
      password: '123456789',
      image: null,
      role: 'admin'
    }
  })

  it('should return users', async () => {
    const users_store = useUsersStore()
    await users_store.registerUser(user)
    expect(users_store.users.length).toBeGreaterThan(0)
  })

  it('should fetch saved users', async () => {
    const users_store = useUsersStore()
    await users_store.registerUser(user)
    const users = await users_store.fetchUsers()
    expect(users.length).toBeGreaterThan(0)
  })
})
