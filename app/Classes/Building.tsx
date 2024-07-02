import { CollectionReference, DocumentData, getDocs } from "firebase/firestore"

class Building {
  public buildingName: string
  public database?: CollectionReference<DocumentData, DocumentData>
  public washerNum: number = 0
  public dryerNum: number = 0
  public washersList: string[] = []
  public dryersList: string[] = []

  constructor(
    buildingName: string,
    database?: CollectionReference<DocumentData, DocumentData>
  ) {
    this.buildingName = buildingName
    this.database = database
  }
}

//   machineCounter(database: CollectionReference<DocumentData, DocumentData>) {
//     getDocs(database).then(snapshot => {
//       snapshot.docs.forEach(doc => {
//         let machineType = doc.data().machineType
//         if (machineType === "washer") {
//           this.washerNum++
//         } else if (machineType === "dryer") {
//           this.dryerNum++
//         }
//       })
//     })
//   }
// }

// const machineCounter = (
//     collectionRef: CollectionReference<DocumentData, DocumentData>
//   ) => {
//     let washersNum: number = 0
//     let dryersNum: number = 0

//     getDocs(collectionRef).then(snapshot => {
//       snapshot.docs.forEach(doc => {
//         let machineType = doc.data().machineType
//         if (machineType === "washer") {
//           washersNum++
//         } else if (machineType === "dryer") {
//           dryersNum++
//         }
//       })
//       console.log([washersNum, dryersNum])
//     })
//     console.log("Outside: " + [washersNum, dryersNum])
//   }

export default Building
