// import data from "../machineInfo.json"
// import { collection, setDoc, doc } from "firebase/firestore"
// import database from "./firestoreInitialize"

// // structure for each washer document
// const washerData = {
//   status: "available",
//   endTime: 0,
//   machineType: "washer",
//   timerStarted: false,
//   cycleLength: 0,
//   userIP: "0.0.0.0", //IPv4 address of user that started the machine
// }

// // structure for each dryer document
// const dryerData = {
//   status: "available",
//   endTime: 0,
//   machineType: "dryer",
//   timerStarted: false,
//   userIP: "0.0.0.0",
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
