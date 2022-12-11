import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  updateProfile,
} from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage'

import firebaseConfig from './config'

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig)
    this.db = getFirestore(app)
    this.auth = getAuth()
    this.storage = getStorage(app)
  }

  //Section: - User Account
  async createAccount(name, email, password) {
    const newUser = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    )

    return await updateProfile(newUser.user, { displayName: name })
  }

  async loginAccount(email, password) {
    return await signInWithEmailAndPassword(this.auth, email, password)
  }

  async signOut() {
    return await signOut(this.auth)
  }

  //Section: Products

  async createNewObject(collectionName, object) {
    return await addDoc(collection(this.db, collectionName), object)
  }

  async uploadFileImage(e) {
    const file = e.target.files[0]
    const imageRef = ref(this.storage, 'products' + file.name)
    const uploadTask = uploadBytesResumable(imageRef, file)
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Uploading image: ${progress}% finished`)
      },
      //Error
      error => {
        throw (
          ({
            code: 404,
            message: error,
            error: true,
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
              console.log('Image available at:', url)
              return url
            })
          })
        )
      }
    )
  }
}

const firebase = new Firebase()

export default firebase
