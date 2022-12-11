import { useContext } from 'react'
import FirebaseContext from '../firebase/FirebaseProvider'

const useFirebase = () => {
  return useContext(FirebaseContext)
}

export default useFirebase
