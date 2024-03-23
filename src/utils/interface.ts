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
  fullname: string
  email: string
  image: string | null
  password: string | null
  role: string
}
