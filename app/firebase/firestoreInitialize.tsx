import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfB12Q3ECoYGcbOiqstIrc44ynfFs4P4U",
  authDomain: "laundry-app-v1.firebaseapp.com",
  projectId: "laundry-app-v1",
  storageBucket: "laundry-app-v1.appspot.com",
  messagingSenderId: "308543127361",
  appId: "1:308543127361:web:c61b325a579f4c85ce2bc0",
  measurementId: "G-7G0CTB906G",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// initialize service
const database = getFirestore()

export default database
