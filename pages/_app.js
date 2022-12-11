import App from 'next/app'
import { FirebaseProvider } from '../firebase/FirebaseProvider'

const MyApp = props => {
  const { Component, pageProps } = props
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  )
}

export default MyApp
