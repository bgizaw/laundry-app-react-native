import { Link, useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import data from "./machineInfo.json"
import {
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
} from "firebase/firestore"
import database from "./firebase/firestoreInitialize"
import Building from "./Classes/Building"
import { useEffect } from "react"

// create object from json file and create usable variables based on the data
// const currBuilding = Building.buildingName

// const buildingObj = data.find(i => i.building === currBuilding)!
// const numberOfWashers: number = buildingObj.washers && buildingObj.washers
// const numberOfDryers: number = buildingObj.dryers && buildingObj.dryers
// const washers: string[] = []
// const dryers: string[] = []

// // populate washer and dryer arrays
// for (let washerIndex = 1; washerIndex <= numberOfWashers; washerIndex++) {
//   washers.push("Washer " + washerIndex.toString())
// }

// for (let dryerIndex = 1; dryerIndex <= numberOfDryers; dryerIndex++) {
//   dryers.push("Dryer " + dryerIndex.toString())
// }

// create a jsx list of links that each dynamically leads to a page for the specific washer
// const ListWasherLinks = () => {
//   washers.map(washer => {
//     return (
//       <Link
//         href={{
//           pathname: "Washer/[id]",
//           params: { id: washer },
//         }}
//         key={washer}
//       >
//         {washer}
//       </Link>
//     )
//   })
// }

// const ListDryerLinks = dryers.map(dryer => {
//   return (
//     <Link
//       href={{
//         pathname: "buildings/building/" + currBuilding + "/Dryer/[id]",
//         params: { id: dryer },
//       }}
//       key={dryer}
//     >
//       {dryer}
//     </Link>
//   )
// })

const MachineCounter = (
  collectionRef: CollectionReference<DocumentData, DocumentData>
) => {
  let washersNum: number = 0
  let dryersNum: number = 0

  async function fetchDocsAndCountMachines() {
    try {
      const querySnapshot = await getDocs(collectionRef)
      let washerCount: number = 0
      let dryerCount: number = 0
      const docs = querySnapshot.docs.map(doc => {
        const machineType = doc.data().machineType
        if (machineType == "washer") {
          washerCount++
        } else if (machineType === "dryer") {
          dryerCount++
        }
      })
      // console.log("numWashers", washerCount)
      // console.log("numDryers", dryerCount)
      // washersNum = washerCount
      // dryersNum = dryerCount
      return await { washerCount, dryerCount }
    } catch (error) {
      console.log("Error:", error)
    }
  }

  // try {
  //   const result = fetchDocsAndCountMachines()
  //   // return {result.washerCount, result.dryerCount}
  //   return result
  // } catch (error) {
  //   console.log("Error:", error)
  // }
  return fetchDocsAndCountMachines()
}

// getDocs(collectionRef).then(snapshot => {
//   snapshot.docs.forEach(doc => {
//     let machineType = doc.data().machineType
//     if (machineType === "washer") {
//       washersNum++
//     } else if (machineType === "dryer") {
//       dryersNum++
//     }
//   })
//   console.log([washersNum, dryersNum])
// })

// console.log("Outside: " + [washersNum, dryersNum])

// })
// .catch(err => {
//   console.log(err.message)
// })
// return WashersNum

interface WasherDryerObject {
  washerCount: number
  dryerCount: number
}

let buildingNameObject = useLocalSearchParams()
let nameOfBuilding = buildingNameObject.id as string

const TrackBuildingName = (buildingName: string) => {
  let collectionRef = collection(database, buildingName)
  let buildingInstance = new Building(buildingName)
  buildingInstance.database = collectionRef
  return buildingInstance
}

const ListWasherLinks = (machines: WasherDryerObject) => {
  let washers = []
  for (let washerId = 0; washerId <= machines?.washerCount!; washerId++) {
    washers.push(
      <Link href={`Washer/Washer ${washerId}`}>{`Washer ${washerId}`}</Link>
    )
  }
  return washers
}

// const ListDryerLinks = (machines: WasherDryerObject) => {
//   let dryers = []
//   for (let dryerId = 0; dryerId <= machines?.washerCount!; dryerId++) {
//     dryers.push(
//       <Link href={`Dryer/Dryer ${dryerId}`}>{`Washer ${dryerId}`}</Link>
//     )
//   }
//   return dryers
// }

// MachineCounter(TrackBuildingName(nameOfBuilding).database!).then(machines => {})

const BuildingPage = () => {
  // const Machines = async () => {
  //   const machines = await MachineCounter(
  //     TrackBuildingName(nameOfBuilding).database!
  //   )
  //   return await machines
  // }

  // console.log(Machines())
  // the .then() unpacks the promise returned by machineCounter() and logs it
  // const MachineObjectFunction = () => {
  //   const machineObject = MachineCounter(
  //     TrackBuildingName(nameOfBuilding)!.database!
  //   )
  //   return machineObject
  // }

  // interface WasherDryerObject {
  //   washerCount: number
  //   dryerCount: number
  // }

  // const WasherAndDryerLists = (
  //   washersAndDryers: WasherDryerObject | undefined
  // ) => {
  //   const washerArray: string[] = []
  //   for (
  //     let washerId = 1;
  //     washerId <= washersAndDryers?.washerCount!;
  //     washerId++
  //   ) {
  //     washerArray.push(`Washer ${washerId}`)
  //   }
  //   return washerArray
  // for (let dryerId = 1; dryerId <= machineCount?.dryerCount!; dryerId++) {
  //   dryers.push(`Washer ${dryerId}`)
  // }

  // let washerArray = WasherAndDryerLists(MachineObjectFunction())
  // console.log(washerArray)

  return (
    <View>
      <Text style={{ fontSize: 30 }}>building</Text>
      <Text style={{ fontSize: 20 }}>Washers</Text>
      {/* {ListWasherLinks} */}
      <Link href="/Washer/Washer 1">Washer 1</Link>
      <Text style={{ fontSize: 20 }}>Dryers</Text>
      {/* {ListDryerLinks} */}
    </View>
  )
}

// const Clark1WasherPage = () => {
//   const { id } = useLocalSearchParams()

//   console.log(id)

//   return (
//     <View>
//       <Text style={{ fontSize: 30 }}>
//         {buildingObj?.building} {id}
//       </Text>
//     </View>
//   )
// }

export default BuildingPage
