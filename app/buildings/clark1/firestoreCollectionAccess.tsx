import { collection } from "firebase/firestore"
import database from "../firestoreInitialize"

// collection reference
const collectionRef = collection(database, "Clark I") // change clark I to the id/building name that gets passed when i make this file dynamic instea dof just for clark I

export default collectionRef
