import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "../../config"

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// initialize service
const database = getFirestore()

export default database
