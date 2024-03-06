import { defineStore } from 'pinia'
import { db, firebaseAuth } from '@/firebase'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { v4 } from 'uuid'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'


const router = useRouter();

interface User {
  id: string
  name: string
  email: string
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    loggedIn: false,
    loggedInUser: {}
  }),
  getters: {},
  actions: {
    async fetchUsers() {
      const users: User[] = []
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data())

        users.push(doc.data() as User)
      })

      this.users = users
      console.log(this.users)
    },
    async registerUser(user: User) {
      // Add a new document with a generated id.
      try {
        const firebase_user = await setDoc(doc(db, 'users', user.id), user)
        console.log(firebase_user)
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
        console.log(isRegistered)

        if (isRegistered) {
          alert(`User with email: ${user.email} has already been used, please login`)
          router.push('/login')
        } else {
          // Save user to the database
          await this.registerUser(user)

          // Save user to local storage for future use in the app
          localStorage.setItem('user', JSON.stringify(user))

          // Save logged in user to the store
          this.loggedIn = true
          this.loggedInUser = user

          router.push('/hospitals')

          return user
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
        return
      }

      // Save user to the database
      await this.registerUser(user)
      // Save user to local storage for future use in the app
      localStorage.setItem('user', JSON.stringify(user))

      // Save logged in user to the store
      this.loggedIn = true
      this.loggedInUser = user

      return user
    },
    async checkIfUserIsRegistered(email: string) {
      const isRegistered = this.users.find((user) => user.email === email)

      return isRegistered ? true : false
    }
  }
})
