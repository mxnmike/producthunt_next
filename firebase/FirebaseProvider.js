import { createContext, useEffect, useState } from 'react'
import firebase from './firebase'

const FirebaseContext = createContext(null)

const FirebaseProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const loginAccount = async (email, password) => {
    return await firebase.loginAccount(email, password)
  }

  return (
    <FirebaseContext.Provider value={{ authUser, loginAccount }}>
      {children}
    </FirebaseContext.Provider>
  )
}
export { FirebaseProvider }
export default FirebaseContext
