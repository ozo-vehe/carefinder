import { db } from './firebase'
import { setDoc, doc } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import type { MHospital } from './interface'
import type { User } from './interface';


export const saveHospitalToFirestore = async (hospital: Object, id: string) => {
  try {
    await setDoc(doc(db, 'hospitals', id), hospital)
  } catch (err) {
    console.log(err)
  }
}

export const getSavedHospitalsFromFirestore = async () => {
  try {
    console.log("Getting hospitals...")
    const user_storage = localStorage.getItem("user")
    const getSignedInUser: User | null = user_storage ? JSON.parse(user_storage) : null;
    
    const data: Array<MHospital | undefined> = []
    const querySnapshot = await getDocs(collection(db, 'hospitals'))
    querySnapshot.forEach((doc) => {
      const m_data = { ...doc.data() }
      const hospital: MHospital = {
        id: m_data.id,
        content: m_data.content,
        markdown: m_data.markdown,
        created_by: getSignedInUser?.id ?? "",
      }
      data.push(hospital)
    })
    return data;
    
  } catch (err) {
    console.log(err)
  }
}
