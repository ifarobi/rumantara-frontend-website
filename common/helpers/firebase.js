import firebase from 'firebase'
import config from 'config'

const appConfig = {
  apiKey: config.FIREBASE_API,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
}

firebase.initializeApp(appConfig)

const storage = firebase.storage()

export {
  storage
}
