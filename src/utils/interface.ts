export interface Hospital {
  id: string
  name: string
  link: string | null
  longitude: string | number
  latitude: string | number
  address: string
  email: string
  image: string
}

export interface MHospital {
  id: string
  content: string
  markdown: boolean
  created_by: string
}

export interface User {
  id: string
  name: string
  email: string
  image: string
  role: string
}
