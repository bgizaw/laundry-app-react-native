// this is only meant to be used once to set up the database structure

// import data from "./machineInfo.json"
// import { collection, setDoc, doc } from "firebase/firestore"
// import database from "./firestoreInitialize"

// // structure for each washer document
// const washerData = {
//   status: "available",
//   timeRemaining: 0,
// }

// // structure for each dryer document
// const dryerData = {
//   status: "available",
//   timeRemaining: 0,
// }

// for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
//   const collectionRef = collection(database, data[dataIndex].building)
//   // loop to populate each collection with appropriate amount of washers
//   for (
//     let washerCount = 1;
//     washerCount <= data[dataIndex].washers;
//     washerCount++
//   ) {
//     let washerDocRef = doc(collectionRef, "Washer " + washerCount.toString())
//     setDoc(washerDocRef, washerData)
//   }
//   // populate each collection with appropriate amount of dryers
//   for (let dryerCount = 1; dryerCount <= data[dataIndex].dryers; dryerCount++) {
//     let dryerDocRef = doc(collectionRef, "Dryer " + dryerCount.toString())
//     setDoc(dryerDocRef, dryerData)
//   }
// }