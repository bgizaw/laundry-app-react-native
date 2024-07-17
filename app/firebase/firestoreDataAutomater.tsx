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

// // structure for Out-of-order complaints
// const washerOutOfOrder = {
//   dates: [],
//   number: 0,
// }

// const other = {
//   complaint: [],
//   number: 0,
// }

// const dryerOutOfOrder = {
//   dates: [],
//   number: 0,
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
//     const outOfOrderCollectionRef = collection(washerDocRef, "out-of-order")
//     // Create a subcollection within the washer document
//     setDoc(doc(outOfOrderCollectionRef, "odor"), washerOutOfOrder)
//     setDoc(doc(outOfOrderCollectionRef, "missingClothes"), washerOutOfOrder)
//     setDoc(doc(outOfOrderCollectionRef, "blockedOffNote"), washerOutOfOrder)
//     setDoc(doc(outOfOrderCollectionRef, "other"), other)
//     setDoc(doc(outOfOrderCollectionRef, "total"), washerOutOfOrder) // Example of setting a document in the subcollection
//   }
//   // populate each collection with appropriate amount of dryers
//   for (let dryerCount = 1; dryerCount <= data[dataIndex].dryers; dryerCount++) {
//     let dryerDocRef = doc(collectionRef, "Dryer " + dryerCount.toString())
//     setDoc(dryerDocRef, dryerData)

//     setDoc(dryerDocRef, washerData)
//     const outOfOrderCollectionRef = collection(dryerDocRef, "out-of-order")
//     // Create a subcollection within the washer document
//     setDoc(doc(outOfOrderCollectionRef, "odor"), dryerOutOfOrder)
//     setDoc(doc(outOfOrderCollectionRef, "missingClothes"), dryerOutOfOrder)
//     setDoc(doc(outOfOrderCollectionRef, "blockedOffNote"), dryerOutOfOrder)
//     setDoc(doc(outOfOrderCollectionRef, "didntDry"), dryerOutOfOrder)
//     setDoc(doc(outOfOrderCollectionRef, "burnt"), dryerOutOfOrder)
//     setDoc(doc(outOfOrderCollectionRef, "other"), other)
//     setDoc(doc(outOfOrderCollectionRef, "total"), dryerOutOfOrder) // Example of setting a document in the subcollection
//   }
// }
