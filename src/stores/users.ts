import { defineStore } from 'pinia'
import { db, firebaseAuth } from '@/utils/firebase'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { v4 } from 'uuid'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

// User details
interface User {
  id: string
  fullname: string | null
  email: string | null
  password: string | null
}

interface LoginDetails {
  email: string | null
  password: string | null
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    loggedIn: false,
    loggedInUser: {} as User
  }),
  getters: {},
  actions: {
    async fetchUsers() {
      // const users: Array<never> = []
      const querySnapshot = await getDocs(collection(db, 'users'))
      const users: User[] = []

      querySnapshot.forEach((doc) => {
        const modifiedDocData = { ...doc.data() }

        const user: User = {
          id: modifiedDocData.id,
          fullname: modifiedDocData.fullname,
          email: modifiedDocData.email,
          password: modifiedDocData.password
        }

        users.push(user)
      })

      this.users = users
      return users
    },
    async checkIfUserIsRegistered(email: string | null) {
      const isRegistered = this.users.find((user: User) => user.email === email)
      return isRegistered ? true : false
    },
    async registerUser(user: User) {
      // Add a new document with a generated id.
      try {
        await setDoc(doc(db, 'users', user.id), user)
        await this.fetchUsers()

        // Save user to local storage for future use in the app
        localStorage.setItem('user', JSON.stringify(user))
        return user
      } catch (err) {
        console.log(err)
      }
    },
    async signUpWithGoogle() {
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(firebaseAuth, provider)
        const id = v4()

        const user: User = {
          id,
          fullname: result.user.displayName,
          email: result.user.email,
          password: ''
        }

        // Check if user is already registered
        const isRegistered = await this.checkIfUserIsRegistered(user.email)

        if (isRegistered) {
          return false
        } else {
          // Save user to the database
          await this.registerUser(user)

          // Save logged in user to the store
          this.loggedIn = true
          this.loggedInUser = user

          return true
        }
      } catch (error: any) {
        // The pending Google credential.
        const pendingCred = error.credential
        console.log(pendingCred)
      }
    },
    async signUpWithEmailPassword(user: User) {
      const id = v4()
      user.id = id

      // Check if user is already registered
      const isRegistered = await this.checkIfUserIsRegistered(user.email)

      if (isRegistered) {
        alert(`User with email: ${user.email} has already been used, please login`)
        return false
      }

      // Save user to the database
      await this.registerUser(user)

      // Save logged in user to the store
      this.loggedIn = true
      this.loggedInUser = user

      return true
    },
    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(firebaseAuth, provider)

        const loginDetails: LoginDetails = {
          email: result.user.email,
          password: ''
        }
        // Check if user is already registered
        const isRegistered = await this.checkIfUserIsRegistered(loginDetails.email)

        if (isRegistered) {
          // Get user details
          const user = this.users.find((user: User) => user.email === loginDetails.email)

          // Save user to local storage for future use in the app
          localStorage.setItem('user', JSON.stringify(user))

          // Save logged in user to the store
          this.loggedIn = true
          this.loggedInUser = user as User

          return true
        } else {
          return false
        }
      } catch (error: any) {
        // The pending Google credential.
        const pendingCred = error.credential
        console.log(pendingCred)
      }
    },
    async loginWithEmailPassword(loginDetails: LoginDetails) {
      // Check if user is already registered
      const isRegistered = await this.checkIfUserIsRegistered(loginDetails.email)
      // Check if password and email is correct
      const user = this.users.find(
        (user: User) => user.email === loginDetails.email && user.password === loginDetails.password
      )

      if (isRegistered && user) {
        // Save user to local storage for future use in the app
        localStorage.setItem('user', JSON.stringify(user))

        // Save logged in user to the store
        this.loggedIn = true
        this.loggedInUser = user as User
        return true
      }
      return false
    },
    async getSavedUserFromLocalStorage() {
      const user = localStorage.getItem('user')

      if (user) {
        this.loggedIn = true
        this.loggedInUser = JSON.parse(user)
      }
    },
    async userLogout() {
      if (this.loggedInUser) {
        this.loggedInUser = {} as User
        this.loggedIn = false
        localStorage.clear()
        return true
      } else return false
    }
  }
})
