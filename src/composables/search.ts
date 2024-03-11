import { useHospitalsStore } from '@/stores/hospital';

export const useSearch = async(search: string | null) => {
  const hospitals_store = useHospitalsStore();
  const { searchForHospitals } = hospitals_store;
  if (search) {
    try{
      await searchForHospitals(search)
      return true;
    } catch (error) {
      console.log(error)
      alert(`Oops, please try searching again`);
      return false;
    }
  }
  else {
    alert("Enter a search location");
    return false;
  }
}